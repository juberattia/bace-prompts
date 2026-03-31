"use client";

import { useState, useMemo, useRef, useCallback } from "react";
import SectionHeader from "@/components/studio/SectionHeader";
import StudioCard from "@/components/studio/StudioCard";
import { useStore } from "@/lib/store";
import {
  RENDER_STYLES,
  MATERIALS,
  LIGHTING,
  CAMERA_ANGLES,
  ENVIRONMENTS,
  MODIFIERS,
  type PromptOption,
} from "@/lib/prompt-builder-data";
import { BACE_DNA_BLOCKS, BACE_PROMPT_PREFIX } from "@/lib/bace-visual-dna";
import {
  PROMPT_MODULE_CATEGORIES,
  PROMPT_PRESETS,
  assemblePrompt,
  type PromptSelections,
  type PromptModuleCategory,
} from "@/lib/bace-prompt-modules";
import {
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  Upload,
  X,
  ImageIcon,
  Loader2,
  Download,
  BookmarkPlus,
  AlertCircle,
  Lightbulb,
  ChevronDown,
} from "lucide-react";

// ── Legacy BACE Style Blocks (for Custom Builder backward compat) ────────

const BACE_EXTRA_TRICK = "editorial documentary photography, street photography realism";

const BACE_EXAMPLE_PROMPT =
  "Photorealistic editorial street photography with a contemporary documentary aesthetic. Shot handheld with a 35mm lens on a sunny afternoon in a German city street similar to Cologne. Natural daylight creates uneven highlights and shadows across the scene. A person casually retrieves a cardboard parcel from an open bace Hub compartment. The Hub stands directly on the pavement without any concrete base. The scene feels spontaneous and imperfect like a candid street photograph. Slight film grain, natural sensor noise and subtle motion blur give the image a realistic editorial texture. Urban background with bicycles, street trees and storefronts.";

// ── Types ────────────────────────────────────────────────────────────────

type BuilderMode = "module-builder" | "custom-builder";

// ── Reusable card component for Custom Builder ──────────────────────────

