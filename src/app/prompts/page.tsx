"use client";

import { useState, useEffect, useRef, useCallback } from "react";

// ─── Atuin-inspired Design Tokens ────────────────────────────────────────────
const TEXT = "#111111";
const TEXT_SECONDARY = "#6b6b6b";
const TEXT_MUTED = "#999999";
const BG = "#ffffff";
const BG_SUBTLE = "#f7f7f7";
const BORDER = "#e8e8e8";
const DARK = "#111111";
const NEON_GREEN = "#C8E632";
// ─────────────────────────────────────────────────────────────────────────────

// ─── Visual DNA ──────────────────────────────────────────────────────────────

const VISUAL_DNA = `Photorealistic editorial lifestyle photography in a vibrant urban environment.

Strong natural sunlight with visible highlights and shadows. Warm daylight with saturated but natural colors. Bright atmosphere similar to contemporary street photography and modern lifestyle campaigns.

Shot with a slightly wide angle lens (approx. 28mm\u201335mm) creating dynamic perspective and spatial depth.

Camera positioned close to the action (around 1\u20132 meters). Slightly low or slightly high angle allowed. Composition feels spontaneous and not perfectly centered.

Foreground elements such as hands, bags, drinks, bicycles, parcels or tables may appear partially cropped in the frame.

Urban textures visible: pavement, concrete, asphalt, glass storefronts, metal surfaces, cars, bicycles, trees, benches or street infrastructure.

People feel authentic and relaxed, mid-action moments such as talking, laughing, picking something up, drinking, walking or exchanging objects.

The mood is lively, warm, social and slightly playful, capturing everyday urban micro-moments.

The bace Hub appears naturally integrated in the scene and part of everyday city life.`;

const ENERGY_BOOST =
  "captured in the style of modern street lifestyle campaigns, dynamic editorial photography";

// ─── 12 Canonical Scenes ─────────────────────────────────────────────────────

interface CanonicalScene {
  id: string;
  num: string;
  title: string;
  titleAccent: string;
  story: string;
  composition: string[];
  prompt: string;
  images: string[];
}

const CANONICAL_SCENES: CanonicalScene[] = [
  {
    id: "pickup-moment",
    num: "01",
    title: "The Pickup",
    titleAccent: "Moment",
    story: "A person retrieves a parcel from the Hub during their daily routine.",
    composition: ["Medium shot", "Person slightly off-center", "Hub compartment open", "Parcel clearly visible"],
    prompt: `Photorealistic editorial street photography in a vibrant European city environment.\n\nA person casually takes a parcel box out of an open compartment of the bace Hub on a sunny city sidewalk.\n\nNatural sunlight with warm highlights and shadows on the pavement. Urban background with bicycles, storefronts and pedestrians.\n\nShot with a slightly wide lens (28\u201335mm), camera close to the subject, dynamic framing.\n\nAuthentic everyday moment showing a simple package pickup during a daily routine.`,
    images: ["/images/bace/street-retrieval.jpg", "/images/bace/cafe-scene.jpg"],
  },
  {
    id: "the-return",
    num: "02",
    title: "The",
    titleAccent: "Return",
    story: "A user places a parcel into the Hub.",
    composition: ["Close shot", "Hands + parcel + open compartment"],
    prompt: `Photorealistic close lifestyle shot of hands placing a parcel box into an open bace Hub compartment.\n\nStrong natural sunlight with shadows and reflections on metal surfaces.\n\nUrban textures visible in the background such as pavement and bicycles.\n\nShot with shallow depth of field and editorial street photography style.`,
    images: ["/images/bace/package-insert.jpg", "/images/bace/qr-closeup.jpg"],
  },
  {
    id: "multi-package",
    num: "03",
    title: "The Multi-Package",
    titleAccent: "Pickup",
    story: "Someone collects multiple deliveries at once.",
    composition: ["Medium shot", "Person holding 2\u20133 parcels", "Hub behind them"],
    prompt: `Photorealistic urban lifestyle scene showing a person holding multiple parcel boxes after collecting them from a bace Hub.\n\nSunny city sidewalk with trees, bicycles and storefronts.\n\nWide-angle perspective (28\u201335mm) with warm vibrant daylight.\n\nAuthentic spontaneous moment during everyday city life.`,
    images: ["/images/bace/brick-building.jpg", "/images/bace/busy-street.jpg"],
  },
  {
    id: "instant-buy",
    num: "04",
    title: "The Instant",
    titleAccent: "Buy",
    story: "A customer leaves the Hub with a purchased item.",
    composition: ["Person holding branded shopping bag or product", "Hub visible behind"],
    prompt: `Photorealistic editorial street scene showing a person leaving a bace Hub holding a shopping bag after purchasing an item.\n\nBright natural sunlight and lively city atmosphere.\n\nUrban background with benches, bicycles and storefront reflections.\n\nDynamic wide-angle perspective.`,
    images: ["/images/bace/cobblestone-pickup.jpg"],
  },
  {
    id: "social-hub",
    num: "05",
    title: "The Social Hub",
    titleAccent: "Moment",
    story: "Friends hanging around the Hub.",
    composition: ["Small group", "Hub visible", "Urban seating / bench"],
    prompt: `Photorealistic urban lifestyle scene showing a small group of friends meeting near a bace Hub on a sunny city street.\n\nPeople sit on benches or stand casually talking and laughing.\n\nBright natural sunlight with vibrant colors and urban textures.\n\nWide-angle editorial street photography style.`,
    images: ["/images/bace/group-friends.jpg", "/images/bace/community-gather.jpg", "/images/bace/summer-pickup.jpg"],
  },
  {
    id: "bike-stop",
    num: "06",
    title: "The Bike",
    titleAccent: "Stop",
    story: "Cyclist briefly stops to use the Hub.",
    composition: ["Bike foreground", "Person interacting with Hub"],
    prompt: `Photorealistic urban street scene showing a cyclist stopping at a bace Hub to retrieve a parcel.\n\nThe bicycle appears in the foreground while the person opens a Hub compartment.\n\nSunny European city environment with pavement, trees and storefronts.\n\nDynamic wide-angle street photography perspective.`,
    images: ["/images/bace/cyclist-pickup.jpg"],
  },
  {
    id: "office-run",
    num: "07",
    title: "The Office",
    titleAccent: "Run",
    story: "A professional collects a parcel during work.",
    composition: ["Laptop bag", "Office district", "Hub interaction"],
    prompt: `Photorealistic editorial street photography showing an urban professional collecting a parcel from a bace Hub during a workday.\n\nModern office district environment with glass buildings and clean sidewalks.\n\nNatural sunlight with strong highlights and shadows.\n\nDynamic wide-angle perspective capturing a quick everyday work routine moment.`,
    images: ["/images/bace/business-district.jpg"],
  },
  {
    id: "passing-moment",
    num: "08",
    title: "The Passing",
    titleAccent: "Moment",
    story: "Someone walks past the Hub with shopping bags.",
    composition: ["Movement", "Hub background", "Motion feeling"],
    prompt: `Photorealistic street photography capturing a person walking past a bace Hub carrying shopping bags.\n\nThe Hub appears naturally in the background.\n\nSunny urban environment with pavement, bicycles and city textures.\n\nShot with a wide-angle lens capturing movement and spontaneous city life.`,
    images: ["/images/bace/cobblestone-cafe.jpg"],
  },
  {
    id: "courier-load",
    num: "09",
    title: "The Courier",
    titleAccent: "Load",
    story: "Courier placing parcels into the Hub.",
    composition: ["Multiple parcels", "Hub open", "Action moment"],
    prompt: `Photorealistic urban logistics moment showing a courier placing multiple parcels into open compartments of a bace Hub.\n\nCity sidewalk environment with bicycles and urban textures.\n\nStrong natural sunlight creating bright highlights and shadows.\n\nEditorial documentary street photography style.`,
    images: ["/images/bace/hi-vis-courier.png", "/images/bace/courier-loading.jpg"],
  },
  {
    id: "micro-interaction",
    num: "10",
    title: "The Micro",
    titleAccent: "Interaction",
    story: "Hands opening Hub door.",
    composition: ["Extreme close-up", "Hands + lock / handle"],
    prompt: `Photorealistic close-up shot of hands opening a bace Hub compartment door.\n\nStrong natural sunlight reflecting on metal surfaces.\n\nUrban textures visible in background.\n\nShallow depth of field capturing a tactile everyday interaction.`,
    images: ["/images/bace/drawer-closeup.jpg"],
  },
  {
    id: "urban-integration",
    num: "11",
    title: "The Urban",
    titleAccent: "Integration",
    story: "Wide city shot with Hub integrated in street life.",
    composition: ["Wide shot", "Hub + pedestrians + city context"],
    prompt: `Photorealistic wide urban street scene showing the bace Hub integrated into everyday city life.\n\nPeople walk, cycle and interact naturally around the Hub.\n\nSunny European neighborhood with storefronts, trees and bicycles.\n\nWide-angle editorial street photography capturing vibrant urban atmosphere.`,
    images: ["/images/bace/split-view.jpg", "/images/bace/cafe-scene.jpg"],
  },
  {
    id: "evening-city",
    num: "12",
    title: "The Evening City",
    titleAccent: "Moment",
    story: "Hub used during evening hours.",
    composition: ["Warm sunset / evening light", "Hub glowing softly"],
    prompt: `Photorealistic urban evening scene showing a person retrieving a parcel from a softly illuminated bace Hub at sunset.\n\nWarm golden light reflecting on city surfaces.\n\nCalm but lively street atmosphere with pedestrians and bicycles.\n\nEditorial lifestyle photography with cinematic evening tones.`,
    images: ["/images/bace/cobblestone-cafe.jpg", "/images/bace/business-district.jpg"],
  },
];

