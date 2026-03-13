"use client";

import { useState, useCallback, useRef } from "react";
import dynamic from "next/dynamic";
import SectionHeader from "@/components/studio/SectionHeader";
import { Upload, RotateCcw, X, Box } from "lucide-react";

const Viewer3D = dynamic(() => import("@/components/studio/Viewer3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-studio-bg rounded-md min-h-[400px]">
      <div className="text-center space-y-2">
        <div className="w-6 h-6 border-2 border-studio-muted border-t-studio-text rounded-full animate-spin mx-auto" />
        <p className="text-[12px] font-mono text-studio-muted">
          Loading 3D engine...
        </p>
      </div>
    </div>
  ),
});

const ACCEPTED_EXTENSIONS = [".step", ".stp", ".obj", ".stl"];
const ACCEPTED_MIME_REGEX =
  /\.(step|stp|obj|stl)$/i;

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getFormatLabel(name: string): string {
  const ext = name.split(".").pop()?.toUpperCase() || "";
  if (ext === "STP") return "STEP";
  return ext;
}

export default function ViewerPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [viewerKey, setViewerKey] = useState(0);

  const validateAndSetFile = useCallback((f: File) => {
    setError(null);
    if (!ACCEPTED_MIME_REGEX.test(f.name)) {
      setError(
        `Unsupported format. Please use ${ACCEPTED_EXTENSIONS.join(", ")}`
      );
      return;
    }
    setFile(f);
    setViewerKey((k) => k + 1);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile) {
        validateAndSetFile(droppedFile);
      }
    },
    [validateAndSetFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selected = e.target.files?.[0];
      if (selected) {
        validateAndSetFile(selected);
      }
      // Reset input so the same file can be re-selected
      e.target.value = "";
    },
    [validateAndSetFile]
  );

  const handleClear = useCallback(() => {
    setFile(null);
    setError(null);
  }, []);

  const handleResetCamera = useCallback(() => {
    setViewerKey((k) => k + 1);
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-4 h-full flex flex-col">
      <SectionHeader
        title="3D Viewer"
        subtitle="Inspect STEP, OBJ, and STL files in-browser"
        action={
          file ? (
            <div className="flex items-center gap-2">
              <button
                onClick={handleResetCamera}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-mono text-studio-secondary hover:text-studio-text transition-colors"
              >
                <RotateCcw size={13} />
                Reset View
              </button>
              <button
                onClick={handleClear}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-mono text-studio-secondary hover:text-studio-text transition-colors"
              >
                <X size={13} />
                Clear
              </button>
            </div>
          ) : undefined
        }
      />

      {/* File info bar */}
      {file && (
        <div className="flex items-center gap-3 px-4 py-2.5 bg-white border border-studio-border rounded-md">
          <Box size={15} className="text-studio-muted shrink-0" />
          <span className="text-[13px] font-mono text-studio-text truncate">
            {file.name}
          </span>
          <span className="text-[11px] font-mono text-studio-muted shrink-0">
            {formatFileSize(file.size)}
          </span>
          <span className="text-[10px] font-mono text-white bg-studio-text px-2 py-0.5 rounded shrink-0 uppercase">
            {getFormatLabel(file.name)}
          </span>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="px-4 py-2.5 bg-red-50 border border-red-200 rounded-md">
          <p className="text-[12px] font-mono text-red-600">{error}</p>
        </div>
      )}

      {/* Main content area */}
      <div
        className="flex-1 min-h-0"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {file ? (
          <div className="w-full h-full min-h-[500px] border border-studio-border rounded-md overflow-hidden">
            <Viewer3D key={viewerKey} file={file} />
          </div>
        ) : (
          <div
            className={`
              w-full h-full min-h-[500px] border-2 border-dashed rounded-md
              flex flex-col items-center justify-center gap-4
              transition-colors duration-150 cursor-pointer
              ${
                isDragging
                  ? "border-studio-neon bg-studio-neon/5"
                  : "border-studio-border bg-white hover:border-studio-muted"
              }
            `}
            onClick={() => fileInputRef.current?.click()}
          >
            <div
              className={`
                w-16 h-16 rounded-xl flex items-center justify-center
                ${isDragging ? "bg-studio-neon/10" : "bg-studio-bg"}
              `}
            >
              <Upload
                size={28}
                className={
                  isDragging ? "text-studio-neon-dark" : "text-studio-muted"
                }
              />
            </div>

            <div className="text-center space-y-1">
              <p className="text-[14px] font-mono text-studio-text font-medium">
                {isDragging ? "Drop file here" : "Drag & drop a 3D file"}
              </p>
              <p className="text-[12px] font-mono text-studio-muted">
                or click to browse
              </p>
            </div>

            <div className="flex items-center gap-2 mt-2">
              {[".STEP", ".OBJ", ".STL"].map((ext) => (
                <span
                  key={ext}
                  className="text-[10px] font-mono text-studio-muted bg-studio-bg px-2.5 py-1 rounded"
                >
                  {ext}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={ACCEPTED_EXTENSIONS.join(",")}
        onChange={handleFileInput}
        className="hidden"
      />
    </div>
  );
}
