"use client";

import { useState, useRef, useCallback } from "react";
import SectionHeader from "@/components/studio/SectionHeader";
import MaskCanvas, {
  type MaskCanvasHandle,
} from "@/components/studio/MaskCanvas";
import { useStore } from "@/lib/store";
import {
  Upload,
  Loader2,
  AlertCircle,
  BookmarkPlus,
  Check,
  Download,
  ImageIcon,
  X,
} from "lucide-react";

type Tab = "library" | "upload";
type Model = "flux-fill" | "kontext";

export default function InpaintingPage() {
  const { images, saveImage } = useStore();
  const maskCanvasRef = useRef<MaskCanvasHandle>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const refFileInputRef = useRef<HTMLInputElement>(null);

  // Image selection
  const [tab, setTab] = useState<Tab>("library");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Controls
  const [prompt, setPrompt] = useState("");
  const [model, setModel] = useState<Model>("flux-fill");
  const [strength, setStrength] = useState(0.85);
  const [referenceImage, setReferenceImage] = useState<string | null>(null);

  // Generation state
  const [generating, setGenerating] = useState(false);
  const [genError, setGenError] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  // File upload as source image
  const handleFileUpload = useCallback((files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result as string);
      setResultImage(null);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      handleFileUpload(e.dataTransfer.files);
    },
    [handleFileUpload]
  );

  // Reference image for Kontext
  const handleRefUpload = useCallback((files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => setReferenceImage(reader.result as string);
    reader.readAsDataURL(file);
  }, []);

  const handleGenerate = async () => {
    if (!selectedImage || !prompt.trim() || generating) return;

    const maskDataUrl = maskCanvasRef.current?.exportMask();
    if (!maskDataUrl) {
      setGenError("Paint a mask over the areas you want to change.");
      return;
    }

    setGenerating(true);
    setGenError(null);
    setSaved(false);

    try {
      const body: Record<string, unknown> = {
        imageDataUrl: selectedImage,
        maskDataUrl,
        prompt: prompt.trim(),
        model: model === "kontext" ? "kontext" : "flux-fill",
        strength,
      };

      if (model === "kontext" && referenceImage) {
        body.referenceImageDataUrl = referenceImage;
      }

      const res = await fetch("/api/inpaint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) {
        setGenError(data.error || "Inpainting failed");
        return;
      }

      setResultImage(data.image);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setGenError(`Network error: ${msg}`);
    } finally {
      setGenerating(false);
    }
  };

  const handleSave = () => {
    if (!resultImage) return;
    saveImage({
      dataUrl: resultImage,
      prompt: `[inpaint] ${prompt.trim()}`,
      source: "generated",
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleDownload = () => {
    if (!resultImage) return;
    const link = document.createElement("a");
    link.href = resultImage;
    link.download = `inpaint-${Date.now()}.png`;
    link.click();
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <SectionHeader
        title="Inpainting"
        subtitle="Mask areas to regenerate while keeping the rest pixel-perfect"
      />

      <div className="grid lg:grid-cols-[1fr_340px] gap-6">
        {/* ── Left Column ── */}
        <div className="space-y-6">
          {/* Image source tabs */}
          <div>
            <div className="flex gap-1 mb-3">
              <button
                onClick={() => setTab("library")}
                className={`px-3 py-1.5 rounded-md text-[12px] font-mono border transition-colors ${
                  tab === "library"
                    ? "border-studio-neon bg-studio-neon/10 text-studio-text"
                    : "border-studio-border bg-white text-studio-secondary hover:border-studio-neon/50"
                }`}
              >
                From Library
              </button>
              <button
                onClick={() => setTab("upload")}
                className={`px-3 py-1.5 rounded-md text-[12px] font-mono border transition-colors ${
                  tab === "upload"
                    ? "border-studio-neon bg-studio-neon/10 text-studio-text"
                    : "border-studio-border bg-white text-studio-secondary hover:border-studio-neon/50"
                }`}
              >
                Upload
              </button>
            </div>

            {tab === "library" && (
              <div>
                {images.length === 0 ? (
                  <div className="border border-dashed border-studio-border rounded-lg p-8 text-center">
                    <ImageIcon
                      size={24}
                      className="mx-auto text-studio-muted mb-2"
                    />
                    <p className="text-[12px] font-mono text-studio-muted">
                      No images in library yet.
                    </p>
                    <p className="text-[11px] font-mono text-studio-muted/60 mt-1">
                      Generate images in Prompt Builder or switch to Upload.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2">
                    {images.map((img) => (
                      <button
                        key={img._id}
                        onClick={() => {
                          setSelectedImage(img.dataUrl);
                          setResultImage(null);
                        }}
                        className={`relative aspect-square rounded-md overflow-hidden border-2 transition-all ${
                          selectedImage === img.dataUrl
                            ? "border-studio-neon ring-2 ring-studio-neon/30"
                            : "border-studio-border hover:border-studio-neon/50"
                        }`}
                      >
                        <img
                          src={img.dataUrl}
                          alt={img.prompt || "Library image"}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {tab === "upload" && (
              <div
                onDrop={handleDrop}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                  isDragging
                    ? "border-studio-neon bg-studio-neon/5"
                    : "border-studio-border hover:border-studio-neon/50"
                }`}
              >
                <Upload size={20} className="mx-auto text-studio-muted mb-2" />
                <p className="text-[12px] font-mono text-studio-muted">
                  Drop an image here or click to upload
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFileUpload(e.target.files)}
                />
              </div>
            )}
          </div>

          {/* Mask Canvas */}
          {selectedImage && (
            <div>
              <h3 className="text-[11px] font-mono text-studio-muted uppercase tracking-wider mb-2">
                Paint Mask
              </h3>
              <MaskCanvas ref={maskCanvasRef} imageSrc={selectedImage} />
            </div>
          )}

          {/* Before / After */}
          {resultImage && selectedImage && (
            <div>
              <h3 className="text-[11px] font-mono text-studio-muted uppercase tracking-wider mb-2">
                Before / After
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="border border-studio-border rounded-lg overflow-hidden">
                  <p className="text-[10px] font-mono text-studio-muted px-2 py-1 bg-studio-bg border-b border-studio-border">
                    Original
                  </p>
                  <img
                    src={selectedImage}
                    alt="Original"
                    className="w-full h-auto"
                  />
                </div>
                <div className="border border-studio-neon/50 rounded-lg overflow-hidden">
                  <p className="text-[10px] font-mono text-studio-neon px-2 py-1 bg-studio-neon/5 border-b border-studio-neon/20">
                    Inpainted
                  </p>
                  <img
                    src={resultImage}
                    alt="Inpainted result"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── Right Column (Sticky Sidebar) ── */}
        <div className="lg:sticky lg:top-6 lg:self-start space-y-4">
          {/* Prompt */}
          <div>
            <h3 className="text-[11px] font-mono text-studio-muted uppercase tracking-wider mb-2">
              Prompt
            </h3>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe what should replace the masked area..."
              rows={4}
              className="w-full px-3 py-2.5 bg-white border border-studio-border rounded-md text-sm font-mono text-studio-text placeholder:text-studio-muted focus:outline-none focus:border-studio-neon focus:ring-1 focus:ring-studio-neon resize-none"
            />
          </div>

          {/* Model toggle */}
          <div>
            <h4 className="text-[10px] font-mono text-studio-muted uppercase tracking-wider mb-1.5">
              Model
            </h4>
            <div className="flex gap-1.5">
              <button
                onClick={() => setModel("flux-fill")}
                className={`flex-1 px-3 py-2 rounded-md text-[11px] font-mono transition-all border ${
                  model === "flux-fill"
                    ? "border-studio-neon bg-studio-neon/10 text-studio-text"
                    : "border-studio-border bg-white text-studio-secondary hover:border-studio-neon/50"
                }`}
              >
                <span className="font-medium block">FLUX Dev Inpaint</span>
                <span className="text-[9px] text-studio-muted">
                  Standard inpaint
                </span>
              </button>
              <button
                onClick={() => setModel("kontext")}
                className={`flex-1 px-3 py-2 rounded-md text-[11px] font-mono transition-all border ${
                  model === "kontext"
                    ? "border-studio-neon bg-studio-neon/10 text-studio-text"
                    : "border-studio-border bg-white text-studio-secondary hover:border-studio-neon/50"
                }`}
              >
                <span className="font-medium block">Kontext Inpaint</span>
                <span className="text-[9px] text-studio-muted">
                  + Reference imgs
                </span>
              </button>
            </div>
          </div>

          {/* Strength slider (both models) */}
          <div>
            <label className="text-[10px] font-mono text-studio-muted uppercase block mb-1">
              Strength: {strength.toFixed(2)}
            </label>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={strength}
              onChange={(e) => setStrength(Number(e.target.value))}
              className="w-full accent-lime-500"
            />
            <div className="flex justify-between text-[9px] font-mono text-studio-muted">
              <span>Subtle</span>
              <span>Strong</span>
            </div>
          </div>

          {/* Kontext-specific: reference image */}
          {model === "kontext" && (
            <div className="border border-studio-border rounded-md p-3 bg-studio-bg/50">
              <div>
                <label className="text-[10px] font-mono text-studio-muted uppercase block mb-1">
                  Reference Image (optional)
                </label>
                {referenceImage ? (
                  <div className="relative inline-block">
                    <img
                      src={referenceImage}
                      alt="Reference"
                      className="w-20 h-20 object-cover rounded border border-studio-border"
                    />
                    <button
                      onClick={() => setReferenceImage(null)}
                      className="absolute -top-1 -right-1 p-0.5 bg-black/70 text-white rounded-full"
                    >
                      <X size={10} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => refFileInputRef.current?.click()}
                    className="w-full px-3 py-2 border border-dashed border-studio-border rounded-md text-[11px] font-mono text-studio-muted hover:border-studio-neon/50 transition-colors"
                  >
                    <Upload size={12} className="inline mr-1.5" />
                    Upload reference
                  </button>
                )}
                <input
                  ref={refFileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleRefUpload(e.target.files)}
                />
              </div>
            </div>
          )}

          {/* Generate button */}
          <button
            onClick={handleGenerate}
            disabled={!selectedImage || !prompt.trim() || generating}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-studio-text text-white rounded-md text-[13px] font-mono hover:bg-black transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {generating ? (
              <>
                <Loader2 size={15} className="animate-spin" />
                Inpainting...
              </>
            ) : (
              "Generate"
            )}
          </button>

          <p className="text-[10px] font-mono text-studio-muted/60">
            {model === "flux-fill" ? "~$0.035/megapixel" : "Kontext pricing"}
          </p>

          {/* Error */}
          {genError && (
            <div className="flex items-start gap-2 px-3 py-2.5 border border-red-200 rounded-md bg-red-50">
              <AlertCircle size={14} className="text-red-400 mt-0.5 shrink-0" />
              <p className="text-[11px] font-mono text-red-600">{genError}</p>
            </div>
          )}

          {/* Result actions */}
          {resultImage && (
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                disabled={saved}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 border border-studio-border rounded-md text-[12px] font-mono text-studio-secondary hover:border-studio-neon hover:text-studio-text transition-colors disabled:opacity-60"
              >
                {saved ? <Check size={13} /> : <BookmarkPlus size={13} />}
                {saved ? "Saved" : "Save to Library"}
              </button>
              <button
                onClick={handleDownload}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 border border-studio-border rounded-md text-[12px] font-mono text-studio-secondary hover:border-studio-neon hover:text-studio-text transition-colors"
              >
                <Download size={13} />
                Download
              </button>
            </div>
          )}

          {/* Generating feedback */}
          {generating && (
            <div className="border border-studio-border rounded-md p-4 text-center bg-white">
              <Loader2
                size={20}
                className="mx-auto text-studio-muted animate-spin mb-2"
              />
              <p className="text-[11px] font-mono text-studio-muted">
                Processing with{" "}
                {model === "kontext" ? "Kontext Inpaint" : "FLUX Dev Inpaint"}...
              </p>
              <p className="text-[10px] font-mono text-studio-muted/60 mt-1">
                This may take 15-45 seconds
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
