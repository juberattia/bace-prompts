"use client";

import { useState } from "react";
import Link from "next/link";
import SectionHeader from "@/components/studio/SectionHeader";
import { useStore, type ImageSource } from "@/lib/store";
import {
  Download,
  Trash2,
  ImageIcon,
  Sparkles,
  Upload,
  AlertTriangle,
} from "lucide-react";

type FilterTab = "all" | "generated" | "uploaded";

const TABS: { value: FilterTab; label: string }[] = [
  { value: "all", label: "All" },
  { value: "generated", label: "Generated" },
  { value: "uploaded", label: "References" },
];

export default function LibraryPage() {
  const { images, removeImage, imageStorageWarning } = useStore();
  const [filter, setFilter] = useState<FilterTab>("all");

  const filtered =
    filter === "all"
      ? images
      : images.filter((img) => img.source === filter);

  const handleDownload = (dataUrl: string, fileName?: string) => {
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = fileName ?? `studio-image-${Date.now()}.png`;
    link.click();
  };

  const formatDate = (ts: number) => {
    const d = new Date(ts);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const sourceBadge = (source: ImageSource) =>
    source === "generated" ? (
      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[9px] font-mono uppercase tracking-wider bg-purple-50 text-purple-600 rounded">
        <Sparkles size={9} />
        Generated
      </span>
    ) : (
      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[9px] font-mono uppercase tracking-wider bg-blue-50 text-blue-600 rounded">
        <Upload size={9} />
        Reference
      </span>
    );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <SectionHeader
        title="Image Library"
        subtitle={`${images.length} image${images.length !== 1 ? "s" : ""} saved`}
      />

      {imageStorageWarning && (
        <div className="flex items-center gap-2 px-3 py-2 bg-amber-50 border border-amber-200 rounded-md text-[12px] font-mono text-amber-700">
          <AlertTriangle size={14} />
          You have {images.length} images stored. Consider removing some to free up browser storage.
        </div>
      )}

      {/* Filter tabs */}
      <div className="flex gap-1 border-b border-studio-border pb-px">
        {TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setFilter(tab.value)}
            className={`px-3 py-1.5 text-[12px] font-mono transition-colors border-b-2 -mb-px ${
              filter === tab.value
                ? "border-studio-text text-studio-text"
                : "border-transparent text-studio-muted hover:text-studio-secondary"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Image grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((img) => (
            <div
              key={img._id}
              className="border border-studio-border rounded-md overflow-hidden bg-white group"
            >
              <div className="aspect-square bg-studio-bg overflow-hidden">
                <img
                  src={img.dataUrl}
                  alt={img.prompt ?? img.fileName ?? "Library image"}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3 space-y-2">
                <div className="flex items-center justify-between">
                  {sourceBadge(img.source)}
                  <span className="text-[10px] font-mono text-studio-muted">
                    {formatDate(img.createdAt)}
                  </span>
                </div>
                {img.prompt && (
                  <p className="text-[11px] font-mono text-studio-secondary leading-snug line-clamp-2">
                    {img.prompt}
                  </p>
                )}
                {img.fileName && (
                  <p className="text-[11px] font-mono text-studio-secondary truncate">
                    {img.fileName}
                  </p>
                )}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => handleDownload(img.dataUrl, img.fileName)}
                    className="inline-flex items-center gap-1 px-2 py-1 text-[11px] font-mono text-studio-muted hover:text-studio-text transition-colors"
                  >
                    <Download size={11} />
                    Download
                  </button>
                  <button
                    onClick={() => removeImage(img._id)}
                    className="inline-flex items-center gap-1 px-2 py-1 text-[11px] font-mono text-studio-muted hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={11} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 space-y-4">
          <ImageIcon size={40} className="mx-auto text-studio-border" />
          <div>
            <p className="text-[14px] font-mono text-studio-muted">
              No images yet
            </p>
            <p className="text-[12px] font-mono text-studio-muted/60 mt-1">
              Generate images or upload references to build your library
            </p>
          </div>
          <div className="flex items-center justify-center gap-3">
            <Link
              href="/image-gen"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-studio-text text-white rounded-md text-[12px] font-mono hover:bg-black transition-colors"
            >
              <Sparkles size={13} />
              Generate Images
            </Link>
            <Link
              href="/prompt-builder"
              className="inline-flex items-center gap-1.5 px-4 py-2 border border-studio-border rounded-md text-[12px] font-mono text-studio-secondary hover:text-studio-text hover:border-studio-text transition-colors"
            >
              Prompt Builder
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
