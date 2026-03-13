"use client";

import { useState, useMemo } from "react";
import SectionHeader from "@/components/studio/SectionHeader";
import StudioCard from "@/components/studio/StudioCard";
import {
  RENDER_STYLES,
  MATERIALS,
  LIGHTING,
  CAMERA_ANGLES,
  ENVIRONMENTS,
  MODIFIERS,
  type PromptOption,
} from "@/lib/prompt-builder-data";
import { Copy, Check, RotateCcw } from "lucide-react";

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

export default function PromptBuilderPage() {
  const [productDescription, setProductDescription] = useState("");
  const [style, setStyle] = useState<string[]>([]);
  const [material, setMaterial] = useState<string[]>([]);
  const [lighting, setLighting] = useState<string[]>([]);
  const [angle, setAngle] = useState<string[]>([]);
  const [environment, setEnvironment] = useState<string[]>([]);
  const [modifiers, setModifiers] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

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

    return parts.join(". ") + (parts.length ? "." : "");
  }, [productDescription, style, material, lighting, angle, environment, modifiers]);

  const handleCopy = async () => {
    if (!prompt) return;
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setProductDescription("");
    setStyle([]);
    setMaterial([]);
    setLighting([]);
    setAngle([]);
    setEnvironment([]);
    setModifiers([]);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <SectionHeader
        title="Prompt Builder"
        subtitle="Assemble visual prompts for industrial design renders"
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

      <div className="grid lg:grid-cols-[1fr_340px] gap-6">
        {/* Left: Builder controls */}
        <div className="space-y-6">
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
        </div>

        {/* Right: Live preview (sticky) */}
        <div className="lg:sticky lg:top-6 lg:self-start space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-[11px] font-mono text-studio-muted uppercase tracking-wider">
              Assembled Prompt
            </h3>
            {prompt && (
              <span className="text-[11px] font-mono text-studio-muted">
                {prompt.length} chars
              </span>
            )}
          </div>

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

          <button
            onClick={handleCopy}
            disabled={!prompt}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-studio-text text-white rounded-md text-[13px] font-mono hover:bg-black transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {copied ? (
              <>
                <Check size={15} />
                Copied!
              </>
            ) : (
              <>
                <Copy size={15} />
                Copy Prompt
              </>
            )}
          </button>

          {/* Selection summary */}
          {(style.length > 0 ||
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
        </div>
      </div>
    </div>
  );
}
