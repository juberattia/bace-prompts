"use client";

import { useState } from "react";
import Link from "next/link";

// ─── Atuin-inspired Design Tokens ────────────────────────────────────────────
const TEXT = "#111111";
const TEXT_SECONDARY = "#6b6b6b";
const TEXT_MUTED = "#999999";
const BG = "#ffffff";
const BG_SUBTLE = "#f7f7f7";
const BORDER = "#e8e8e8";
const DARK = "#111111";
// ─────────────────────────────────────────────────────────────────────────────

// ─── Master Prompt Data ──────────────────────────────────────────────────────

interface PromptBlock {
  label: string;
  value: string;
}

interface MasterPrompt {
  id: string;
  title: string;
  titleAccent: string;
  scene: string;
  fullPrompt: string;
  images: string[];
  blocks: {
    scene: PromptBlock;
    subject: PromptBlock;
    lighting: PromptBlock;
    atmosphere: PromptBlock;
    style: PromptBlock;
    camera: PromptBlock;
  };
  tags: string[];
}

const MASTER_PROMPTS: MasterPrompt[] = [
  {
    id: "hub-sunset-retrieval",
    title: "Hub Sunset",
    titleAccent: "Retrieval",
    scene: "Urban evening, parcel pickup",
    fullPrompt:
      "Photorealistic urban evening scene showing a person retrieving a parcel from a softly illuminated bace Hub at sunset. Warm golden light reflecting on city surfaces. Calm but lively street atmosphere with pedestrians and bicycles. Editorial lifestyle photography with cinematic evening tones.",
    images: [
      "/images/bace/cafe-scene.jpg",
      "/images/bace/cobblestone-cafe.jpg",
      "/images/bace/business-district.jpg",
    ],
    blocks: {
      scene: { label: "Scene", value: "Photorealistic urban evening scene" },
      subject: {
        label: "Subject",
        value: "A person retrieving a parcel from a softly illuminated bace Hub at sunset",
      },
      lighting: { label: "Lighting", value: "Warm golden light reflecting on city surfaces" },
      atmosphere: {
        label: "Atmosphere",
        value: "Calm but lively street atmosphere with pedestrians and bicycles",
      },
      style: {
        label: "Style",
        value: "Editorial lifestyle photography with cinematic evening tones",
      },
      camera: {
        label: "Camera",
        value: "Medium-wide shot, shallow depth of field, golden hour color grade",
      },
    },
    tags: ["Golden Hour", "Urban", "Lifestyle", "Editorial"],
  },
  {
    id: "hub-morning-commute",
    title: "Hub Morning",
    titleAccent: "Commute",
    scene: "City morning, quick pickup",
    fullPrompt:
      "Photorealistic early morning cityscape showing a young professional collecting a package from a bace Hub on their commute. Crisp blue-hour light transitioning to warm sunrise. Quiet streets with soft fog and the first cyclists of the day. Editorial lifestyle photography with clean, aspirational morning tones.",
    images: [
      "/images/bace/street-retrieval.jpg",
      "/images/bace/package-insert.jpg",
      "/images/bace/qr-closeup.jpg",
    ],
    blocks: {
      scene: { label: "Scene", value: "Photorealistic early morning cityscape" },
      subject: {
        label: "Subject",
        value: "A young professional collecting a package from a bace Hub on their commute",
      },
      lighting: { label: "Lighting", value: "Crisp blue-hour light transitioning to warm sunrise" },
      atmosphere: {
        label: "Atmosphere",
        value: "Quiet streets with soft fog and the first cyclists of the day",
      },
      style: {
        label: "Style",
        value: "Editorial lifestyle photography with clean, aspirational morning tones",
      },
      camera: {
        label: "Camera",
        value: "Wide establishing shot, cool-to-warm color transition, natural grain",
      },
    },
    tags: ["Blue Hour", "Urban", "Commute", "Aspirational"],
  },
  {
    id: "hub-rainy-night",
    title: "Hub Rainy",
    titleAccent: "Night",
    scene: "Rainy evening, neon reflections",
    fullPrompt:
      "Photorealistic rainy night scene showing a person scanning their phone at a bace Hub, neon signage reflecting in wet pavement. Moody cinematic lighting with orange and teal color palette. Urban solitude with blurred passing traffic. Editorial photography with neo-noir atmosphere.",
    images: [
      "/images/bace/drawer-closeup.jpg",
      "/images/bace/cobblestone-pickup.jpg",
      "/images/bace/split-view.jpg",
    ],
    blocks: {
      scene: { label: "Scene", value: "Photorealistic rainy night scene" },
      subject: {
        label: "Subject",
        value: "A person scanning their phone at a bace Hub, neon signage reflecting in wet pavement",
      },
      lighting: {
        label: "Lighting",
        value: "Moody cinematic lighting with orange and teal color palette",
      },
      atmosphere: { label: "Atmosphere", value: "Urban solitude with blurred passing traffic" },
      style: { label: "Style", value: "Editorial photography with neo-noir atmosphere" },
      camera: {
        label: "Camera",
        value: "Low angle, wide aperture f/1.4, reflections in foreground puddles",
      },
    },
    tags: ["Night", "Neo-Noir", "Cinematic", "Moody"],
  },
  {
    id: "hub-residential-weekend",
    title: "Hub Residential",
    titleAccent: "Weekend",
    scene: "Quiet neighborhood, weekend pickup",
    fullPrompt:
      "Photorealistic weekend scene in a residential European neighborhood showing a person casually walking to a bace Hub with a coffee in hand. Soft diffused afternoon light filtering through trees. Relaxed suburban atmosphere with children playing in the background. Editorial lifestyle photography with warm, authentic documentary feel.",
    images: [
      "/images/bace/summer-pickup.jpg",
      "/images/bace/community-gather.jpg",
      "/images/bace/group-friends.jpg",
    ],
    blocks: {
      scene: {
        label: "Scene",
        value: "Photorealistic weekend scene in a residential European neighborhood",
      },
      subject: {
        label: "Subject",
        value: "A person casually walking to a bace Hub with a coffee in hand",
      },
      lighting: {
        label: "Lighting",
        value: "Soft diffused afternoon light filtering through trees",
      },
      atmosphere: {
        label: "Atmosphere",
        value: "Relaxed suburban atmosphere with children playing in the background",
      },
      style: {
        label: "Style",
        value: "Editorial lifestyle photography with warm, authentic documentary feel",
      },
      camera: {
        label: "Camera",
        value: "Medium shot, natural light, 35mm focal length, organic composition",
      },
    },
    tags: ["Residential", "Weekend", "Documentary", "Warm"],
  },
  {
    id: "hub-bike-courier",
    title: "Hub Bike",
    titleAccent: "Courier",
    scene: "City center, courier drop-off",
    fullPrompt:
      "Photorealistic urban scene showing a bike courier depositing a package into a bace Hub on a busy European boulevard. Dynamic late-afternoon sidelight creating long shadows. Energetic city atmosphere with tram tracks and outdoor cafe terraces. Editorial action photography with European street culture vibe.",
    images: [
      "/images/bace/hi-vis-courier.png",
      "/images/bace/cyclist-pickup.jpg",
      "/images/bace/busy-street.jpg",
    ],
    blocks: {
      scene: {
        label: "Scene",
        value: "Photorealistic urban scene on a busy European boulevard",
      },
      subject: {
        label: "Subject",
        value: "A bike courier depositing a package into a bace Hub",
      },
      lighting: {
        label: "Lighting",
        value: "Dynamic late-afternoon sidelight creating long shadows",
      },
      atmosphere: {
        label: "Atmosphere",
        value: "Energetic city atmosphere with tram tracks and outdoor cafe terraces",
      },
      style: {
        label: "Style",
        value: "Editorial action photography with European street culture vibe",
      },
      camera: {
        label: "Camera",
        value: "Tracking shot feel, slight motion blur on cyclist, sharp on Hub",
      },
    },
    tags: ["Action", "European", "Dynamic", "Street Culture"],
  },
  {
    id: "hub-winter-cozy",
    title: "Hub Winter",
    titleAccent: "Evening",
    scene: "Winter city, warm contrast",
    fullPrompt:
      "Photorealistic winter evening scene showing a person in a warm coat retrieving a parcel from a glowing bace Hub surrounded by light snowfall. Warm amber Hub light contrasting with cool blue winter dusk. Cozy urban atmosphere with steaming breath and illuminated shop windows. Editorial lifestyle photography with hygge-inspired cinematic warmth.",
    images: [
      "/images/bace/brick-building.jpg",
      "/images/bace/cobblestone-cafe.jpg",
    ],
    blocks: {
      scene: {
        label: "Scene",
        value: "Photorealistic winter evening scene with light snowfall",
      },
      subject: {
        label: "Subject",
        value: "A person in a warm coat retrieving a parcel from a glowing bace Hub",
      },
      lighting: {
        label: "Lighting",
        value: "Warm amber Hub light contrasting with cool blue winter dusk",
      },
      atmosphere: {
        label: "Atmosphere",
        value: "Cozy urban atmosphere with steaming breath and illuminated shop windows",
      },
      style: {
        label: "Style",
        value: "Editorial lifestyle photography with hygge-inspired cinematic warmth",
      },
      camera: {
        label: "Camera",
        value: "Medium close-up, bokeh snow particles, warm-cool split toning",
      },
    },
    tags: ["Winter", "Cozy", "Contrast", "Hygge"],
  },
];