// ─── 4 Master Prompt Categories ──────────────────────────────────────────────

interface MasterCategory {
  id: string;
  title: string;
  titleAccent: string;
  purpose: string;
  prompt: string;
}

const MASTER_CATEGORIES: MasterCategory[] = [
  {
    id: "service",
    title: "Service",
    titleAccent: "Visual",
    purpose: "Clear service explanation images showing a person interacting with the Hub.",
    prompt: `Photorealistic editorial lifestyle image of a person interacting with the bace Hub in a lively urban street.\n\nClose to medium framing. The person is the clear focal point.\n\nThe person is performing one simple action such as taking a parcel from the Hub, placing a return box inside, or holding a shopping bag after a pickup.\n\nThe bace Hub is visible nearby but does not dominate the image.\n\nBright natural sunlight creates sharp shadows on the pavement and highlights on surfaces.\n\nUrban environment with bicycles, trees, storefronts or street seating in the background.\n\nShot with a wide-angle lens (28\u201335mm feel) from a slightly dynamic perspective.\n\nAuthentic moment of everyday city life. The scene feels spontaneous, relaxed and human.`,
  },
  {
    id: "lifestyle",
    title: "Lifestyle",
    titleAccent: "Visual",
    purpose: "Social energy scenes showing people and urban life around the Hub.",
    prompt: `Photorealistic editorial street lifestyle scene near a bace Hub in a vibrant city neighborhood.\n\nSmall group of diverse young adults interacting naturally in an urban outdoor setting.\n\nPeople are sitting, standing, talking, drinking coffee or passing by the Hub during their daily routines.\n\nStrong sunlight filtering through trees or buildings creating warm highlights and deep shadows.\n\nBright clothing colors, casual contemporary styling, relaxed atmosphere.\n\nUrban background with pavement, benches, storefronts, bicycles and city infrastructure.\n\nWide-angle perspective (28\u201335mm) with dynamic framing and slight foreground cropping.\n\nThe Hub is present in the environment but the main focus is the social urban moment.`,
  },
  {
    id: "hero",
    title: "Hub Hero",
    titleAccent: "Visual",
    purpose: "Website hero or campaign visuals with the Hub as centerpiece.",
    prompt: `Photorealistic urban infrastructure scene featuring the bace Hub integrated into a lively city street.\n\nThe Hub is clearly visible and occupies roughly half of the frame.\n\nPeople naturally interact around it: one person opening a compartment, another walking past with a parcel, another arriving by bicycle.\n\nShot with strong natural sunlight producing vibrant colors and visible shadows across the pavement.\n\nUrban environment with storefronts, trees, benches and bicycles.\n\nWide-angle perspective around 28\u201335mm with slight low camera angle for energy.\n\nThe scene feels alive, social and embedded in everyday urban life.`,
  },
  {
    id: "micro",
    title: "Micro",
    titleAccent: "Detail",
    purpose: "Close-up tactile shots of hands and objects interacting with the Hub.",
    prompt: `Photorealistic close-up editorial shot capturing a small human interaction with the bace Hub.\n\nFocus on hands opening a Hub compartment, placing a parcel inside, or holding a delivered product.\n\nForeground object sharply visible while background shows urban textures such as pavement or metal surfaces.\n\nStrong natural sunlight creates bright highlights and shadows across the objects.\n\nShot with shallow depth of field, close framing and tactile realism.\n\nThe moment feels spontaneous and authentic, like a candid urban detail.`,
  },
];

