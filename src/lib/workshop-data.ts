import type { WorkshopPhase, WorkshopPillar, WorkshopMeta } from "./workshop-types";

// ─── Meta ─────────────────────────────────────────────────────────────────────

export const WORKSHOP_META: WorkshopMeta = {
  title: "AI Visuals Masterclass",
  subtitle: "The 7 Pillars of Visual Creation System",
  location: "Barcelona",
  priceRange: "250-299",
};

// ─── Phase accent colors ──────────────────────────────────────────────────────

export const PHASE_ACCENTS = {
  foundation: "#FF4D00",
  hybrid: "#C8E632",
  production: "#FF1A00",
} as const;

// ─── Schedule Phases ──────────────────────────────────────────────────────────

export const WORKSHOP_PHASES: WorkshopPhase[] = [
  {
    id: "foundation",
    number: "01",
    title: "The Foundation",
    timeRange: "9:00 — 11:30",
    description:
      "You'll learn the system behind the results — not the trick, the method.",
    accent: PHASE_ACCENTS.foundation,
    blocks: [
      {
        id: "f-1",
        time: "9:00",
        duration: "30 min",
        title: "Why 95% Fail with AI Visuals",
        bullets: [
          "The problem isn't the tool, it's the approach — random prompting vs visual engineering",
          "Before/after: same tool, radically different result. Only the system changes",
          "Real work on screen: bace lifestyle imagery, full commercial production workflow",
          "The day's promise: leave with publishable images and a replicable system",
        ],
        assets: [
          "5 real before/after pairs",
          "Opening deck (8 slides, highly visual)",
          "30s video of the process in real time",
        ],
        deliverable: null,
      },
      {
        id: "f-2",
        time: "9:30",
        duration: "45 min",
        title: "The 7 Pillars of Visual Creation System",
        bullets: [
          "PILLAR 1 — DIRECTION: Command like a director, not describe like a tourist. Use imperative verbs",
          "PILLAR 2 — SPECIFICITY: Camera, lens, aperture, color temperature. Technical precision is 40% of any result",
          "PILLAR 3 — IMPERFECTION: The most important pillar. Perfect = Fake, Imperfect = Trustworthy",
          "PILLAR 4 — MOOD: Define the emotion before the object. Peaceful, dramatic, intimate, nostalgic",
          "PILLAR 5 — SYSTEMS: Think in product lines (50 shots), not one-offs. Build a reference image method",
          "PILLAR 6 — FRAMING: Foreground, midground, background. Three depth planes create real dimension",
          "PILLAR 7 — TOOLS: Match the tool to the task. Nano Banana Pro for product, Midjourney for editorial",
        ],
        assets: [
          "Printed 7 Pillars card (A5)",
          "Photography glossary for AI",
        ],
        deliverable: null,
      },
      {
        id: "f-3",
        time: "10:15",
        duration: "60 min",
        title: "The Alpha Prompt System",
        bullets: [
          "The structure: [Direction] + [Camera/Lens] + [Mood] + [Imperfections] + [Frame Layers] + [Platform/Tool]",
          "Live demo: building a prompt layer by layer — seeing how each pillar transforms the result",
          "The 10 most powerful terms: golden hour backlight, shallow DOF, Hasselblad 503CW, film grain texture, caught between moments, dust particles in air, shot through foreground, matte finish, editorial color grade, chromatic aberration",
          "What to NEVER do: vague descriptions, too many elements, style contradictions, 'beautiful' or 'nice'",
          "Guided exercise: each participant builds their Alpha Prompt for the day's fictional case",
          "Group review of 3-4 prompts with collective feedback using the 7 Pillars framework",
        ],
        assets: [
          "Alpha Prompt template (editable doc)",
          "Day's fictional case: skincare brand brief",
          "Bank of 50 example prompts by category",
        ],
        deliverable:
          "Each participant leaves with their Alpha Prompt v1 written",
      },
      {
        id: "f-break",
        time: "11:15",
        duration: "15 min",
        title: "Break",
        bullets: [],
        assets: [],
        deliverable: null,
        isBreak: true,
      },
    ],
  },
  {
    id: "hybrid",
    number: "02",
    title: "The Hybrid Workflow",
    timeRange: "11:30 — 14:00",
    description:
      "You generate, iterate, and learn to read a bad result and fix it in seconds.",
    accent: PHASE_ACCENTS.hybrid,
    blocks: [
      {
        id: "h-1",
        time: "11:30",
        duration: "60 min",
        title: "Gemini in Action — First Generations",
        bullets: [
          "Setup: everyone with Gemini open. Free account is enough for the day",
          "Live demo: generate 3 images using the Alpha Prompt built earlier",
          "The iteration cycle: Prompt v1 → analyze against 7 Pillars → identify weakest pillar → adjust → Prompt v2",
          "The 5 most common problems and their fix: flat light, centered composition, generic context, oversaturation, lack of depth",
          "30 minutes of free practice with direct support",
        ],
        assets: [
          "Troubleshooting guide: 5 problems and their exact solution",
          "Prompt list by product category (beauty, food, tech, fashion, home)",
        ],
        deliverable: "First 5-10 images generated by each participant",
      },
      {
        id: "h-2",
        time: "12:30",
        duration: "30 min",
        title: "From Generated Image to Publishable Image",
        bullets: [
          "Why 80% of AI images need minimal post-processing to be publishable",
          "Light stack: Lightroom Mobile (free), Remove.bg, Snapseed",
          "How to spot AI artifacts: hands, illogical reflections, strange edges",
          "Demo: morning image to publishable in 8 minutes",
          "Platform formats: Instagram (1080x1350), Web hero (1920x1080), Paid ads",
        ],
        assets: [
          "Publishable image checklist (10 points)",
          "Downloadable Lightroom Mobile preset",
          "Platform format cheatsheet",
        ],
        deliverable: "First publishable image from each participant",
      },
      {
        id: "h-break",
        time: "13:00",
        duration: "60 min",
        title: "Lunch",
        bullets: [],
        assets: [],
        deliverable: null,
        isBreak: true,
      },
    ],
  },
  {
    id: "production",
    number: "03",
    title: "The Production Session",
    timeRange: "14:00 — 17:30",
    description:
      "Real production. Each participant builds their final set with direct feedback.",
    accent: PHASE_ACCENTS.production,
    blocks: [
      {
        id: "p-1",
        time: "14:00",
        duration: "90 min",
        title: "Production Session — Full Set",
        bullets: [
          "Brief: minimum 3 publishable images (fictional case or your own brand if you bring it)",
          "45 min generation & iteration → 30 min selection & editing → 15 min export",
          "Individual feedback using the 7 Pillars framework",
          "Those who bring their brand work on their real product with direct support",
        ],
        assets: [
          "Production brief (objective, deliverable, criteria)",
          "Individual tracking table",
          "Digital moodboard of references",
        ],
        deliverable: "Set of 3+ publishable images per participant",
      },
      {
        id: "p-2",
        time: "15:30",
        duration: "30 min",
        title: "Group Review — Show Your Work",
        bullets: [
          "Each participant presents their 2-3 best images of the day",
          "1 min presentation + 2 min group feedback",
          "Vote: the most surprising image of the day",
          "Share the Alpha Prompts that worked best",
        ],
        assets: [
          "Shared Google Drive for final images",
          "Presentation form: product, platform, hardest pillar",
        ],
        deliverable: null,
      },
      {
        id: "p-3",
        time: "16:00",
        duration: "30 min",
        title: "Your System for Home — The Next 7 Days",
        bullets: [
          "7-day practice plan to consolidate the Alpha Prompt System and 7 Pillars",
          "How to build your prompt bank: folders, naming, version control",
          "When to use free Gemini vs Nano Banana Pro ($0.14/image)",
          "Private post-workshop group (WhatsApp): outputs, questions, iterations",
        ],
        assets: [
          "Downloadable resource pack (all docs and templates from the day)",
          "7-day practice plan (PDF)",
          "Private group link",
          "20% discount for next edition",
        ],
        deliverable: null,
      },
      {
        id: "p-break",
        time: "16:30",
        duration: "60 min",
        title: "Networking + Photos",
        bullets: [],
        assets: [],
        deliverable: null,
        isBreak: true,
      },
    ],
  },
];