// ─── Reusable Style Building Blocks ──────────────────────────────────────────

const STYLE_BUILDING_BLOCKS = {
  sceneTypes: [
    "Photorealistic urban evening scene",
    "Photorealistic early morning cityscape",
    "Photorealistic rainy night scene",
    "Photorealistic weekend residential scene",
    "Photorealistic winter evening scene",
  ],
  lightingModes: [
    "Warm golden light reflecting on city surfaces",
    "Crisp blue-hour light transitioning to warm sunrise",
    "Moody cinematic lighting with orange and teal palette",
    "Soft diffused afternoon light filtering through trees",
    "Warm amber light contrasting with cool blue dusk",
    "Dynamic late-afternoon sidelight creating long shadows",
  ],
  atmospheres: [
    "Calm but lively street atmosphere with pedestrians and bicycles",
    "Quiet streets with soft fog and the first cyclists of the day",
    "Urban solitude with blurred passing traffic",
    "Relaxed suburban atmosphere with children playing",
    "Energetic city atmosphere with tram tracks and cafe terraces",
    "Cozy urban atmosphere with steaming breath and shop windows",
  ],
  styles: [
    "Editorial lifestyle photography with cinematic evening tones",
    "Editorial lifestyle photography with clean, aspirational morning tones",
    "Editorial photography with neo-noir atmosphere",
    "Editorial lifestyle photography with warm, authentic documentary feel",
    "Editorial action photography with European street culture vibe",
    "Editorial lifestyle photography with hygge-inspired cinematic warmth",
  ],
  cameraSettings: [
    "Medium-wide shot, shallow depth of field, golden hour color grade",
    "Wide establishing shot, cool-to-warm color transition, natural grain",
    "Low angle, wide aperture f/1.4, reflections in foreground puddles",
    "Medium shot, natural light, 35mm focal length, organic composition",
    "Tracking shot feel, slight motion blur on cyclist, sharp on Hub",
    "Medium close-up, bokeh snow particles, warm-cool split toning",
  ],
};