// ─── Hardware Product Lineup ─────────────────────────────────────────────────

interface HubProduct {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  specs: string[];
  promptBlock: string;
  images: string[];
}

const HUB_PRODUCTS: HubProduct[] = [
  {
    id: "double-sided",
    name: "bace Hub",
    subtitle: "Double-Sided",
    description:
      "The flagship outdoor smart parcel locker. Freestanding unit accessible from both sides, designed for high-traffic sidewalks and public spaces. Light grey powder-coated steel body with flat roof overhang.",
    specs: [
      "Height: 215 cm",
      "Depth: 125.5 cm",
      "Length per frame: 66.5 cm",
      "Length (5 frames): 332.5 cm",
      "Light grey powder-coated steel",
      "\"bace\" logo in black lowercase (custom geometric sans-serif) on side panels",
      "Flat roof with slight overhang and dark trim edge",
      "Front + back: grid of compartment doors in varying sizes (small top, larger bottom)",
      "QR code with \"bace\" centered + \"scan me\" label on front face",
      "Hub name (e.g. BELLA, BUEXE-A) printed top-right corner",
      "URL: qr.bacehub.de/[name] printed on top edge",
      "Double-sided: lockers accessible from both front and back",
      "Modular frame system (expandable by adding frames)",
      "Sits on concrete/paved ground pad",
    ],
    promptBlock: `The bace Hub Double-Sided is a freestanding outdoor smart parcel locker made of light grey powder-coated steel. It stands 2.15 meters tall, 1.25 meters deep, and approximately 3.3 meters long (5-frame configuration). It has a flat roof with a slight overhang and dark trim edge. The "bace" logo appears in lowercase black custom geometric sans-serif typography on both side panels. Both front and back panels have a grid of compartment doors in varying sizes — smaller compartments at the top, larger at the bottom. A QR code with the "bace" wordmark centered inside it and a "scan me" label are visible on the front face. The hub name and URL (qr.bacehub.de) are printed on the top edge. It sits on a concrete ground pad in an urban street environment.`,
    images: [
      "/images/bace/hub-double-50.jpg",
      "/images/bace/hub-double-51.jpg",
      "/images/bace/hub-double-53.jpg",
      "/images/bace/hub-double-54.jpg",
      "/images/bace/hub-double-55.jpg",
      "/images/bace/hub-double-56.jpg",
      "/images/bace/hub-double-58.jpg",
      "/images/bace/hub-double-59.jpg",
      "/images/bace/hub-double-60.jpg",
      "/images/bace/hub-double-61.jpg",
      "/images/bace/hub-double-64.jpg",
      "/images/bace/hub-double-65.jpg",
      "/images/bace/hub-double-68-1.jpg",
      "/images/bace/hub-double-71.jpg",
    ],
  },
  {
    id: "single-sided",
    name: "bace Hub",
    subtitle: "Single-Sided",
    description:
      "Compact outdoor version for wall-adjacent or space-constrained placements. Same design language as the Double-Sided but with locker access from one side only. Ideal for building facades and narrow sidewalks.",
    specs: [
      "Height: 215 cm",
      "Depth: 75 cm",
      "Length per frame: 66.5 cm",
      "Length (5 frames): 332.5 cm",
      "Light grey powder-coated steel",
      "\"bace\" logo in black lowercase (custom geometric sans-serif) on side panel",
      "Single-access front: grid of compartment doors",
      "Closed rear panel (can be placed against walls)",
      "QR code with \"bace\" centered + \"scan me\" label on front face",
      "Flat roof with dark trim overhang",
      "Modular frame system (expandable)",
      "Significantly shallower depth (75 cm vs 125.5 cm)",
    ],
    promptBlock: `The bace Hub Single-Sided is a compact outdoor smart parcel locker made of light grey powder-coated steel. It stands 2.15 meters tall, 75 cm deep, and approximately 3.3 meters long (5-frame configuration). It has a flat roof with dark trim overhang. The "bace" logo appears in lowercase black custom geometric sans-serif on the side panel. The front has a grid of compartment doors in varying sizes with a QR code (with "bace" centered) and "scan me" label. The rear panel is closed, allowing wall-adjacent placement. Same modular frame design as the Double-Sided hub but with a shallower profile.`,
    images: [],
  },
  {
    id: "mobile",
    name: "bace",
    subtitle: "Mobile Hub",
    description:
      "Deployable parcel hub on wheels for events, pop-ups, and temporary locations. Can be transported and repositioned. Same bace design language adapted for mobility.",
    specs: [
      "Light grey powder-coated steel body",
      "\"bace\" logo in black lowercase (custom geometric sans-serif)",
      "Integrated wheels / transport base",
      "Compact footprint for temporary deployment",
      "Fewer compartments than fixed hubs",
      "QR code with \"bace\" centered + \"scan me\" access system",
      "Designed for events, festivals, pop-up retail",
    ],
    promptBlock: `The bace Mobile Hub is a transportable smart parcel locker on wheels made of light grey powder-coated steel. It carries the "bace" logo in lowercase black custom geometric sans-serif. Compact design with fewer compartments, built for temporary deployment at events, pop-ups, and festivals. Same clean industrial aesthetic as the fixed bace Hubs. QR code with "bace" centered and "scan me" label for user access.`,
    images: [],
  },
  {
    id: "indoor",
    name: "bace",
    subtitle: "Indoor Hub",
    description:
      "Interior version for lobbies, coworking spaces, residential buildings, and retail environments. Sleeker profile adapted for indoor contexts while maintaining the bace design identity.",
    specs: [
      "Light grey or white powder-coated steel",
      "\"bace\" logo in black lowercase (custom geometric sans-serif)",
      "Slimmer profile for indoor spaces",
      "Grid of compartment doors",
      "QR code with \"bace\" centered + \"scan me\" access system",
      "No weather protection needed (no roof overhang)",
      "Designed for lobbies, offices, residential buildings",
    ],
    promptBlock: `The bace Indoor Hub is a sleek indoor smart parcel locker made of light grey or white powder-coated steel. The "bace" logo appears in lowercase black custom geometric sans-serif. Slimmer profile than outdoor hubs, with a grid of compartment doors. QR code with "bace" centered and "scan me" label for user access. Designed for building lobbies, coworking spaces, and residential buildings. Clean, minimal industrial design.`,
    images: [],
  },
];

