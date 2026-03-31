// ─── BACE Visual DNA — 7 Universal Pillars Framework ────────────────────────

export interface DnaBlock {
  id: string;
  pillar: number;
  label: string;
  description: string;
  text: string;
}

export const BACE_DNA_BLOCKS: DnaBlock[] = [
  {
    id: "direction",
    pillar: 1,
    label: "Direction Over Description",
    description: "Imperative verbs: position, light, frame — NOT 'beautiful scene with...'",
    text: "Use imperative camera and directorial language. Position, light, frame, crop. Never describe passively. Every sentence is an instruction to the rendering engine. The prompt reads like a director's shot list, not a wish.",
  },
  {
    id: "technical",
    pillar: 2,
    label: "Technical Specificity",
    description: "Exact camera + lens + aperture + color temp + lighting direction",
    text: "Specify exact camera body (Leica M11, Hasselblad X2D 100C, Leica Q3, Fuji GFX 100S, Leica SL2-S) with lens focal length and aperture. Include color temperature in Kelvin. Name the lighting direction and quality. Technical precision eliminates AI guesswork.",
  },
  {
    id: "imperfection",
    pillar: 3,
    label: "Strategic Imperfection",
    description: "Film grain, dust particles, skin pores, stray hairs, caught-between-moments",
    text: "Film grain matched to camera system. Skin pores visible on noses and cheeks. Stray hairs catching light. Fabric pilling, creased elbows, scuffed shoes. Chipped nail polish, slightly crooked accessories. Urban wear: gum spots, faded paint, cracked pavement. NOT airbrushed. NOT veneer-perfect teeth. Caught between moments at 70% expression intensity.",
  },
  {
    id: "mood",
    pillar: 4,
    label: "Mood Before Objects",
    description: "Emotion and feeling open every prompt BEFORE product placement",
    text: "Open every prompt with the emotional atmosphere. The feeling comes first, the product second. 'Effortless belonging atmosphere' or 'Private contentment atmosphere' — the mood is the foundation, not the object.",
  },
  {
    id: "systems",
    pillar: 5,
    label: "Systems Over Single Images",
    description: "Reference image method — generate hero, then unlimited variations",
    text: "Use reference images for product consistency. Upload the BACE hub reference with every generation. The reference image method ensures the hub geometry, proportions, and branding remain precise across all variations. Generate a hero, then produce unlimited variations from that visual system.",
  },
  {
    id: "framing",
    pillar: 6,
    label: "Frame-Based Thinking",
    description: "Foreground + Midground + Background layers in every prompt",
    text: "Every prompt must define three depth layers. FOREGROUND: a close element creating depth (a hand, a railing, cobblestone surface, a bicycle wheel). MIDGROUND: the subject and hub interaction. BACKGROUND: city context dissolving into camera-appropriate bokeh. Three layers create cinematic depth.",
  },
  {
    id: "tool-fluency",
    pillar: 7,
    label: "Tool Fluency",
    description: "Nano Banana Pro for product consistency with reference uploads",
    text: "Use Nano Banana Pro (FAL.ai) for product-accurate generation with reference image uploads. Match prompt structure to the model's strengths: long-form directorial language, explicit camera specifications, and reference-image anchoring for geometric fidelity.",
  },
];

// ─── Prompt Prefix (prepend to every scene prompt) ──────────────────────────

export const BACE_PROMPT_PREFIX =
  "REFERENCE IMAGES: The uploaded images show the EXACT BACE hub product. Reproduce its geometry, proportions, locker grid, window section, and form PRECISELY. Do not redesign, reinterpret, or stylize. The hub is light grey metallic as shown. The hub sits DIRECTLY on the ground surface with NO concrete foundation, NO pedestal, NO platform — bottom edge touching the ground. Place into scene as described below.";

// ─── Forbidden Words ────────────────────────────────────────────────────────

export const FORBIDDEN_WORDS = [
  "beautiful",
  "nice",
  "professional photo",
  "stunning",
  "standing",
  "sitting",
  "holding",
  "poetry",
  "journey",
  "narrative",
  "reflector",
  "scrim",
  "softbox",
  "photoshoot",
  "photo session",
  "golden hour",
  "magic hour",
];

// ─── Anti-AI Phrases ────────────────────────────────────────────────────────

export const ANTI_AI_PHRASES = [
  "NOT veneer-perfect teeth",
  "NOT airbrushed skin",
  "NOT peak expression intensity",
  "caught between moments",
  "natural imperfections throughout",
];

// ─── Casting Rules ──────────────────────────────────────────────────────────