// ─── Visual Rules ────────────────────────────────────────────────────────────

const VISUAL_RULES = [
  { rule: "Always photorealistic", desc: "Never stylized, illustrated, or 3D-rendered" },
  { rule: "bace Hub softly lit", desc: "The Hub glows \u2014 it\u2019s a warm beacon, never harsh" },
  { rule: "Editorial lifestyle", desc: "Magazine-quality compositions, not stock photography" },
  { rule: "European urban context", desc: "Cobblestones, trams, bike lanes, cafe culture" },
  { rule: "Human interaction", desc: "Always show a person actively using the Hub" },
  { rule: "Cinematic color grade", desc: "Warm/cool contrast, never flat or oversaturated" },
  { rule: "Natural atmosphere", desc: "Real weather, real light, real street life" },
  { rule: "Shallow depth of field", desc: "Hub and person sharp, environment softly blurred" },
];

const NEGATIVE_PROMPTS = [
  "3D render or CGI look",
  "Illustration or cartoon style",
  "Stock photography feel",
  "Oversaturated colors",
  "Flat lighting, no shadows",
  "Empty streets, no people",
  "Generic American suburbia",
  "Perfect symmetry, too staged",
  "HDR tonemapping artifacts",
  "Visible text or logos (except bace)",
  "Indoor scenes",
  "Night without any ambient light",
];