// ─── Brand Assets ────────────────────────────────────────────────────────────

interface BrandAsset {
  id: string;
  label: string;
  description: string;
  image: string;
}

const BRAND_ASSETS: BrandAsset[] = [
  {
    id: "logo",
    label: "bace Logo",
    description: "Custom geometric sans-serif wordmark, all lowercase. Black on light backgrounds.",
    image: "/images/bace/brand/bace-logo.png",
  },
  {
    id: "qr-code",
    label: "QR Code",
    description: "Black QR code with \"bace\" wordmark centered inside. Used on every hub front face.",
    image: "/images/bace/brand/qr-code-bace.png",
  },
  {
    id: "hub-name",
    label: "Hub Name Sticker",
    description: "Each hub has a unique name (e.g. BELLA, BUEXE). Printed in uppercase black geometric sans-serif.",
    image: "/images/bace/brand/bella-sticker.png",
  },
  {
    id: "url-label",
    label: "URL Label",
    description: "qr.bacehub.de/[name] — printed on hub top edge in black lowercase.",
    image: "/images/bace/brand/qr-url-bella.png",
  },
  {
    id: "scan-me",
    label: "Scan Me Label",
    description: "\"scan me\" in lowercase black geometric sans-serif. Placed next to QR code on front face.",
    image: "/images/bace/brand/scan-me.png",
  },
];

// ─── Visual Rules ────────────────────────────────────────────────────────────

const VISUAL_CHARACTERISTICS = [
  "Strong natural sunlight",
  "High contrast shadows",
  "Saturated but natural colors",
  "Wide-angle perspective (28\u201335mm)",
  "Close human interaction",
  "Foreground objects (hands, bags, bikes)",
  "Urban texture (pavement, glass, metal)",
  "Candid social moments",
];

const ACTION_VERBS = [
  "opening",
  "holding",
  "drinking",
  "walking",
  "exchanging",
  "placing",
  "retrieving",
  "laughing",
  "talking",
  "cycling",
];