// ─── 7 Pillars ────────────────────────────────────────────────────────────────

export const WORKSHOP_PILLARS: WorkshopPillar[] = [
  {
    id: "direction",
    number: "01",
    name: "Direction Over Description",
    principle: "Command like a film director, not describe like a tourist",
    promptExample:
      "Golden hour backlight, 3200K warmth, rim lighting silhouetting peaks, position product in left third of frame",
    proTip:
      "Use imperative verbs: 'position', 'light', 'frame'. Never 'a beautiful sunset' — instead, command the scene into existence.",
    details: [
      {
        label: "Imperative voice",
        body: "Every prompt sentence should start with a direction. 'Position the product', 'Light from 45 degrees', 'Frame tight on texture'. You are directing a shoot, not writing a poem.",
      },
      {
        label: "Specificity kills vagueness",
        body: "BAD: 'A beautiful sunset over mountains'. GOOD: 'Golden hour backlight, 3200K warmth, rim lighting silhouetting peaks'. The second version gives the AI something to execute.",
      },
      {
        label: "Forbidden words",
        body: "Never use 'beautiful', 'nice', 'professional photo', 'stunning'. These are tourist descriptions. Directors use technical terms that map to visual outcomes.",
      },
      {
        label: "Action over static",
        body: "Describe mid-action, not poses. 'Hand reaching for product' beats 'hand holding product'. Motion implies life.",
      },
    ],
  },
  {
    id: "specificity",
    number: "02",
    name: "Technical Specificity",
    principle: "Always name camera, lens, aperture, and lighting",
    promptExample:
      "Shot on Hasselblad 503CW, 100mm macro lens, f/4, soft diffused window light from left at 5600K, slight film grain",
    proTip:
      "Adding a specific camera name is one of the most powerful tricks. Try Leica M11, Hasselblad 503CW, and Mamiya RZ67 — each gives radically different character.",
    details: [
      {
        label: "Camera body",
        body: "ARRI Alexa = warm/filmic. RED Komodo = punchy/modern. Hasselblad = medium format editorial. Canon/Sony = lifestyle. Each camera biases the AI toward different aesthetics.",
      },
      {
        label: "Focal length",
        body: "35mm = environmental, natural. 50mm = versatile, human eye. 85mm = portrait, compresses background. 100mm macro = product, extreme detail. 135mm = fashion magazine.",
      },
      {
        label: "Aperture",
        body: "f/1.4 = dreamy extreme bokeh. f/2.8 = portrait sweet spot. f/5.6 = balanced. f/8 = everything sharp, classic product. The aperture controls how much of the story is in focus.",
      },
      {
        label: "Lighting",
        body: "Direction: front (flat), 45 degrees (dimensional), side (dramatic), back (ethereal). Color temp: 3200K (warm) to 5600K (neutral) to 7000K (cool). Light is 40% of any image.",
      },
    ],
  },
  {
    id: "imperfection",
    number: "03",
    name: "Strategic Imperfection",
    principle: "Perfect = Fake. Imperfect = Trustworthy",
    promptExample:
      "Film grain texture, dust particles floating in air, fabric wrinkles from movement, slight lens vignette, chromatic aberration on high-contrast edges",
    proTip:
      "This is the MOST IMPORTANT pillar. Add imperfections EARLY in your prompt, not as an afterthought. If the image looks too clean, it's dead on arrival.",
    details: [
      {
        label: "Essential imperfections",
        body: "Always include: film grain texture, dust particles in air, natural shadows and highlights, slight lens vignette. These four elements alone transform AI output from synthetic to believable.",
      },
      {
        label: "Human markers",
        body: "If people are visible: skin pores especially on nose and cheeks, stray hairs catching light, caught between moments at 70% intensity, teeth with natural variations, eyes slightly asymmetrical.",
      },
      {
        label: "Environmental mess",
        body: "Fabric wrinkles from movement, condensation on cold surfaces, fingerprints on glass, dust on shelves, uneven paint. Clean environments are studio environments. Real spaces have entropy.",
      },
      {
        label: "Anti-AI phrases",
        body: "When needed, explicitly state: 'NOT veneer-perfect teeth', 'NOT airbrushed skin', 'caught between moments', 'natural imperfections throughout'. Fight the AI's bias toward perfection.",
      },
    ],
  },
  {
    id: "mood",
    number: "04",
    name: "Mood Before Objects",
    principle: "Start with emotion — define feeling BEFORE describing product",
    promptExample:
      "Intimate morning atmosphere, warm and unhurried, soft diffused light through linen curtains, worn oak bathroom shelf, Mediterranean apartment",
    proTip:
      "Before writing any prompt, answer: what should someone FEEL looking at this image? If you can't answer that in one word, the prompt will produce generic results.",
    details: [
      {
        label: "Peaceful",
        body: "Soft light, muted colors, wide aperture, generous negative space. Works for wellness, skincare, slow lifestyle brands.",
      },
      {
        label: "Dramatic",
        body: "Hard light, high contrast, dynamic angles, strong shadows. Works for fashion, spirits, automotive, tech hardware.",
      },
      {
        label: "Intimate",
        body: "85mm lens, shallow depth of field, soft directional light, close framing. Works for portraits, personal care, food detail shots.",
      },
      {
        label: "Nostalgic",
        body: "Film grain, warm tones (3200K), vintage lens character, desaturated greens. Works for heritage brands, artisanal products, storytelling campaigns.",
      },
    ],
  },
  {
    id: "systems",
    number: "05",
    name: "Systems Over Single Images",
    principle: "Think in product lines (50 shots), not one-offs",
    promptExample:
      "Generate hero image with detailed prompt. Save as reference. Upload reference + simple scene variations. Result: exact same product in unlimited scenes",
    proTip:
      "The reference image method is the unlock. Generate one perfect hero shot, then use it as a reference to produce unlimited variations with consistent product appearance.",
    details: [
      {
        label: "FRAME phase",
        body: "Use ChatGPT to plan your shot list. Define mood variations, platform formats, and scene concepts before generating anything. Strategy before execution.",
      },
      {
        label: "DIRECT phase",
        body: "Generate with Nano Banana Pro or Midjourney using the reference method. One hero image becomes the anchor for 10-50 variations.",
      },
      {
        label: "REFINE phase",
        body: "Post-process in Canva or Lightroom. Add watermarks, batch export for platforms. 80% of AI images need minimal editing to be publishable.",
      },
      {
        label: "Version control",
        body: "Name your prompts systematically: brand_product_mood_v01. Build folders by campaign. Your prompt bank is your most valuable asset after 30 days.",
      },
    ],
  },
  {
    id: "framing",
    number: "06",
    name: "Frame-Based Thinking",
    principle: "Plan compositions like a filmmaker — three depth planes minimum",
    promptExample:
      "Shot through frosted glass foreground creating soft bokeh, product positioned in left third of midground, blurred Mediterranean terrace in background",
    proTip:
      "Always add 'shot through [foreground element] creating [bokeh type]'. This single technique adds more depth than any other compositional trick.",
    details: [
      {
        label: "Three planes",
        body: "Foreground: what's closest to camera (framing elements, bokeh). Midground: primary subject placement. Background: environmental context. Without three planes the image stays flat.",
      },
      {
        label: "Angles",
        body: "Low angle = power and authority. High angle = vulnerability and overview. Eye level = honest and direct. Dutch tilt = tension and unease. Choose the angle that matches the mood.",
      },
      {
        label: "Negative space",
        body: "More space = more luxury, more calm, more focus. Learn not to fill the frame. Product in left third with generous space to the right is the most versatile composition.",
      },
      {
        label: "Rule of thirds",
        body: "Main subject at intersections, never dead center. Empty space is active, not wasted. The grid creates natural visual tension that holds attention.",
      },
    ],
  },
  {
    id: "tools",
    number: "07",
    name: "Tool Fluency",
    principle: "Match the tool to the task — each has a sweet spot",
    promptExample:
      "Nano Banana Pro for consistent product shots (80%), Midjourney v7 for editorial and artistic (15%), Higgsfield for video and 360 (5%)",
    proTip:
      "Define the platform before generating. Instagram format (4:5) changes the composition, palette, and detail level you need. The format IS the first constraint.",
    details: [
      {
        label: "Nano Banana Pro",
        body: "Best for product consistency and ecommerce. Simpler prompts work better. Use for 80% of commercial work. $0.14/image makes it viable for production volumes.",
      },
      {
        label: "Midjourney v7",
        body: "Best for editorial, artistic, and complex multi-element scenes. More technical detail in prompts. Use --style raw --stylize 600 for photorealism.",
      },
      {
        label: "Platform formats",
        body: "Instagram: 4:5, high saturation, thumbnail must stop scroll in 0.3s. Web hero: 16:9, space for text overlay. Paid ads: extreme clarity, product recognisable in 2 seconds.",
      },
      {
        label: "Gemini (free tier)",
        body: "Enough for learning and iteration during the workshop. Use it to test prompt structures before committing to paid tools for final production.",
      },
    ],
  },
];