// ─── Copy helper ─────────────────────────────────────────────────────────────

function CopyButton({ text, label }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <button
      onClick={handleCopy}
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "11px",
        letterSpacing: "0.08em",
        color: copied ? BG : TEXT,
        backgroundColor: copied ? TEXT : "transparent",
        border: `1px solid ${copied ? TEXT : BORDER}`,
        borderRadius: 0,
        padding: "7px 16px",
        cursor: "pointer",
        transition: "all 0.2s ease",
        whiteSpace: "nowrap",
      }}
      onMouseEnter={(e) => {
        if (!copied) {
          (e.currentTarget as HTMLButtonElement).style.backgroundColor = TEXT;
          (e.currentTarget as HTMLButtonElement).style.color = BG;
        }
      }}
      onMouseLeave={(e) => {
        if (!copied) {
          (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
          (e.currentTarget as HTMLButtonElement).style.color = TEXT;
        }
      }}
    >
      {copied ? "Copied" : label || "Copy"}
    </button>
  );
}

// ─── Prompt Card ─────────────────────────────────────────────────────────────

function PromptCard({
  prompt,
  index,
  expanded,
  onToggle,
}: {
  prompt: MasterPrompt;
  index: number;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      style={{
        borderBottom: `1px solid ${BORDER}`,
        transition: "background-color 0.2s ease",
      }}
    >
      {/* Card Header */}
      <div
        onClick={onToggle}
        style={{
          padding: "32px 0",
          cursor: "pointer",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "24px",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", gap: "32px", flex: 1, minWidth: 0 }}>
          {/* Number */}
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
              color: TEXT_MUTED,
              letterSpacing: "0.05em",
              paddingTop: "8px",
              flexShrink: 0,
              width: "28px",
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          {/* Thumbnails */}
          <div
            style={{
              display: "flex",
              gap: "4px",
              flexShrink: 0,
            }}
          >
            {prompt.images.slice(0, 3).map((src, i) => (
              <div
                key={i}
                style={{
                  width: i === 0 ? "120px" : "60px",
                  height: "80px",
                  overflow: "hidden",
                  flexShrink: 0,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    filter: "saturate(0.85)",
                    transition: "filter 0.3s ease, transform 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLImageElement).style.filter = "saturate(1)";
                    (e.currentTarget as HTMLImageElement).style.transform = "scale(1.03)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLImageElement).style.filter = "saturate(0.85)";
                    (e.currentTarget as HTMLImageElement).style.transform = "scale(1)";
                  }}
                />
              </div>
            ))}
          </div>

          <div style={{ minWidth: 0 }}>
            {/* Title with italic accent */}
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 500,
                fontSize: "clamp(22px, 2.5vw, 32px)",
                letterSpacing: "-0.02em",
                color: TEXT,
                lineHeight: 1.15,
                marginBottom: "8px",
              }}
            >
              {prompt.title} <em style={{ fontStyle: "italic" }}>{prompt.titleAccent}</em>
            </h3>

            {/* Scene description */}
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "12px",
                letterSpacing: "0.08em",
                color: TEXT_MUTED,
              }}
            >
              {prompt.scene}
            </p>

            {/* Tags */}
            <div style={{ display: "flex", gap: "12px", marginTop: "10px", flexWrap: "wrap" }}>
              {prompt.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "10px",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: TEXT_MUTED,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "16px", flexShrink: 0, paddingTop: "8px" }}>
          <div onClick={(e) => e.stopPropagation()}>
            <CopyButton text={prompt.fullPrompt} label="Copy prompt" />
          </div>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "24px",
              fontWeight: 300,
              color: TEXT_MUTED,
              transform: expanded ? "rotate(45deg)" : "rotate(0deg)",
              transition: "transform 0.25s ease",
              display: "inline-block",
              lineHeight: 1,
            }}
          >
            +
          </span>
        </div>
      </div>

      {/* Expanded content */}
      {expanded && (
        <div style={{ paddingBottom: "40px" }}>
          {/* Image gallery */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${prompt.images.length}, 1fr)`,
              gap: "4px",
              marginLeft: "60px",
              marginBottom: "24px",
            }}
          >
            {prompt.images.map((src, i) => (
              <div
                key={i}
                style={{
                  height: "200px",
                  overflow: "hidden",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    transition: "transform 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLImageElement).style.transform = "scale(1.03)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLImageElement).style.transform = "scale(1)";
                  }}
                />
              </div>
            ))}
          </div>

          {/* Full prompt */}
          <div
            style={{
              backgroundColor: BG_SUBTLE,
              padding: "28px 32px",
              marginLeft: "60px",
              marginBottom: "24px",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: TEXT_MUTED,
                display: "block",
                marginBottom: "14px",
              }}
            >
              Full Prompt
            </span>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "16px",
                lineHeight: 1.7,
                color: TEXT_SECONDARY,
                fontWeight: 400,
              }}
            >
              {prompt.fullPrompt}
            </p>
          </div>

          {/* Building blocks */}
          <div style={{ marginLeft: "60px" }}>
            {Object.values(prompt.blocks).map((block) => (
              <div
                key={block.label}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "24px",
                  padding: "16px 0",
                  borderTop: `1px solid ${BORDER}`,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "10px",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: TEXT_MUTED,
                    width: "90px",
                    flexShrink: 0,
                    paddingTop: "3px",
                  }}
                >
                  {block.label}
                </span>
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "15px",
                    lineHeight: 1.6,
                    color: TEXT_SECONDARY,
                    flex: 1,
                    fontWeight: 400,
                  }}
                >
                  {block.value}
                </p>
                <div style={{ flexShrink: 0 }} onClick={(e) => e.stopPropagation()}>
                  <CopyButton text={block.value} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function PromptsPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"prompts" | "blocks" | "rules">("prompts");

  const tabs: { key: typeof activeTab; label: string }[] = [
    { key: "prompts", label: "Prompts" },
    { key: "blocks", label: "Building Blocks" },
    { key: "rules", label: "Rules" },
  ];

  return (
    <div style={{ backgroundColor: BG, minHeight: "100vh", color: TEXT }}>

      {/* ── Navigation ── */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 20,
          backgroundColor: BG,
          borderBottom: `1px solid ${BORDER}`,
          padding: "0 clamp(20px, 4vw, 80px)",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link href="/" style={{ textDecoration: "none", color: TEXT }}>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: "16px",
              letterSpacing: "-0.01em",
              color: TEXT,
            }}
          >
            bace
          </span>
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "12px",
                letterSpacing: "0.04em",
                color: activeTab === tab.key ? TEXT : TEXT_MUTED,
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
                padding: "4px 0",
                borderBottom: activeTab === tab.key ? `1.5px solid ${TEXT}` : "1.5px solid transparent",
                transition: "color 0.2s ease, border-color 0.2s ease",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <Link
          href="/projects"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "12px",
            color: TEXT_MUTED,
            textDecoration: "none",
            transition: "color 0.2s ease",
          }}
        >
          Projects
        </Link>
      </nav>

      {/* ── Hero ── */}
      <section
        style={{
          padding: "clamp(60px, 10vw, 140px) clamp(20px, 4vw, 80px) 0",
          maxWidth: "1280px",
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 500,
            fontSize: "clamp(40px, 7vw, 88px)",
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            color: TEXT,
            marginBottom: "32px",
          }}
        >
          We turn ideas into<br />
          <em style={{ fontStyle: "italic" }}>consistent visuals</em>
        </h1>

        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(16px, 1.5vw, 20px)",
            lineHeight: 1.65,
            color: TEXT_SECONDARY,
            maxWidth: "560px",
            fontWeight: 400,
          }}
        >
          Master prompts for generating consistent bace Hub visuals.
          Every scene follows the same editorial rules &mdash; photorealistic,
          cinematic, European urban context.
        </p>
      </section>

      {/* ── Stats Bar ── */}
      <section
        style={{
          padding: "clamp(48px, 6vw, 80px) clamp(20px, 4vw, 80px)",
          maxWidth: "1280px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "24px",
            borderTop: `1px solid ${BORDER}`,
            borderBottom: `1px solid ${BORDER}`,
            padding: "40px 0",
          }}
        >
          {[
            { num: String(MASTER_PROMPTS.length), label: "Master scenes" },
            { num: "6", label: "Building blocks per scene" },
            { num: String(VISUAL_RULES.length), label: "Visual rules" },
            { num: "100%", label: "Photorealistic" },
          ].map((stat) => (
            <div key={stat.label}>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "clamp(32px, 4vw, 52px)",
                  letterSpacing: "-0.03em",
                  color: TEXT,
                  display: "block",
                  lineHeight: 1.1,
                  marginBottom: "8px",
                }}
              >
                {stat.num}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  letterSpacing: "0.08em",
                  color: TEXT_MUTED,
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Content ── */}
      <main
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 clamp(20px, 4vw, 80px) clamp(80px, 10vw, 140px)",
        }}
      >
        {/* ── TAB: Master Prompts ── */}
        {activeTab === "prompts" && (
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
                marginBottom: "16px",
              }}
            >
              <h2
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: TEXT_MUTED,
                }}
              >
                All Scenes
              </h2>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  color: TEXT_MUTED,
                }}
              >
                {MASTER_PROMPTS.length} prompts
              </span>
            </div>

            <div style={{ borderTop: `1px solid ${BORDER}` }}>
              {MASTER_PROMPTS.map((prompt, i) => (
                <PromptCard
                  key={prompt.id}
                  prompt={prompt}
                  index={i}
                  expanded={expandedId === prompt.id}
                  onToggle={() =>
                    setExpandedId(expandedId === prompt.id ? null : prompt.id)
                  }
                />
              ))}
            </div>
          </div>
        )}

        {/* ── TAB: Building Blocks ── */}
        {activeTab === "blocks" && (
          <div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 500,
                fontSize: "clamp(28px, 4vw, 44px)",
                letterSpacing: "-0.02em",
                color: TEXT,
                marginBottom: "16px",
                lineHeight: 1.15,
              }}
            >
              Mix and match <em style={{ fontStyle: "italic" }}>building blocks</em>
            </h2>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "16px",
                lineHeight: 1.65,
                color: TEXT_SECONDARY,
                maxWidth: "520px",
                marginBottom: "56px",
              }}
            >
              Copy individual fragments and combine them to create new scenes
              that stay consistent with the bace visual identity.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "56px" }}>
              {(
                [
                  { key: "sceneTypes", label: "Scene Types", num: "01" },
                  { key: "lightingModes", label: "Lighting Modes", num: "02" },
                  { key: "atmospheres", label: "Atmospheres", num: "03" },
                  { key: "styles", label: "Photography Styles", num: "04" },
                  { key: "cameraSettings", label: "Camera Settings", num: "05" },
                ] as const
              ).map((section) => (
                <div key={section.key}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: "16px",
                      marginBottom: "20px",
                      paddingBottom: "12px",
                      borderBottom: `1px solid ${BORDER}`,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "11px",
                        color: TEXT_MUTED,
                      }}
                    >
                      {section.num}
                    </span>
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 600,
                        fontSize: "18px",
                        letterSpacing: "-0.01em",
                        color: TEXT,
                      }}
                    >
                      {section.label}
                    </h3>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                    {STYLE_BUILDING_BLOCKS[section.key].map((item, i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: "24px",
                          padding: "16px 0",
                          borderBottom: `1px solid ${BORDER}`,
                        }}
                      >
                        <p
                          style={{
                            fontFamily: "var(--font-display)",
                            fontSize: "15px",
                            lineHeight: 1.55,
                            color: TEXT_SECONDARY,
                            flex: 1,
                          }}
                        >
                          {item}
                        </p>
                        <CopyButton text={item} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Formula block */}
              <div
                style={{
                  backgroundColor: DARK,
                  padding: "clamp(32px, 4vw, 56px)",
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 500,
                    fontSize: "clamp(24px, 3vw, 36px)",
                    letterSpacing: "-0.02em",
                    color: BG,
                    marginBottom: "20px",
                    lineHeight: 1.15,
                  }}
                >
                  Build your <em style={{ fontStyle: "italic" }}>own</em>
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "15px",
                    lineHeight: 1.7,
                    color: "rgba(255,255,255,0.5)",
                    marginBottom: "28px",
                    maxWidth: "520px",
                  }}
                >
                  Combine one block from each category. The formula always stays the same.
                </p>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "13px",
                    lineHeight: 2.2,
                    color: "rgba(255,255,255,0.35)",
                    borderLeft: "2px solid rgba(255,255,255,0.15)",
                    paddingLeft: "20px",
                  }}
                >
                  [Scene Type] showing [Subject with bace Hub] at [time].<br />
                  [Lighting Mode].<br />
                  [Atmosphere].<br />
                  [Photography Style].
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB: Visual Rules ── */}
        {activeTab === "rules" && (
          <div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 500,
                fontSize: "clamp(28px, 4vw, 44px)",
                letterSpacing: "-0.02em",
                color: TEXT,
                marginBottom: "16px",
                lineHeight: 1.15,
              }}
            >
              The <em style={{ fontStyle: "italic" }}>rules</em> we never break
            </h2>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "16px",
                lineHeight: 1.65,
                color: TEXT_SECONDARY,
                maxWidth: "520px",
                marginBottom: "56px",
              }}
            >
              Eight non-negotiable rules that keep every bace Hub
              visual consistent, regardless of scene or mood.
            </p>

            <div style={{ borderTop: `1px solid ${BORDER}` }}>
              {VISUAL_RULES.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "32px",
                    padding: "28px 0",
                    borderBottom: `1px solid ${BORDER}`,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "12px",
                      color: TEXT_MUTED,
                      width: "28px",
                      flexShrink: 0,
                      paddingTop: "3px",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div style={{ flex: 1 }}>
                    <h4
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 600,
                        fontSize: "18px",
                        letterSpacing: "-0.01em",
                        color: TEXT,
                        marginBottom: "6px",
                      }}
                    >
                      {item.rule}
                    </h4>
                    <p
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "15px",
                        color: TEXT_SECONDARY,
                        lineHeight: 1.55,
                      }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Negative prompts */}
            <div
              style={{
                backgroundColor: DARK,
                padding: "clamp(32px, 4vw, 56px)",
                marginTop: "56px",
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 500,
                  fontSize: "clamp(24px, 3vw, 36px)",
                  letterSpacing: "-0.02em",
                  color: BG,
                  marginBottom: "8px",
                  lineHeight: 1.15,
                }}
              >
                Always <em style={{ fontStyle: "italic" }}>avoid</em>
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "15px",
                  lineHeight: 1.65,
                  color: "rgba(255,255,255,0.45)",
                  marginBottom: "32px",
                  maxWidth: "480px",
                }}
              >
                Include these as negative prompts to keep generations on-brand.
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                  gap: "1px",
                  backgroundColor: "rgba(255,255,255,0.08)",
                }}
              >
                {NEGATIVE_PROMPTS.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "12px",
                      color: "rgba(255,255,255,0.45)",
                      padding: "16px 20px",
                      backgroundColor: DARK,
                      lineHeight: 1.5,
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Copy all rules */}
            <div style={{ marginTop: "32px" }}>
              <CopyButton
                text={[
                  "bace Hub Visual Rules:",
                  "",
                  ...VISUAL_RULES.map((r, i) => `${i + 1}. ${r.rule} \u2014 ${r.desc}`),
                  "",
                  "Always avoid: " + NEGATIVE_PROMPTS.join(", ") + ".",
                ].join("\n")}
                label="Copy all rules"
              />
            </div>
          </div>
        )}
      </main>

      {/* ── Footer ── */}
      <footer
        style={{
          backgroundColor: DARK,
          padding: "clamp(48px, 6vw, 80px) clamp(20px, 4vw, 80px)",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "32px",
          }}
        >
          <div>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: "16px",
                color: BG,
                display: "block",
                marginBottom: "12px",
              }}
            >
              bace
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "12px",
                color: "rgba(255,255,255,0.35)",
                lineHeight: 1.7,
              }}
            >
              Consistent visual identity system
            </span>
          </div>

          <div style={{ display: "flex", gap: "48px" }}>
            {[
              { label: "Prompts", href: "/prompts" },
              { label: "Projects", href: "/projects" },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "12px",
                  color: "rgba(255,255,255,0.45)",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
              color: "rgba(255,255,255,0.25)",
            }}
          >
            2026
          </span>
        </div>
      </footer>
    </div>
  );
}
