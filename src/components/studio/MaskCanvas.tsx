"use client";

import {
  useRef,
  useEffect,
  useState,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Paintbrush, Eraser, Undo2, Trash2 } from "lucide-react";

export interface MaskCanvasHandle {
  exportMask: () => string | null;
}

interface MaskCanvasProps {
  imageSrc: string;
}

const MAX_UNDO = 20;

const MaskCanvas = forwardRef<MaskCanvasHandle, MaskCanvasProps>(
  function MaskCanvas({ imageSrc }, ref) {
    const containerRef = useRef<HTMLDivElement>(null);
    const bgCanvasRef = useRef<HTMLCanvasElement>(null);
    const maskCanvasRef = useRef<HTMLCanvasElement>(null);
    const cursorRef = useRef<HTMLDivElement>(null);

    const [brushSize, setBrushSize] = useState(30);
    const [mode, setMode] = useState<"brush" | "eraser">("brush");
    const [isDrawing, setIsDrawing] = useState(false);
    const [undoStack, setUndoStack] = useState<ImageData[]>([]);
    const [imgDimensions, setImgDimensions] = useState({ w: 0, h: 0 });

    // Load the source image onto the background canvas
    useEffect(() => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const w = img.naturalWidth;
        const h = img.naturalHeight;
        setImgDimensions({ w, h });

        const bgCanvas = bgCanvasRef.current;
        const maskCanvas = maskCanvasRef.current;
        if (!bgCanvas || !maskCanvas) return;

        const dpr = window.devicePixelRatio || 1;

        // Set internal resolution to match image
        bgCanvas.width = w;
        bgCanvas.height = h;
        maskCanvas.width = w;
        maskCanvas.height = h;

        // Set display size maintaining aspect ratio within container
        const container = containerRef.current;
        if (container) {
          const maxW = container.clientWidth;
          const scale = Math.min(1, maxW / w);
          const displayW = Math.round(w * scale);
          const displayH = Math.round(h * scale);
          bgCanvas.style.width = `${displayW}px`;
          bgCanvas.style.height = `${displayH}px`;
          maskCanvas.style.width = `${displayW}px`;
          maskCanvas.style.height = `${displayH}px`;
        }

        const bgCtx = bgCanvas.getContext("2d");
        if (bgCtx) {
          bgCtx.clearRect(0, 0, w, h);
          bgCtx.drawImage(img, 0, 0, w, h);
        }

        // Clear mask
        const maskCtx = maskCanvas.getContext("2d");
        if (maskCtx) {
          maskCtx.clearRect(0, 0, w, h);
        }

        // Reset undo stack
        setUndoStack([]);
      };
      img.src = imageSrc;
    }, [imageSrc]);

    // Get canvas-space coordinates from a pointer event
    const getCanvasPos = useCallback(
      (e: React.PointerEvent<HTMLCanvasElement>) => {
        const canvas = maskCanvasRef.current;
        if (!canvas) return { x: 0, y: 0 };
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        return {
          x: (e.clientX - rect.left) * scaleX,
          y: (e.clientY - rect.top) * scaleY,
        };
      },
      []
    );

    const pushUndo = useCallback(() => {
      const canvas = maskCanvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
      setUndoStack((prev) => {
        const next = [...prev, data];
        if (next.length > MAX_UNDO) next.shift();
        return next;
      });
    }, []);

    const drawAt = useCallback(
      (x: number, y: number) => {
        const canvas = maskCanvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.save();
        if (mode === "eraser") {
          ctx.globalCompositeOperation = "destination-out";
          ctx.fillStyle = "rgba(0,0,0,1)";
        } else {
          ctx.globalCompositeOperation = "source-over";
          ctx.fillStyle = "rgba(255,0,0,0.4)";
        }

        // Scale brush size relative to canvas resolution
        const rect = canvas.getBoundingClientRect();
        const scale = canvas.width / rect.width;
        const r = (brushSize / 2) * scale;

        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      },
      [mode, brushSize]
    );

    const handlePointerDown = useCallback(
      (e: React.PointerEvent<HTMLCanvasElement>) => {
        e.preventDefault();
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
        pushUndo();
        setIsDrawing(true);
        const pos = getCanvasPos(e);
        drawAt(pos.x, pos.y);
      },
      [pushUndo, getCanvasPos, drawAt]
    );

    const handlePointerMove = useCallback(
      (e: React.PointerEvent<HTMLCanvasElement>) => {
        // Update cursor position
        const cursor = cursorRef.current;
        const canvas = maskCanvasRef.current;
        if (cursor && canvas) {
          const rect = canvas.getBoundingClientRect();
          cursor.style.left = `${e.clientX - rect.left}px`;
          cursor.style.top = `${e.clientY - rect.top}px`;
          cursor.style.display = "block";
        }

        if (!isDrawing) return;
        e.preventDefault();
        const pos = getCanvasPos(e);
        drawAt(pos.x, pos.y);
      },
      [isDrawing, getCanvasPos, drawAt]
    );

    const handlePointerUp = useCallback(() => {
      setIsDrawing(false);
    }, []);

    const handlePointerLeave = useCallback(() => {
      const cursor = cursorRef.current;
      if (cursor) cursor.style.display = "none";
    }, []);

    const handleUndo = useCallback(() => {
      const canvas = maskCanvasRef.current;
      if (!canvas || undoStack.length === 0) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const last = undoStack[undoStack.length - 1];
      ctx.putImageData(last, 0, 0);
      setUndoStack((prev) => prev.slice(0, -1));
    }, [undoStack]);

    const handleClear = useCallback(() => {
      const canvas = maskCanvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      pushUndo();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, [pushUndo]);

    // Export mask as black/white PNG data URL
    useImperativeHandle(
      ref,
      () => ({
        exportMask: () => {
          const maskCanvas = maskCanvasRef.current;
          if (!maskCanvas) return null;
          const ctx = maskCanvas.getContext("2d");
          if (!ctx) return null;

          // Create an output canvas at the same dimensions
          const out = document.createElement("canvas");
          out.width = maskCanvas.width;
          out.height = maskCanvas.height;
          const outCtx = out.getContext("2d");
          if (!outCtx) return null;

          // Fill black (keep unchanged)
          outCtx.fillStyle = "#000000";
          outCtx.fillRect(0, 0, out.width, out.height);

          // Read mask pixels — anywhere with red paint becomes white
          const maskData = ctx.getImageData(
            0,
            0,
            maskCanvas.width,
            maskCanvas.height
          );
          const outData = outCtx.getImageData(0, 0, out.width, out.height);

          for (let i = 0; i < maskData.data.length; i += 4) {
            // If the red channel has any paint (alpha > 0 means painted)
            if (maskData.data[i + 3] > 0) {
              outData.data[i] = 255; // R
              outData.data[i + 1] = 255; // G
              outData.data[i + 2] = 255; // B
              outData.data[i + 3] = 255; // A
            }
          }

          outCtx.putImageData(outData, 0, 0);
          return out.toDataURL("image/png");
        },
      }),
      []
    );

    return (
      <div className="space-y-3">
        {/* Toolbar */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setMode("brush")}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[12px] font-mono border transition-colors ${
              mode === "brush"
                ? "border-studio-neon bg-studio-neon/10 text-studio-text"
                : "border-studio-border bg-white text-studio-secondary hover:border-studio-neon/50"
            }`}
          >
            <Paintbrush size={13} />
            Brush
          </button>
          <button
            onClick={() => setMode("eraser")}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[12px] font-mono border transition-colors ${
              mode === "eraser"
                ? "border-studio-neon bg-studio-neon/10 text-studio-text"
                : "border-studio-border bg-white text-studio-secondary hover:border-studio-neon/50"
            }`}
          >
            <Eraser size={13} />
            Eraser
          </button>

          <div className="flex items-center gap-2 ml-2">
            <label className="text-[10px] font-mono text-studio-muted uppercase">
              Size
            </label>
            <input
              type="range"
              min={5}
              max={100}
              value={brushSize}
              onChange={(e) => setBrushSize(Number(e.target.value))}
              className="w-24 accent-lime-500"
            />
            <span className="text-[11px] font-mono text-studio-secondary w-6 text-right">
              {brushSize}
            </span>
          </div>

          <div className="ml-auto flex items-center gap-1">
            <button
              onClick={handleUndo}
              disabled={undoStack.length === 0}
              className="inline-flex items-center gap-1 px-2 py-1.5 rounded-md text-[11px] font-mono text-studio-secondary hover:text-studio-text border border-studio-border hover:border-studio-neon/50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <Undo2 size={12} />
              Undo
            </button>
            <button
              onClick={handleClear}
              className="inline-flex items-center gap-1 px-2 py-1.5 rounded-md text-[11px] font-mono text-studio-secondary hover:text-red-500 border border-studio-border hover:border-red-300 transition-colors"
            >
              <Trash2 size={12} />
              Clear
            </button>
          </div>
        </div>

        {/* Canvas area */}
        <div
          ref={containerRef}
          className="relative border border-studio-border rounded-lg overflow-hidden bg-[#f0f0f0] flex items-center justify-center"
        >
          <canvas
            ref={bgCanvasRef}
            className="block"
            style={{ imageRendering: "auto" }}
          />
          <canvas
            ref={maskCanvasRef}
            className="absolute top-0 left-0 block"
            style={{
              cursor: "none",
              imageRendering: "auto",
              // Center the mask canvas over the bg canvas
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerLeave}
          />
          {/* Custom cursor */}
          <div
            ref={cursorRef}
            className="pointer-events-none absolute rounded-full border-2 border-white/80"
            style={{
              width: brushSize,
              height: brushSize,
              transform: "translate(-50%, -50%)",
              display: "none",
              boxShadow: "0 0 0 1px rgba(0,0,0,0.3)",
            }}
          />
        </div>

        {imgDimensions.w > 0 && (
          <p className="text-[10px] font-mono text-studio-muted">
            Source: {imgDimensions.w} x {imgDimensions.h}px
          </p>
        )}
      </div>
    );
  }
);

export default MaskCanvas;