const HIDDEN_RULE_ELEMENTS = [
  "Hands interacting with objects",
  "People in social micro-moments",
  "Objects in use",
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

// ─── Scene Card ──────────────────────────────────────────────────────────────

function SceneCard({
  scene,
  expanded,
  onToggle,
}: {
  scene: CanonicalScene;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div data-reveal style={{ borderBottom: `1px solid ${BORDER}` }}>
      {/* Header */}
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
            {scene.num}
          </span>

          {/* Thumbnails */}
          <div style={{ display: "flex", gap: "4px", flexShrink: 0 }}>
            {scene.images.slice(0, 3).map((src, i) => (
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
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 500,
                fontSize: "clamp(22px, 2.5vw, 32px)",
                letterSpacing: "-0.02em",
                color: TEXT,
                lineHeight: 1.15,
                marginBottom: "6px",
              }}
            >
              {scene.title} <em style={{ fontStyle: "italic" }}>{scene.titleAccent}</em>
            </h3>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "14px",
                color: TEXT_SECONDARY,
                lineHeight: 1.5,
                marginBottom: "10px",
              }}
            >
              {scene.story}
            </p>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {scene.composition.map((c) => (
                <span
                  key={c}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "10px",
                    letterSpacing: "0.08em",
                    color: TEXT_MUTED,
                    border: `1px solid ${BORDER}`,
                    padding: "3px 10px",
                  }}
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "16px", flexShrink: 0, paddingTop: "8px" }}>
          <div onClick={(e) => e.stopPropagation()}>
            <CopyButton text={scene.prompt} label="Copy prompt" />
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

      {/* Expanded */}
      {expanded && (
        <div style={{ paddingBottom: "40px" }}>
          {/* Images */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${Math.min(scene.images.length, 3)}, 1fr)`,
              gap: "4px",
              marginLeft: "60px",
              marginBottom: "24px",
            }}
          >
            {scene.images.map((src, i) => (
              <div key={i} style={{ height: "200px", overflow: "hidden" }}>
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

          {/* Prompt */}
          <div
            style={{
              backgroundColor: BG_SUBTLE,
              padding: "28px 32px",
              marginLeft: "60px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: TEXT_MUTED,
                }}
              >
                AI Prompt Template
              </span>
            </div>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "15px",
                lineHeight: 1.75,
                color: TEXT_SECONDARY,
                whiteSpace: "pre-line",
              }}
            >
              {scene.prompt}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

type Tab = "scenes" | "categories" | "dna" | "hardware";

export default function PromptsPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("scenes");

  const [expandedHub, setExpandedHub] = useState<string | null>(null);

  const tabs: { key: Tab; label: string }[] = [
    { key: "scenes", label: "12 Scenes" },
    { key: "categories", label: "Master Prompts" },
    { key: "dna", label: "Visual DNA" },
    { key: "hardware", label: "Hardware" },
  ];

  // ── Parallax scroll for hero ──
  const heroRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLImageElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    if (heroImgRef.current) {
      heroImgRef.current.style.transform = `translateY(${scrollY * 0.35}px) scale(1.1)`;
    }
    if (heroContentRef.current) {
      heroContentRef.current.style.transform = `translateY(${scrollY * 0.15}px)`;
      heroContentRef.current.style.opacity = `${Math.max(0, 1 - scrollY / 600)}`;
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // ── Intersection Observer for reveal animations ──
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = "1";
            (entry.target as HTMLElement).style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    const main = mainRef.current;
    if (main) {
      const elements = main.querySelectorAll("[data-reveal]");
      elements.forEach((el) => {
        (el as HTMLElement).style.opacity = "0";
        (el as HTMLElement).style.transform = "translateY(32px)";
        (el as HTMLElement).style.transition = "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)";
        observer.observe(el);
      });
    }

    return () => observer.disconnect();
  }, [activeTab]);

  const heroImages: Record<Tab, { src: string; title: string; subtitle: string }> = {
    scenes: {
      src: "/images/bace/hero-hub-greenery.jpg",
      title: "The visual",
      subtitle: "12 canonical scenes that define the entire bace visual universe. Every photo, AI image, campaign or social visual is a variation of one of these scenes.",
    },
    categories: {
      src: "/images/bace/hub-double-61.jpg",
      title: "Master",
      subtitle: "Four prompt categories for different use cases. Pick the right one, customize with scene-specific details, and generate consistent visuals.",
    },
    dna: {
      src: "/images/bace/hub-double-64.jpg",
      title: "Visual",
      subtitle: "The core DNA block that must be included in every prompt. Encodes the visual language calibrated from the bace moodboard.",
    },
    hardware: {
      src: "/images/bace/hub-double-68-1.jpg",
      title: "Hardware",
      subtitle: "The bace Hub product lineup. Reference images and prompt blocks to ensure AI-generated visuals accurately represent the hardware.",
    },
  };

  const heroAccents: Record<Tab, string> = {
    scenes: "system",
    categories: "prompts",
    dna: "DNA",
    hardware: "reference",
  };

  const currentHero = heroImages[activeTab];

  return (
    <div style={{ backgroundColor: BG, minHeight: "100vh", color: TEXT }}>
      {/* ── Nav ── */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          backgroundColor: "rgba(255, 255, 255, 0.12)",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.15)",
          padding: "0 clamp(20px, 4vw, 80px)",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <button
          onClick={() => { setActiveTab("scenes"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", transition: "filter 0.2s ease" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.filter = `drop-shadow(0 0 8px ${NEON_GREEN})`; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.filter = "none"; }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/bace/brand/bace-logo.png"
            alt="bace"
            style={{ height: "40px", width: "auto", display: "block" }}
          />
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "13px",
                fontWeight: 700,
                letterSpacing: "0.04em",
                color: activeTab === tab.key ? TEXT : "rgba(0,0,0,0.5)",
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
                padding: "4px 0",
                borderBottom: activeTab === tab.key ? `2px solid ${NEON_GREEN}` : "2px solid transparent",
                transition: "color 0.25s ease, border-color 0.25s ease, text-shadow 0.25s ease",
              }}
              onMouseEnter={(e) => {
                const btn = e.currentTarget as HTMLButtonElement;
                btn.style.color = NEON_GREEN;
                btn.style.textShadow = `0 0 12px ${NEON_GREEN}`;
              }}
              onMouseLeave={(e) => {
                const btn = e.currentTarget as HTMLButtonElement;
                btn.style.color = activeTab === tab.key ? TEXT : "rgba(0,0,0,0.5)";
                btn.style.textShadow = "none";
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <span style={{ width: "60px" }} />
      </nav>

      {/* ── Hero ── */}
      <section
        ref={heroRef}
        style={{
          position: "relative",
          height: "100vh",
          display: "flex",
          alignItems: "flex-end",
          overflow: "hidden",
        }}
      >
        {/* Background image — parallax */}
        <div
          style={{
            position: "absolute",
            inset: "-15%",
            zIndex: 0,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={heroImgRef}
            src={currentHero.src}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center 60%",
              display: "block",
              transform: "scale(1.1)",
              willChange: "transform",
            }}
          />
          {/* Gradient overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0) 100%)",
            }}
          />
        </div>

        {/* Content — parallax text */}
        <div
          ref={heroContentRef}
          style={{
            position: "relative",
            zIndex: 1,
            padding: "clamp(48px, 6vw, 80px) clamp(20px, 4vw, 80px)",
            maxWidth: "1280px",
            margin: "0 auto",
            width: "100%",
            willChange: "transform, opacity",
          }}
        >
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              fontSize: "clamp(40px, 7vw, 88px)",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              color: "#ffffff",
              marginBottom: "20px",
            }}
          >
            {currentHero.title} <em style={{ fontStyle: "italic" }}>{heroAccents[activeTab]}</em>
          </h1>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(16px, 1.5vw, 20px)",
              lineHeight: 1.65,
              color: "rgba(255,255,255,0.7)",
              maxWidth: "560px",
              fontWeight: 400,
            }}
          >
            {currentHero.subtitle}
          </p>
        </div>
      </section>

      {/* ── Content ── */}
      <main
        ref={mainRef}
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "clamp(60px, 8vw, 100px) clamp(20px, 4vw, 80px) clamp(80px, 10vw, 140px)",
        }}
      >
        {/* ── TAB: 12 Canonical Scenes ── */}
        {activeTab === "scenes" && (
          <div>
            <div data-reveal style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "16px" }}>
              <h2
                style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: TEXT_MUTED }}
              >
                The 12 Canonical Scenes
              </h2>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: TEXT_MUTED }}>
                Every visual = one scene + variation
              </span>
            </div>

            <div style={{ borderTop: `1px solid ${BORDER}` }}>
              {CANONICAL_SCENES.map((scene) => (
                <SceneCard
                  key={scene.id}
                  scene={scene}
                  expanded={expandedId === scene.id}
                  onToggle={() => setExpandedId(expandedId === scene.id ? null : scene.id)}
                />
              ))}
            </div>

            {/* Variation rule */}
            <div data-reveal style={{ backgroundColor: DARK, padding: "clamp(32px, 4vw, 56px)", marginTop: "40px" }}>
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
                The key <em style={{ fontStyle: "italic" }}>rule</em>
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "16px",
                  lineHeight: 1.7,
                  color: "rgba(255,255,255,0.55)",
                  maxWidth: "560px",
                  marginBottom: "28px",
                }}
              >
                Every new visual should be one of these scenes + a variation.
                Vary the city, people, weather, or time of day &mdash; but the core scene stays recognizable.
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: "1px",
                  backgroundColor: "rgba(255,255,255,0.08)",
                }}
              >
                {["Different cities", "Different people", "Different weather", "Different time of day"].map((v) => (
                  <div
                    key={v}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "12px",
                      color: "rgba(255,255,255,0.4)",
                      padding: "16px 20px",
                      backgroundColor: DARK,
                    }}
                  >
                    {v}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── TAB: Master Prompt Categories ── */}
        {activeTab === "categories" && (
          <div>
            <h2
              data-reveal
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
              Four master <em style={{ fontStyle: "italic" }}>categories</em>
            </h2>
            <p
              data-reveal
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "16px",
                lineHeight: 1.65,
                color: TEXT_SECONDARY,
                maxWidth: "560px",
                marginBottom: "56px",
              }}
            >
              Each category serves a different purpose. Pick the right one
              for your use case, then customize with scene-specific details.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "0", borderTop: `1px solid ${BORDER}` }}>
              {MASTER_CATEGORIES.map((cat, i) => (
                <div
                  data-reveal
                  key={cat.id}
                  style={{ borderBottom: `1px solid ${BORDER}`, padding: "40px 0" }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "32px", marginBottom: "24px" }}>
                    <span
                      style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: TEXT_MUTED, paddingTop: "6px", width: "28px", flexShrink: 0 }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div style={{ flex: 1 }}>
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
                        {cat.title} <em style={{ fontStyle: "italic" }}>{cat.titleAccent}</em>
                      </h3>
                      <p style={{ fontFamily: "var(--font-display)", fontSize: "15px", color: TEXT_SECONDARY, lineHeight: 1.55 }}>
                        {cat.purpose}
                      </p>
                    </div>
                    <div style={{ flexShrink: 0 }} onClick={(e) => e.stopPropagation()}>
                      <CopyButton text={cat.prompt} label="Copy prompt" />
                    </div>
                  </div>

                  <div
                    style={{
                      backgroundColor: BG_SUBTLE,
                      padding: "24px 28px",
                      marginLeft: "60px",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "14px",
                        lineHeight: 1.75,
                        color: TEXT_SECONDARY,
                        whiteSpace: "pre-line",
                      }}
                    >
                      {cat.prompt}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Energy boost */}
            <div data-reveal style={{ backgroundColor: DARK, padding: "clamp(32px, 4vw, 56px)", marginTop: "40px" }}>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 500,
                  fontSize: "clamp(20px, 2.5vw, 28px)",
                  letterSpacing: "-0.02em",
                  color: BG,
                  marginBottom: "12px",
                  lineHeight: 1.15,
                }}
              >
                Energy <em style={{ fontStyle: "italic" }}>boost</em>
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "15px",
                  lineHeight: 1.65,
                  color: "rgba(255,255,255,0.45)",
                  marginBottom: "20px",
                  maxWidth: "520px",
                }}
              >
                Add this line to any prompt to prevent the &ldquo;corporate stock photo&rdquo; look:
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "16px",
                  backgroundColor: "rgba(255,255,255,0.05)",
                  padding: "16px 20px",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "13px",
                    color: "rgba(255,255,255,0.6)",
                    fontStyle: "italic",
                  }}
                >
                  {ENERGY_BOOST}
                </p>
                <CopyButton text={ENERGY_BOOST} />
              </div>
            </div>
          </div>
        )}

        {/* ── TAB: Visual DNA ── */}
        {activeTab === "dna" && (
          <div>
            <h2
              data-reveal
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
              The bace <em style={{ fontStyle: "italic" }}>Visual DNA</em>
            </h2>
            <p
              data-reveal
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "16px",
                lineHeight: 1.65,
                color: TEXT_SECONDARY,
                maxWidth: "600px",
                marginBottom: "56px",
              }}
            >
              This block must be included in every prompt. It encodes the core
              visual language calibrated from the bace moodboard &mdash; not generic stock, but
              editorial lifestyle + street documentary + commercial product storytelling.
            </p>

            {/* DNA Block */}
            <div data-reveal style={{ marginBottom: "48px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingBottom: "12px",
                  borderBottom: `1px solid ${BORDER}`,
                  marginBottom: "20px",
                }}
              >
                <span
                  style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: TEXT_MUTED }}
                >
                  Core DNA Block
                </span>
                <CopyButton text={VISUAL_DNA} label="Copy DNA block" />
              </div>
              <div style={{ backgroundColor: BG_SUBTLE, padding: "32px" }}>
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "15px",
                    lineHeight: 1.8,
                    color: TEXT_SECONDARY,
                    whiteSpace: "pre-line",
                  }}
                >
                  {VISUAL_DNA}
                </p>
              </div>
            </div>

            {/* Key Characteristics */}
            <div data-reveal style={{ marginBottom: "48px" }}>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: "18px",
                  color: TEXT,
                  marginBottom: "20px",
                  paddingBottom: "12px",
                  borderBottom: `1px solid ${BORDER}`,
                }}
              >
                Key characteristics
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0" }}>
                {VISUAL_CHARACTERISTICS.map((c, i) => (
                  <div
                    key={c}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                      padding: "16px 0",
                      borderBottom: `1px solid ${BORDER}`,
                    }}
                  >
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: TEXT_MUTED, width: "24px", flexShrink: 0 }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: "15px", color: TEXT }}>
                      {c}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hidden Rule */}
            <div data-reveal style={{ backgroundColor: DARK, padding: "clamp(32px, 4vw, 56px)", marginBottom: "48px" }}>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 500,
                  fontSize: "clamp(20px, 2.5vw, 28px)",
                  color: BG,
                  marginBottom: "8px",
                  lineHeight: 1.15,
                }}
              >
                The hidden <em style={{ fontStyle: "italic" }}>rule</em>
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "15px",
                  lineHeight: 1.65,
                  color: "rgba(255,255,255,0.45)",
                  marginBottom: "24px",
                  maxWidth: "520px",
                }}
              >
                Most images that feel alive contain one of these three elements.
                If prompts don&apos;t include action, the images feel dead.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "1px", marginBottom: "28px" }}>
                {HIDDEN_RULE_ELEMENTS.map((el) => (
                  <div
                    key={el}
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "16px",
                      fontWeight: 500,
                      color: BG,
                      padding: "14px 0",
                      borderBottom: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    {el}
                  </div>
                ))}
              </div>

              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.3)",
                  marginBottom: "14px",
                }}
              >
                Always include a verb
              </p>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {ACTION_VERBS.map((v) => (
                  <span
                    key={v}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "12px",
                      color: "rgba(255,255,255,0.5)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      padding: "6px 14px",
                    }}
                  >
                    {v}
                  </span>
                ))}
              </div>
            </div>

            {/* Copy all */}
            <CopyButton
              text={[
                "BACE VISUAL DNA (MOODBOARD CALIBRATED)",
                "",
                VISUAL_DNA,
                "",
                "ENERGY BOOST LINE:",
                ENERGY_BOOST,
                "",
                "KEY CHARACTERISTICS:",
                ...VISUAL_CHARACTERISTICS.map((c, i) => `${i + 1}. ${c}`),
                "",
                "HIDDEN RULE \u2014 Every image must contain:",
                ...HIDDEN_RULE_ELEMENTS.map((e) => `\u2022 ${e}`),
                "",
                "ALWAYS INCLUDE A VERB:",
                ACTION_VERBS.join(", "),
              ].join("\n")}
              label="Copy entire Visual DNA"
            />
          </div>
        )}

        {/* ── TAB: Hardware Reference ── */}
        {activeTab === "hardware" && (
          <div>
            <h2
              data-reveal
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
              Hardware <em style={{ fontStyle: "italic" }}>reference</em>
            </h2>
            <p
              data-reveal
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "16px",
                lineHeight: 1.65,
                color: TEXT_SECONDARY,
                maxWidth: "600px",
                marginBottom: "56px",
              }}
            >
              The bace Hub product lineup. Use these references to ensure AI-generated
              visuals accurately represent the hardware &mdash; material, dimensions, branding,
              and design must not be changed.
            </p>

            {/* Important note */}
            <div
              data-reveal
              style={{
                backgroundColor: BG_SUBTLE,
                padding: "20px 24px",
                marginBottom: "48px",
                borderLeft: `3px solid ${TEXT}`,
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "12px",
                  letterSpacing: "0.04em",
                  color: TEXT,
                  lineHeight: 1.7,
                }}
              >
                Copy the hardware prompt block for the specific hub type and prepend it to any scene or master prompt.
                The product design is fixed &mdash; only vary the environment, people, and lighting.
              </p>
            </div>

            {/* Hub products */}
            <div style={{ borderTop: `1px solid ${BORDER}` }}>
              {HUB_PRODUCTS.map((hub) => {
                const isExpanded = expandedHub === hub.id;
                return (
                  <div data-reveal key={hub.id} style={{ borderBottom: `1px solid ${BORDER}` }}>
                    {/* Header */}
                    <div
                      onClick={() => setExpandedHub(isExpanded ? null : hub.id)}
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
                        {/* Thumbnail or placeholder */}
                        <div style={{ display: "flex", gap: "4px", flexShrink: 0 }}>
                          {hub.images.length > 0 ? (
                            hub.images.slice(0, 2).map((src, i) => (
                              <div
                                key={i}
                                style={{
                                  width: i === 0 ? "120px" : "80px",
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
                                  }}
                                />
                              </div>
                            ))
                          ) : (
                            <div
                              style={{
                                width: "120px",
                                height: "80px",
                                backgroundColor: BG_SUBTLE,
                                border: `1px solid ${BORDER}`,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: TEXT_MUTED }}>
                                No photo yet
                              </span>
                            </div>
                          )}
                        </div>

                        <div style={{ minWidth: 0 }}>
                          <h3
                            style={{
                              fontFamily: "var(--font-display)",
                              fontWeight: 500,
                              fontSize: "clamp(22px, 2.5vw, 32px)",
                              letterSpacing: "-0.02em",
                              color: TEXT,
                              lineHeight: 1.15,
                              marginBottom: "6px",
                            }}
                          >
                            {hub.name} <em style={{ fontStyle: "italic" }}>{hub.subtitle}</em>
                          </h3>
                          <p
                            style={{
                              fontFamily: "var(--font-display)",
                              fontSize: "14px",
                              color: TEXT_SECONDARY,
                              lineHeight: 1.5,
                              marginBottom: "10px",
                            }}
                          >
                            {hub.description}
                          </p>
                          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                            {hub.specs.slice(0, 3).map((s) => (
                              <span
                                key={s}
                                style={{
                                  fontFamily: "var(--font-mono)",
                                  fontSize: "10px",
                                  letterSpacing: "0.08em",
                                  color: TEXT_MUTED,
                                  border: `1px solid ${BORDER}`,
                                  padding: "3px 10px",
                                }}
                              >
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: "16px", flexShrink: 0, paddingTop: "8px" }}>
                        <div onClick={(e) => e.stopPropagation()}>
                          <CopyButton text={hub.promptBlock} label="Copy prompt block" />
                        </div>
                        <span
                          style={{
                            fontFamily: "var(--font-display)",
                            fontSize: "24px",
                            fontWeight: 300,
                            color: TEXT_MUTED,
                            transform: isExpanded ? "rotate(45deg)" : "rotate(0deg)",
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
                    {isExpanded && (
                      <div style={{ paddingBottom: "40px" }}>
                        {/* Reference images */}
                        {hub.images.length > 0 && (
                          <div
                            style={{
                              display: "grid",
                              gridTemplateColumns: `repeat(${Math.min(hub.images.length, 4)}, 1fr)`,
                              gap: "4px",
                              marginLeft: "60px",
                              marginBottom: "24px",
                            }}
                          >
                            {hub.images.map((src, i) => (
                              <div key={i} style={{ height: "280px", overflow: "hidden" }}>
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
                        )}

                        {/* Specs list */}
                        <div
                          style={{
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
                              marginBottom: "16px",
                            }}
                          >
                            Design Specifications
                          </span>
                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0" }}>
                            {hub.specs.map((spec, i) => (
                              <div
                                key={spec}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "12px",
                                  padding: "10px 0",
                                  borderBottom: `1px solid ${BORDER}`,
                                }}
                              >
                                <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: TEXT_MUTED, width: "20px", flexShrink: 0 }}>
                                  {String(i + 1).padStart(2, "0")}
                                </span>
                                <span style={{ fontFamily: "var(--font-display)", fontSize: "14px", color: TEXT }}>
                                  {spec}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Prompt block */}
                        <div
                          style={{
                            backgroundColor: BG_SUBTLE,
                            padding: "28px 32px",
                            marginLeft: "60px",
                          }}
                        >
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                            <span
                              style={{
                                fontFamily: "var(--font-mono)",
                                fontSize: "10px",
                                letterSpacing: "0.15em",
                                textTransform: "uppercase",
                                color: TEXT_MUTED,
                              }}
                            >
                              Hardware Prompt Block
                            </span>
                          </div>
                          <p
                            style={{
                              fontFamily: "var(--font-display)",
                              fontSize: "15px",
                              lineHeight: 1.75,
                              color: TEXT_SECONDARY,
                              whiteSpace: "pre-line",
                            }}
                          >
                            {hub.promptBlock}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Brand Assets */}
            <div data-reveal style={{ marginTop: "64px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  paddingBottom: "16px",
                  borderBottom: `1px solid ${BORDER}`,
                  marginBottom: "32px",
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 500,
                    fontSize: "clamp(22px, 2.5vw, 32px)",
                    letterSpacing: "-0.02em",
                    color: TEXT,
                    lineHeight: 1.15,
                  }}
                >
                  Brand <em style={{ fontStyle: "italic" }}>assets</em>
                </h3>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: TEXT_MUTED }}>
                  Elements visible on every hub
                </span>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(5, 1fr)",
                  gap: "16px",
                }}
              >
                {BRAND_ASSETS.map((asset) => (
                  <div key={asset.id}>
                    <div
                      style={{
                        backgroundColor: BG_SUBTLE,
                        border: `1px solid ${BORDER}`,
                        aspectRatio: "1",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "20px",
                        marginBottom: "12px",
                        overflow: "hidden",
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={asset.image}
                        alt={asset.label}
                        style={{
                          maxWidth: "100%",
                          maxHeight: "100%",
                          objectFit: "contain",
                          display: "block",
                        }}
                      />
                    </div>
                    <h4
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 500,
                        fontSize: "14px",
                        color: TEXT,
                        marginBottom: "4px",
                      }}
                    >
                      {asset.label}
                    </h4>
                    <p
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "11px",
                        lineHeight: 1.5,
                        color: TEXT_MUTED,
                      }}
                    >
                      {asset.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Usage guide */}
            <div data-reveal style={{ backgroundColor: DARK, padding: "clamp(32px, 4vw, 56px)", marginTop: "40px" }}>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 500,
                  fontSize: "clamp(20px, 2.5vw, 28px)",
                  letterSpacing: "-0.02em",
                  color: BG,
                  marginBottom: "12px",
                  lineHeight: 1.15,
                }}
              >
                How to <em style={{ fontStyle: "italic" }}>use</em>
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "15px",
                  lineHeight: 1.65,
                  color: "rgba(255,255,255,0.45)",
                  marginBottom: "28px",
                  maxWidth: "560px",
                }}
              >
                Combine a hardware prompt block with any scene or master prompt.
                The hardware block describes the product accurately &mdash; the scene prompt sets the environment and mood.
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "1px",
                  backgroundColor: "rgba(255,255,255,0.08)",
                }}
              >
                {[
                  { step: "01", text: "Pick the hub type" },
                  { step: "02", text: "Copy its prompt block" },
                  { step: "03", text: "Prepend to any scene prompt" },
                ].map((s) => (
                  <div
                    key={s.step}
                    style={{
                      backgroundColor: DARK,
                      padding: "20px",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "11px",
                        color: "rgba(255,255,255,0.3)",
                        display: "block",
                        marginBottom: "8px",
                      }}
                    >
                      {s.step}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "15px",
                        fontWeight: 500,
                        color: "rgba(255,255,255,0.7)",
                      }}
                    >
                      {s.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ── Footer ── */}
      <footer style={{ backgroundColor: DARK, padding: "clamp(48px, 6vw, 80px) clamp(20px, 4vw, 80px)" }}>
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
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/bace/brand/bace-logo.png"
              alt="bace"
              style={{ height: "18px", width: "auto", display: "block", marginBottom: "12px", filter: "invert(1)" }}
            />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "rgba(255,255,255,0.35)", lineHeight: 1.7 }}>
              Visual system &mdash; moodboard calibrated
            </span>
          </div>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "rgba(255,255,255,0.25)" }}>
            2026
          </span>
        </div>
      </footer>
    </div>
  );
}