export const CASTING_RULES = {
  ageRange: "20-40 years old ONLY",
  genderRatio: "60% women, 40% men",
  ethnicity:
    "DIVERSE — Black, Middle Eastern, South Asian, East Asian, Southern European, Northern European. NEVER all-white.",
  fashion:
    "COS, Arket, Zara, Uniqlo aesthetic. Earth tones + one color pop per person. NO formal wear.",
  expression:
    "Caught between moments at 70% intensity. NOT peak smile. NOT stock-photo grin.",
  skin: "Pores visible on nose and cheeks. Subsurface scattering. NOT airbrushed.",
  hair: "Stray hairs catching light. Random frizz. NOT salon-perfect.",
  teeth: "Natural variations. NOT veneer-perfect.",
};

// ─── Camera Library ─────────────────────────────────────────────────────────

export const CAMERA_LIBRARY = [
  {
    id: "leica-m11",
    name: "Leica M11",
    lenses: ["Summilux 35mm f/1.4", "Summilux 50mm f/1.4"],
    character: "Rangefinder rendering, micro-contrast, 3D pop",
  },
  {
    id: "hasselblad-x2d",
    name: "Hasselblad X2D 100C",
    lenses: ["XCD 38mm f/2.5", "XCD 55mm f/2.5", "XCD 90mm f/2.5"],
    character: "Medium format, tonal richness, shallow plane of focus",
  },
  {
    id: "leica-q3",
    name: "Leica Q3",
    lenses: ["28mm f/1.7 fixed"],
    character: "Wide-angle intimacy, distinctive vignette",
  },
  {
    id: "fuji-gfx",
    name: "Fuji GFX 100S",
    lenses: ["GF 50mm f/3.5", "GF 80mm f/1.7"],
    character: "Medium format, film-like color science",
  },
  {
    id: "leica-sl2s",
    name: "Leica SL2-S",
    lenses: ["Summicron 35mm f/2", "Summicron 50mm f/2"],
    character: "Clinical sharpness with organic falloff",
  },
];

// ─── Lighting Conditions ────────────────────────────────────────────────────

export const LIGHTING_CONDITIONS = [
  { id: "bright-overcast", label: "Bright Overcast", temp: "5800K", description: "Soft, even, no harsh shadows — luminous and editorial" },
  { id: "direct-midday", label: "Direct Midday Sun", temp: "5400K", description: "Hard graphic shadows, high contrast, authentic" },
  { id: "open-shade", label: "Open Shade", temp: "5600K", description: "Subjects in building shade, bright background, natural fill" },
  { id: "cloudy-bright", label: "Cloudy-Bright", temp: "6200K", description: "High white sky, flat soft diffused light, very European" },
  { id: "post-rain", label: "Post-Rain", temp: "5600K", description: "Wet surfaces, reflections, luminous break in clouds" },
  { id: "mixed-light", label: "Mixed Light", temp: "5400K/3000K", description: "Shop interior warm spill meeting cool natural daylight" },
  { id: "overcast-rain", label: "Overcast Rain", temp: "6500K", description: "Cool-grey, flat, wet surfaces reflecting ambient light" },
  { id: "backlit-sun", label: "Backlit Sun", temp: "5200K", description: "Direct sun from behind subject, rim-light edge on silhouette" },
  { id: "dappled-shade", label: "Dappled Tree Shade", temp: "5400K", description: "Midday sun filtered through tree canopy, alternating bright and shadow" },
];

// ─── Editorial References ───────────────────────────────────────────────────

export const EDITORIAL_REFERENCES = [
  { name: "Cereal Magazine", tone: "Minimal, architectural, restrained" },
  { name: "The Gentlewoman", tone: "Sharp, intelligent, real women" },
  { name: "i-D Magazine", tone: "Street energy, youth culture, directness" },
  { name: "Apartamento", tone: "Lived-in, imperfect, authentic spaces" },
  { name: "Monocle", tone: "Urban, global, functional design" },
  { name: "COLORS Magazine", tone: "Diversity, documentary, unposed" },
];

// ─── Product Placement Rules ────────────────────────────────────────────────

export const PRODUCT_RULES = {
  placement:
    "The BACE hub sits DIRECTLY on the ground — cobblestone, asphalt, pavement. NO concrete foundation. NO pedestal. NO raised platform.",
  accuracy:
    "Compact rectangular container module, ~2.3m tall, 3-4m wide. Grid of locker compartments. Small window section. QR scanner panel. 'bace' branding. LIGHT GREY METALLIC color. Reproduce reference EXACTLY.",
  noGoldenHour:
    "NO golden hour. NO magic hour. NO amber wash. Use real varied natural daylight instead.",
};