function SelectableCards({
  title,
  options,
  selected,
  onSelect,
  multi,
}: {
  title: string;
  options: PromptOption[];
  selected: string[];
  onSelect: (id: string) => void;
  multi?: boolean;
}) {
  return (
    <div>
      <h3 className="text-[11px] font-mono text-studio-muted uppercase tracking-wider mb-2">
        {title}
        {multi && (
          <span className="text-studio-muted/60 ml-1">(multi)</span>
        )}
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {options.map((opt) => {
          const isSelected = selected.includes(opt.id);
          return (
            <button
              key={opt.id}
              onClick={() => onSelect(opt.id)}
              className={`text-left px-3 py-2.5 rounded-md border text-[12px] font-mono transition-all ${
                isSelected
                  ? "border-studio-neon bg-studio-neon/10 text-studio-text"
                  : "border-studio-border bg-white text-studio-secondary hover:border-studio-neon/50 hover:bg-studio-bg"
              }`}
            >
              <span className="font-medium block leading-snug">
                {opt.label}
              </span>
              <span className="text-[10px] text-studio-muted leading-snug mt-0.5 block">
                {opt.description}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Module Category Card ────────────────────────────────────────────────

function ModuleCategoryCard({
  category,
  selectedOptionId,
  onSelectOption,
}: {
  category: PromptModuleCategory;
  selectedOptionId: string | undefined;
  onSelectOption: (categoryId: string, optionId: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = category.options.find((o) => o.id === selectedOptionId);

  return (
    <div className="rounded-md border border-studio-border bg-white text-[12px] font-mono">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left px-3 py-2.5 flex items-center justify-between gap-2"
      >
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-base leading-none">{category.icon}</span>
            <span className="font-medium text-studio-text">{category.label}</span>
          </div>
          {selectedOption ? (
            <span className="text-[10px] text-studio-neon block mt-0.5 truncate">
              {selectedOption.label}
            </span>
          ) : (
            <span className="text-[10px] text-studio-muted block mt-0.5">
              Select...
            </span>
          )}
        </div>
        <ChevronDown
          size={12}
          className={`text-studio-muted shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="border-t border-studio-border px-2 py-2 space-y-1 max-h-[280px] overflow-y-auto">
          {category.options.map((option) => {
            const isSelected = option.id === selectedOptionId;
            return (
              <button
                key={option.id}
                onClick={() => {
                  onSelectOption(category.id, isSelected ? "" : option.id);
                  if (!isSelected) setIsOpen(false);
                }}
                className={`w-full text-left px-2.5 py-2 rounded transition-all ${
                  isSelected
                    ? "bg-studio-neon/10 border border-studio-neon"
                    : "hover:bg-studio-bg border border-transparent"
                }`}
              >
                <span className="font-medium block leading-snug text-studio-text text-[11px]">
                  {option.label}
                </span>
                <span className="text-[10px] text-studio-muted leading-snug block">
                  {option.description}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ── Main Page ───────────────────────────────────────────────────────────

export default function PromptBuilderPage() {
  const { saveImage, getUploadedImages, removeImage } = useStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mode state
  const [mode, setMode] = useState<BuilderMode>("module-builder");

  // Module builder state
  const [moduleSelections, setModuleSelections] = useState<PromptSelections>({});
  const [modulePromptText, setModulePromptText] = useState("");
  const [isPresetOpen, setIsPresetOpen] = useState(false);

  // Custom builder state
  const [productDescription, setProductDescription] = useState("");
  const [style, setStyle] = useState<string[]>([]);
  const [material, setMaterial] = useState<string[]>([]);
  const [lighting, setLighting] = useState<string[]>([]);
  const [angle, setAngle] = useState<string[]>([]);
  const [environment, setEnvironment] = useState<string[]>([]);
  const [modifiers, setModifiers] = useState<string[]>([]);
  const [styleDna, setStyleDna] = useState<string[]>(
    BACE_DNA_BLOCKS.map((b) => b.id)
  );
  const [copied, setCopied] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Model & generation state
  const [provider, setProvider] = useState<"gemini" | "fal">("gemini");
  const [falAspectRatio, setFalAspectRatio] = useState("16:9");
  const [falResolution, setFalResolution] = useState("1K");
  const [generating, setGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [genError, setGenError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const uploadedImages = getUploadedImages();

  // Count selected modules
  const selectedCount = Object.values(moduleSelections).filter(Boolean).length;

  // Assemble prompt from module selections
  const assembledModulePrompt = useMemo(() => {
    const hasSelections = Object.values(moduleSelections).some(Boolean);
    if (!hasSelections) return "";
    return assemblePrompt(moduleSelections, BACE_PROMPT_PREFIX);
  }, [moduleSelections]);

  // Update the editable text when assembly changes
  const handleModuleSelect = (categoryId: string, optionId: string) => {
    const newSelections = { ...moduleSelections };
    if (optionId) {
      newSelections[categoryId] = optionId;
    } else {
      delete newSelections[categoryId];
    }
    setModuleSelections(newSelections);
    // Auto-update the prompt text
    const hasSelections = Object.values(newSelections).some(Boolean);
    if (hasSelections) {
      setModulePromptText(assemblePrompt(newSelections, BACE_PROMPT_PREFIX));
    } else {
      setModulePromptText("");
    }
  };

  // Load a preset
  const handleLoadPreset = (presetSelections: PromptSelections) => {
    setModuleSelections(presetSelections);
    setModulePromptText(assemblePrompt(presetSelections, BACE_PROMPT_PREFIX));
    setIsPresetOpen(false);
  };

  const handleFileUpload = useCallback(
    (files: FileList | null) => {
      if (!files) return;
      Array.from(files).forEach((file) => {
        if (!file.type.startsWith("image/")) return;
        const reader = new FileReader();
        reader.onload = () => {
          saveImage({
            dataUrl: reader.result as string,
            source: "uploaded",
            fileName: file.name,
          });
        };
        reader.readAsDataURL(file);
      });
    },
    [saveImage]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      handleFileUpload(e.dataTransfer.files);
    },
    [handleFileUpload]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleGenerate = async (promptText: string) => {
    if (!promptText.trim() || generating) return;
    setGenerating(true);
    setGenError(null);
    setSaved(false);

    try {
      if (provider === "fal") {
        const res = await fetch("/api/generate-image-fal", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            prompt: promptText.trim(),
            aspectRatio: falAspectRatio,
            resolution: falResolution,
          }),
        });
        const data = await res.json();
        if (!res.ok) {
          setGenError(data.error || "Failed to generate image");
          return;
        }
        setGeneratedImage(data.image);
      } else {
        const refs = uploadedImages.map((img) => ({ dataUrl: img.dataUrl }));
        const res = await fetch("/api/generate-image", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            prompt: promptText.trim(),
            referenceImages: refs.length > 0 ? refs : undefined,
          }),
        });
        const data = await res.json();
        if (!res.ok) {
          setGenError(data.error || "Failed to generate image");
          return;
        }
        setGeneratedImage(data.image);
      }
    } catch {
      setGenError("Network error. Check your connection and try again.");
    } finally {
      setGenerating(false);
    }
  };

  const handleSaveGenerated = () => {
    if (!generatedImage) return;
    const currentPrompt = mode === "module-builder" ? modulePromptText : prompt;
    saveImage({ dataUrl: generatedImage, prompt: currentPrompt.trim(), source: "generated" });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleDownloadGenerated = () => {
    if (!generatedImage) return;
    const link = document.createElement("a");
    link.href = generatedImage;
    link.download = `bace-hub-${Date.now()}.png`;
    link.click();
  };

  const toggleSingle = (
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    return (id: string) =>
      setter((prev) => (prev.includes(id) ? [] : [id]));
  };

  const toggleMulti = (
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    return (id: string) =>
      setter((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
      );
  };

  const getLabel = (options: PromptOption[], ids: string[]) =>
    ids.map((id) => options.find((o) => o.id === id)?.label).filter(Boolean);

  // Custom builder assembled prompt
  const prompt = useMemo(() => {
    const parts: string[] = [];

    if (productDescription.trim()) {
      parts.push(productDescription.trim());
    }

    const styleLabels = getLabel(RENDER_STYLES, style);
    if (styleLabels.length) parts.push(`${styleLabels.join(", ")} render style`);

    const materialLabels = getLabel(MATERIALS, material);
    if (materialLabels.length) parts.push(`made of ${materialLabels.join(" and ")}`);

    const lightingLabels = getLabel(LIGHTING, lighting);
    if (lightingLabels.length) parts.push(`${lightingLabels.join(", ")} lighting`);

    const angleLabels = getLabel(CAMERA_ANGLES, angle);
    if (angleLabels.length) parts.push(`${angleLabels.join(", ")} camera angle`);

    const envLabels = getLabel(ENVIRONMENTS, environment);
    if (envLabels.length) parts.push(`set in ${envLabels.join(", ")} environment`);

    const modLabels = getLabel(MODIFIERS, modifiers);
    if (modLabels.length) parts.push(modLabels.join(", "));

    const dnaTexts = BACE_DNA_BLOCKS
      .filter((b) => styleDna.includes(b.id))
      .map((b) => b.text);
    if (dnaTexts.length) parts.push(...dnaTexts);

    if (styleDna.length > 0) parts.push(BACE_EXTRA_TRICK);

    return parts.join(". ") + (parts.length ? "." : "");
  }, [productDescription, style, material, lighting, angle, environment, modifiers, styleDna]);

  // Active prompt for generation
  const activePrompt = mode === "module-builder" ? modulePromptText : prompt;

  const handleCopy = async () => {
    if (!activePrompt) return;
    await navigator.clipboard.writeText(activePrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    if (mode === "module-builder") {
      setModuleSelections({});
      setModulePromptText("");
    } else {
      setProductDescription("");
      setStyle([]);
      setMaterial([]);
      setLighting([]);
      setAngle([]);
      setEnvironment([]);
      setModifiers([]);
      setStyleDna(BACE_DNA_BLOCKS.map((b) => b.id));
    }
  };

  const toggleDnaBlock = (id: string) =>
    setStyleDna((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <SectionHeader
        title="Prompt Builder"
        subtitle="Mix & match modules to assemble BACE Hub prompts"
        action={
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-mono text-studio-secondary hover:text-studio-text transition-colors"
          >
            <RotateCcw size={13} />
            Reset
          </button>
        }
      />

      {/* Mode toggle */}
      <div className="flex gap-1.5">
        <button
          onClick={() => setMode("module-builder")}
          className={`flex-1 px-4 py-2.5 rounded-md text-[12px] font-mono transition-all border ${
            mode === "module-builder"
              ? "border-studio-neon bg-studio-neon/10 text-studio-text"
              : "border-studio-border bg-white text-studio-secondary hover:border-studio-neon/50"
          }`}
        >
          <span className="font-medium block">Module Builder</span>
          <span className="text-[10px] text-studio-muted">9 categories, mix & match</span>
        </button>
        <button
          onClick={() => setMode("custom-builder")}
          className={`flex-1 px-4 py-2.5 rounded-md text-[12px] font-mono transition-all border ${
            mode === "custom-builder"
              ? "border-studio-neon bg-studio-neon/10 text-studio-text"
              : "border-studio-border bg-white text-studio-secondary hover:border-studio-neon/50"
          }`}
        >
          <span className="font-medium block">Custom Builder</span>
          <span className="text-[10px] text-studio-muted">Free-form assembly</span>
        </button>
      </div>

      <div className="grid lg:grid-cols-[1fr_340px] gap-6">
        {/* Left: Builder controls */}
        <div className="space-y-6">
          {mode === "module-builder" ? (
            <>
              {/* Presets dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsPresetOpen(!isPresetOpen)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-md border border-studio-border bg-white text-[12px] font-mono hover:border-studio-neon/50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Sparkles size={12} className="text-studio-neon" />
                    <span className="text-studio-text font-medium">Presets</span>
                    <span className="text-[10px] text-studio-muted">
                      Quick-fill all 9 modules from a master scene
                    </span>
                  </div>
                  <ChevronDown
                    size={12}
                    className={`text-studio-muted transition-transform ${isPresetOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isPresetOpen && (
                  <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-white border border-studio-border rounded-md shadow-lg max-h-[320px] overflow-y-auto">
                    {PROMPT_PRESETS.map((preset) => (
                      <button
                        key={preset.id}
                        onClick={() => handleLoadPreset(preset.selections)}
                        className="w-full text-left px-3 py-2.5 hover:bg-studio-bg transition-colors border-b border-studio-border last:border-b-0"
                      >
                        <span className="font-medium text-[11px] text-studio-text block">
                          {preset.label}
                        </span>
                        <span className="text-[10px] text-studio-muted">
                          {preset.description}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Module count indicator */}
              <div className="flex items-center gap-2 text-[11px] font-mono">
                <span className="text-studio-muted">
                  {selectedCount}/9 modules selected
                </span>
                <div className="flex-1 h-1 bg-studio-bg rounded-full overflow-hidden">
                  <div
                    className="h-full bg-studio-neon rounded-full transition-all"
                    style={{ width: `${(selectedCount / 9) * 100}%` }}
                  />
                </div>
              </div>

              {/* Module category grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {PROMPT_MODULE_CATEGORIES.map((category) => (
                  <ModuleCategoryCard
                    key={category.id}
                    category={category}
                    selectedOptionId={moduleSelections[category.id]}
                    onSelectOption={handleModuleSelect}
                  />
                ))}
              </div>

              {/* 7 Pillars DNA reference */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-[11px] font-mono text-studio-muted uppercase tracking-wider">
                    7 Universal Pillars (Visual DNA)
                  </h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1.5">
                  {BACE_DNA_BLOCKS.map((block) => (
                    <div
                      key={block.id}
                      className="text-left px-2.5 py-2 rounded-md border border-studio-border bg-white text-[10px] font-mono"
                    >
                      <span className="text-studio-neon font-medium">P{block.pillar}</span>
                      <span className="font-medium block leading-snug text-studio-text mt-0.5">
                        {block.label}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] font-mono text-studio-muted mt-2">
                  Strategic Imperfection block is auto-appended to every assembled prompt.
                </p>
              </div>
            </>
          ) : (
            <>
              {/* Product description */}
              <div>
                <h3 className="text-[11px] font-mono text-studio-muted uppercase tracking-wider mb-2">
                  Product Description
                </h3>
                <textarea
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                  placeholder="Describe your product... e.g. A minimalist desk lamp with an adjustable arm and weighted base"
                  rows={3}
                  className="w-full px-3 py-2.5 bg-white border border-studio-border rounded-md text-sm font-mono text-studio-text placeholder:text-studio-muted focus:outline-none focus:border-studio-neon focus:ring-1 focus:ring-studio-neon resize-none"
                />
              </div>

              {/* BACE Visual DNA — 7 Pillars */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-[11px] font-mono text-studio-muted uppercase tracking-wider">
                    BACE Visual DNA — 7 Pillars
                  </h3>
                  <button
                    onClick={() =>
                      setStyleDna((prev) =>
                        prev.length === BACE_DNA_BLOCKS.length
                          ? []
                          : BACE_DNA_BLOCKS.map((b) => b.id)
                      )
                    }
                    className="text-[10px] font-mono text-studio-secondary hover:text-studio-text transition-colors"
                  >
                    {styleDna.length === BACE_DNA_BLOCKS.length
                      ? "Disable all"
                      : "Enable all"}
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                  {BACE_DNA_BLOCKS.map((block) => {
                    const active = styleDna.includes(block.id);
                    return (
                      <button
                        key={block.id}
                        onClick={() => toggleDnaBlock(block.id)}
                        className={`text-left px-3 py-2.5 rounded-md border text-[12px] font-mono transition-all ${
                          active
                            ? "border-studio-neon bg-studio-neon/10 text-studio-text"
                            : "border-studio-border bg-white text-studio-secondary hover:border-studio-neon/50 hover:bg-studio-bg"
                        }`}
                      >
                        <span className="text-[9px] text-studio-neon">Pillar {block.pillar}</span>
                        <span className="font-medium block leading-snug">
                          {block.label}
                        </span>
                        <span className="text-[10px] text-studio-muted leading-snug mt-0.5 block">
                          {block.description}
                        </span>
                      </button>
                    );
                  })}
                </div>
                {styleDna.length > 0 && (
                  <p className="text-[10px] font-mono text-studio-neon mt-2">
                    + &ldquo;{BACE_EXTRA_TRICK}&rdquo; auto-appended
                  </p>
                )}
              </div>

              <SelectableCards
                title="Render Style"
                options={RENDER_STYLES}
                selected={style}
                onSelect={toggleSingle(setStyle)}
              />

              <SelectableCards
                title="Material"
                options={MATERIALS}
                selected={material}
                onSelect={toggleMulti(setMaterial)}
                multi
              />

              <SelectableCards
                title="Lighting"
                options={LIGHTING}
                selected={lighting}
                onSelect={toggleSingle(setLighting)}
              />

              <SelectableCards
                title="Camera Angle"
                options={CAMERA_ANGLES}
                selected={angle}
                onSelect={toggleSingle(setAngle)}
              />

              <SelectableCards
                title="Environment"
                options={ENVIRONMENTS}
                selected={environment}
                onSelect={toggleSingle(setEnvironment)}
              />

              <SelectableCards
                title="Modifiers"
                options={MODIFIERS}
                selected={modifiers}
                onSelect={toggleMulti(setModifiers)}
                multi
              />

              {/* BACE Example Prompt */}
              <div>
                <h3 className="text-[11px] font-mono text-studio-muted uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Lightbulb size={12} />
                  Example Prompt &mdash; Click &amp; Collect
                </h3>
                <button
                  onClick={() => setProductDescription(BACE_EXAMPLE_PROMPT)}
                  className="w-full text-left px-3 py-2.5 rounded-md border border-studio-border bg-white text-[11px] font-mono text-studio-secondary hover:border-studio-neon/50 hover:text-studio-text transition-colors leading-snug"
                >
                  {BACE_EXAMPLE_PROMPT}
                </button>
              </div>
            </>
          )}
        </div>

        {/* Right: Live preview (sticky) */}
        <div className="lg:sticky lg:top-6 lg:self-start space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-[11px] font-mono text-studio-muted uppercase tracking-wider">
              {mode === "module-builder" ? "Assembled Prompt" : "Custom Prompt"}
            </h3>
            {activePrompt && (
              <span className="text-[11px] font-mono text-studio-muted">
                {activePrompt.length} chars
              </span>
            )}
          </div>

          {mode === "module-builder" ? (
            <StudioCard className="min-h-[200px]">
              {modulePromptText ? (
                <textarea
                  value={modulePromptText}
                  onChange={(e) => setModulePromptText(e.target.value)}
                  className="w-full text-[12px] font-mono text-studio-text leading-relaxed bg-transparent border-0 focus:outline-none resize-none min-h-[300px]"
                  rows={20}
                />
              ) : (
                <p className="text-[13px] font-mono text-studio-muted">
                  Select modules to assemble your prompt...
                </p>
              )}
            </StudioCard>
          ) : (
            <StudioCard className="min-h-[200px]">
              {prompt ? (
                <p className="text-[13px] font-mono text-studio-text leading-relaxed">
                  {prompt}
                </p>
              ) : (
                <p className="text-[13px] font-mono text-studio-muted">
                  Select options to build your prompt...
                </p>
              )}
            </StudioCard>
          )}

          {/* Module selection summary */}
          {mode === "module-builder" && selectedCount > 0 && (
            <div className="space-y-1 text-[10px] font-mono">
              {PROMPT_MODULE_CATEGORIES.map((cat) => {
                const optId = moduleSelections[cat.id];
                if (!optId) return null;
                const opt = cat.options.find((o) => o.id === optId);
                if (!opt) return null;
                return (
                  <div key={cat.id} className="flex items-center gap-1 text-studio-secondary">
                    <span className="text-studio-muted">{cat.icon}</span>
                    <span className="truncate">{opt.label}</span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Model selector */}
          <div className="space-y-2">
            <h4 className="text-[10px] font-mono text-studio-muted uppercase tracking-wider">
              Generation Model
            </h4>
            <div className="flex gap-1.5">
              <button
                onClick={() => setProvider("fal")}
                className={`flex-1 px-3 py-2 rounded-md text-[11px] font-mono transition-all border ${
                  provider === "fal"
                    ? "border-studio-neon bg-studio-neon/10 text-studio-text"
                    : "border-studio-border bg-white text-studio-secondary hover:border-studio-neon/50"
                }`}
              >
                <span className="font-medium block">Nano Banana 2</span>
                <span className="text-[9px] text-studio-muted">FAL.ai</span>
              </button>
              <button
                onClick={() => setProvider("gemini")}
                className={`flex-1 px-3 py-2 rounded-md text-[11px] font-mono transition-all border ${
                  provider === "gemini"
                    ? "border-studio-neon bg-studio-neon/10 text-studio-text"
                    : "border-studio-border bg-white text-studio-secondary hover:border-studio-neon/50"
                }`}
              >
                <span className="font-medium block">Gemini Flash</span>
                <span className="text-[9px] text-studio-muted">Google</span>
              </button>
            </div>

            {/* FAL-specific options */}
            {provider === "fal" && (
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[9px] font-mono text-studio-muted uppercase block mb-1">
                    Aspect Ratio
                  </label>
                  <select
                    value={falAspectRatio}
                    onChange={(e) => setFalAspectRatio(e.target.value)}
                    className="w-full px-2 py-1.5 bg-white border border-studio-border rounded text-[11px] font-mono text-studio-text focus:outline-none focus:border-studio-neon"
                  >
                    <option value="1:1">1:1</option>
                    <option value="4:5">4:5</option>
                    <option value="3:4">3:4</option>
                    <option value="2:3">2:3</option>
                    <option value="9:16">9:16</option>
                    <option value="16:9">16:9</option>
                    <option value="3:2">3:2</option>
                    <option value="4:3">4:3</option>
                    <option value="21:9">21:9</option>
                    <option value="auto">Auto</option>
                  </select>
                </div>
                <div>
                  <label className="text-[9px] font-mono text-studio-muted uppercase block mb-1">
                    Resolution
                  </label>
                  <select
                    value={falResolution}
                    onChange={(e) => setFalResolution(e.target.value)}
                    className="w-full px-2 py-1.5 bg-white border border-studio-border rounded text-[11px] font-mono text-studio-text focus:outline-none focus:border-studio-neon"
                  >
                    <option value="0.5K">0.5K</option>
                    <option value="1K">1K</option>
                    <option value="2K">2K</option>
                    <option value="4K">4K</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              disabled={!activePrompt}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-studio-border rounded-md text-[13px] font-mono text-studio-secondary hover:border-studio-text hover:text-studio-text transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {copied ? (
                <>
                  <Check size={15} />
                  Copied!
                </>
              ) : (
                <>
                  <Copy size={15} />
                  Copy
                </>
              )}
            </button>
            <button
              onClick={() => handleGenerate(activePrompt)}
              disabled={!activePrompt || generating}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-studio-text text-white rounded-md text-[13px] font-mono hover:bg-black transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {generating ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles size={15} />
                  Generate
                </>
              )}
            </button>
          </div>
          {provider === "gemini" && uploadedImages.length > 0 && (
            <p className="text-[10px] font-mono text-studio-neon flex items-center gap-1">
              <ImageIcon size={10} />
              {uploadedImages.length} reference image{uploadedImages.length !== 1 ? "s" : ""} will be sent with your prompt
            </p>
          )}
          {provider === "fal" && (
            <p className="text-[10px] font-mono text-studio-muted/60">
              ~$0.08/image at 1K &bull; Reference images not supported with Nano Banana 2
            </p>
          )}

          {/* Generated image result */}
          {(generating || generatedImage || genError) && (
            <div className="border border-studio-border rounded-md overflow-hidden bg-white">
              {generating ? (
                <div className="flex flex-col items-center justify-center py-12 gap-2">
                  <Loader2 size={24} className="text-studio-muted animate-spin" />
                  <p className="text-[12px] font-mono text-studio-muted">
                    Generating with {provider === "fal" ? "Nano Banana 2" : "Gemini Flash"}...
                  </p>
                  <p className="text-[10px] font-mono text-studio-muted/60">
                    This may take 10-30 seconds
                  </p>
                </div>
              ) : genError ? (
                <div className="flex flex-col items-center justify-center py-8 gap-2 px-4">
                  <AlertCircle size={20} className="text-red-400" />
                  <p className="text-[11px] font-mono text-red-500 text-center">{genError}</p>
                  <button
                    onClick={() => handleGenerate(activePrompt)}
                    className="text-[11px] font-mono text-studio-secondary hover:text-studio-text transition-colors"
                  >
                    Try again
                  </button>
                </div>
              ) : generatedImage ? (
                <div>
                  <img
                    src={generatedImage}
                    alt="Generated image"
                    className="w-full h-auto"
                  />
                  <div className="flex items-center gap-2 p-2 border-t border-studio-border">
                    <button
                      onClick={handleSaveGenerated}
                      disabled={saved}
                      className="flex-1 inline-flex items-center justify-center gap-1 py-1.5 text-[11px] font-mono text-studio-secondary hover:text-studio-text transition-colors disabled:opacity-60"
                    >
                      {saved ? <Check size={11} /> : <BookmarkPlus size={11} />}
                      {saved ? "Saved" : "Save to Library"}
                    </button>
                    <button
                      onClick={handleDownloadGenerated}
                      className="flex-1 inline-flex items-center justify-center gap-1 py-1.5 text-[11px] font-mono text-studio-secondary hover:text-studio-text transition-colors"
                    >
                      <Download size={11} />
                      Download
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          )}

          {/* Selection summary (custom builder only) */}
          {mode === "custom-builder" &&
            (style.length > 0 ||
              material.length > 0 ||
              lighting.length > 0 ||
              angle.length > 0 ||
              environment.length > 0 ||
              modifiers.length > 0) && (
              <div className="space-y-1.5 pt-2">
                <h4 className="text-[10px] font-mono text-studio-muted uppercase tracking-wider">
                  Selections
                </h4>
                {style.length > 0 && (
                  <div className="text-[11px] font-mono text-studio-secondary">
                    <span className="text-studio-muted">Style:</span>{" "}
                    {getLabel(RENDER_STYLES, style).join(", ")}
                  </div>
                )}
                {material.length > 0 && (
                  <div className="text-[11px] font-mono text-studio-secondary">
                    <span className="text-studio-muted">Material:</span>{" "}
                    {getLabel(MATERIALS, material).join(", ")}
                  </div>
                )}
                {lighting.length > 0 && (
                  <div className="text-[11px] font-mono text-studio-secondary">
                    <span className="text-studio-muted">Lighting:</span>{" "}
                    {getLabel(LIGHTING, lighting).join(", ")}
                  </div>
                )}
                {angle.length > 0 && (
                  <div className="text-[11px] font-mono text-studio-secondary">
                    <span className="text-studio-muted">Angle:</span>{" "}
                    {getLabel(CAMERA_ANGLES, angle).join(", ")}
                  </div>
                )}
                {environment.length > 0 && (
                  <div className="text-[11px] font-mono text-studio-secondary">
                    <span className="text-studio-muted">Environment:</span>{" "}
                    {getLabel(ENVIRONMENTS, environment).join(", ")}
                  </div>
                )}
                {modifiers.length > 0 && (
                  <div className="text-[11px] font-mono text-studio-secondary">
                    <span className="text-studio-muted">Modifiers:</span>{" "}
                    {getLabel(MODIFIERS, modifiers).join(", ")}
                  </div>
                )}
              </div>
            )}

          {/* Reference Images */}
          <div className="pt-3 border-t border-studio-border space-y-2">
            <h4 className="text-[10px] font-mono text-studio-muted uppercase tracking-wider">
              Reference Images
            </h4>

            {/* Upload area */}
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`border-2 border-dashed rounded-md p-4 text-center transition-colors cursor-pointer ${
                isDragging
                  ? "border-studio-neon bg-studio-neon/5"
                  : "border-studio-border hover:border-studio-neon/50"
              }`}
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload size={16} className="mx-auto text-studio-muted mb-1" />
              <p className="text-[11px] font-mono text-studio-muted">
                Drop images or click to upload
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => handleFileUpload(e.target.files)}
              />
            </div>

            {/* Uploaded reference thumbnails */}
            {uploadedImages.length > 0 && (
              <div className="grid grid-cols-3 gap-1.5">
                {uploadedImages.map((img) => (
                  <div
                    key={img._id}
                    className="relative aspect-square rounded overflow-hidden border border-studio-border group"
                  >
                    <img
                      src={img.dataUrl}
                      alt={img.fileName ?? "Reference"}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => removeImage(img._id)}
                      className="absolute top-0.5 right-0.5 p-0.5 bg-black/60 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={10} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {uploadedImages.length === 0 && (
              <p className="text-[10px] font-mono text-studio-muted/60">
                No references yet. Upload BACE hub reference images for best results.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
