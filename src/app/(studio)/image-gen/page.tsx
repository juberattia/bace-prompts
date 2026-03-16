"use client";

import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import SectionHeader from "@/components/studio/SectionHeader";
import StudioCard from "@/components/studio/StudioCard";
import { useStore } from "@/lib/store";
import {
  Sparkles,
  Download,
  RotateCcw,
  Copy,
  Check,
  Loader2,
  AlertCircle,
  ImageIcon,
  BookmarkPlus,
} from "lucide-react";

const EXAMPLE_PROMPTS = [
  "A minimalist desk lamp with brushed aluminum and opal glass, studio lighting, white background",
  "Modular shelving system in solid oak, isometric view, soft shadows on grey background",
  "Sleek wireless earbuds in matte black, product photography, dramatic lighting",
  "Ceramic coffee mug with organic flowing shape, earth tones, lifestyle setting",
];

export default function ImageGenPage() {
  const searchParams = useSearchParams();
  const { saveImage } = useStore();
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [responseText, setResponseText] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [history, setHistory] = useState<
    { prompt: string; image: string }[]
  >([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Pre-fill prompt from ?prompt= search param
  useEffect(() => {
    const paramPrompt = searchParams.get("prompt");
    if (paramPrompt) {
      setPrompt(paramPrompt);
      textareaRef.current?.focus();
    }
  }, [searchParams]);

  const handleSaveToLibrary = () => {
    if (!imageUrl) return;
    saveImage({ dataUrl: imageUrl, prompt: prompt.trim(), source: "generated" });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleGenerate = async () => {
    if (!prompt.trim() || loading) return;

    setLoading(true);
    setError(null);
    setResponseText(null);

    try {
      const res = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: prompt.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to generate image");
        return;
      }

      setImageUrl(data.image);
      setResponseText(data.text || null);
      setHistory((prev) => [
        { prompt: prompt.trim(), image: data.image },
        ...prev.slice(0, 11),
      ]);
    } catch {
      setError("Network error. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!imageUrl) return;
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `nano-banana-${Date.now()}.png`;
    link.click();
  };

  const handleCopyPrompt = async () => {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExampleClick = (example: string) => {
    setPrompt(example);
    textareaRef.current?.focus();
  };

  const handleClear = () => {
    setPrompt("");
    setImageUrl(null);
    setResponseText(null);
    setError(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleGenerate();
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <SectionHeader
        title="Nano Banana 2"
        subtitle="AI image generation powered by Google Gemini"
        action={
          imageUrl ? (
            <div className="flex items-center gap-2">
              <button
                onClick={handleSaveToLibrary}
                disabled={saved}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-mono text-studio-secondary hover:text-studio-text transition-colors disabled:opacity-60"
              >
                {saved ? <Check size={13} /> : <BookmarkPlus size={13} />}
                {saved ? "Saved" : "Save to Library"}
              </button>
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-mono text-studio-secondary hover:text-studio-text transition-colors"
              >
                <Download size={13} />
                Download
              </button>
              <button
                onClick={handleClear}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-mono text-studio-secondary hover:text-studio-text transition-colors"
              >
                <RotateCcw size={13} />
                Clear
              </button>
            </div>
          ) : undefined
        }
      />

      <div className="grid lg:grid-cols-[1fr_400px] gap-6">
        {/* Left: Result area */}
        <div className="space-y-4">
          {/* Image display */}
          <div className="min-h-[400px] border border-studio-border rounded-md bg-white overflow-hidden flex items-center justify-center">
            {loading ? (
              <div className="text-center space-y-3 p-8">
                <Loader2
                  size={32}
                  className="mx-auto text-studio-muted animate-spin"
                />
                <p className="text-[13px] font-mono text-studio-muted">
                  Generating image...
                </p>
                <p className="text-[11px] font-mono text-studio-muted/60">
                  This may take 10-30 seconds
                </p>
              </div>
            ) : error ? (
              <div className="text-center space-y-3 p-8 max-w-md">
                <AlertCircle size={32} className="mx-auto text-red-400" />
                <p className="text-[13px] font-mono text-red-500">{error}</p>
                <button
                  onClick={handleGenerate}
                  className="text-[12px] font-mono text-studio-secondary hover:text-studio-text transition-colors"
                >
                  Try again
                </button>
              </div>
            ) : imageUrl ? (
              <img
                src={imageUrl}
                alt="Generated image"
                className="w-full h-auto max-h-[600px] object-contain"
              />
            ) : (
              <div className="text-center space-y-3 p-8">
                <ImageIcon size={40} className="mx-auto text-studio-border" />
                <p className="text-[14px] font-mono text-studio-muted">
                  Describe what you want to see
                </p>
                <p className="text-[12px] font-mono text-studio-muted/60">
                  Product renders, concept art, design mockups
                </p>
              </div>
            )}
          </div>

          {/* Model response text */}
          {responseText && (
            <StudioCard>
              <p className="text-[12px] font-mono text-studio-secondary leading-relaxed">
                {responseText}
              </p>
            </StudioCard>
          )}

          {/* History */}
          {history.length > 0 && (
            <div>
              <h3 className="text-[11px] font-mono text-studio-muted uppercase tracking-wider mb-2">
                Recent Generations
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {history.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setImageUrl(item.image);
                      setPrompt(item.prompt);
                    }}
                    className="aspect-square rounded-md overflow-hidden border border-studio-border hover:border-studio-neon transition-colors"
                    title={item.prompt}
                  >
                    <img
                      src={item.image}
                      alt={item.prompt}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: Prompt input (sticky) */}
        <div className="lg:sticky lg:top-6 lg:self-start space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-[11px] font-mono text-studio-muted uppercase tracking-wider">
                Prompt
              </h3>
              {prompt && (
                <button
                  onClick={handleCopyPrompt}
                  className="text-[11px] font-mono text-studio-muted hover:text-studio-text transition-colors inline-flex items-center gap-1"
                >
                  {copied ? <Check size={11} /> : <Copy size={11} />}
                  {copied ? "Copied" : "Copy"}
                </button>
              )}
            </div>
            <textarea
              ref={textareaRef}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Describe the image you want to generate..."
              rows={5}
              className="w-full px-3 py-2.5 bg-white border border-studio-border rounded-md text-sm font-mono text-studio-text placeholder:text-studio-muted focus:outline-none focus:border-studio-neon focus:ring-1 focus:ring-studio-neon resize-none"
            />
            <p className="text-[10px] font-mono text-studio-muted mt-1">
              {prompt.length > 0 ? `${prompt.length} chars` : "Cmd+Enter to generate"}
            </p>
          </div>

          <button
            onClick={handleGenerate}
            disabled={!prompt.trim() || loading}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-studio-text text-white rounded-md text-[13px] font-mono hover:bg-black transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 size={15} className="animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles size={15} />
                Generate Image
              </>
            )}
          </button>

          {/* Example prompts */}
          <div>
            <h3 className="text-[11px] font-mono text-studio-muted uppercase tracking-wider mb-2">
              Try These
            </h3>
            <div className="space-y-1.5">
              {EXAMPLE_PROMPTS.map((example, i) => (
                <button
                  key={i}
                  onClick={() => handleExampleClick(example)}
                  className="w-full text-left px-3 py-2 rounded-md border border-studio-border bg-white text-[11px] font-mono text-studio-secondary hover:border-studio-neon/50 hover:text-studio-text transition-colors leading-snug"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
