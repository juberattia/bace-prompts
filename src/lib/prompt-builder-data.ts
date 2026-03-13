// ─── Industrial Design Prompt Builder Data ───────────────────────────────────

export interface PromptOption {
  id: string;
  label: string;
  description: string;
}

export const RENDER_STYLES: PromptOption[] = [
  { id: "studio", label: "Studio Shot", description: "Clean studio environment, controlled lighting, professional product photography" },
  { id: "lifestyle", label: "Lifestyle", description: "Product in natural use context, environmental storytelling" },
  { id: "technical", label: "Technical / Exploded", description: "Exploded view showing components, assembly, and engineering details" },
  { id: "material", label: "Material Close-up", description: "Macro detail shot focusing on material texture, finish, and craftsmanship" },
  { id: "sketch", label: "Sketch", description: "Hand-drawn industrial design sketch, marker rendering style" },
  { id: "editorial", label: "Editorial", description: "High-fashion editorial photography, dramatic staging, magazine-worthy composition" },
];

export const MATERIALS: PromptOption[] = [
  { id: "brushed-aluminum", label: "Brushed Aluminum", description: "Anodized brushed aluminum with subtle grain texture" },
  { id: "matte-plastic", label: "Matte Plastic", description: "Soft-touch matte plastic, premium injection-molded finish" },
  { id: "natural-wood", label: "Natural Wood", description: "Solid wood with visible grain, oiled or lacquered finish" },
  { id: "glass", label: "Glass", description: "Clear or frosted glass, transparent or translucent" },
  { id: "leather", label: "Leather", description: "Full-grain leather, natural patina and texture" },
  { id: "concrete", label: "Concrete", description: "Raw or polished concrete, architectural finish" },
  { id: "ceramic", label: "Ceramic", description: "Glazed or matte ceramic, porcelain-like finish" },
  { id: "fabric", label: "Fabric / Textile", description: "Woven textile, upholstery fabric, technical textile" },
  { id: "carbon-fiber", label: "Carbon Fiber", description: "Visible carbon fiber weave pattern, lightweight aesthetic" },
  { id: "copper", label: "Copper / Brass", description: "Warm metallic finish, polished or patinated" },
];

export const LIGHTING: PromptOption[] = [
  { id: "studio-3point", label: "Studio 3-Point", description: "Professional 3-point lighting setup, key + fill + rim" },
  { id: "natural-daylight", label: "Natural Daylight", description: "Soft natural window light, warm and inviting" },
  { id: "golden-hour", label: "Golden Hour", description: "Warm sunset tones, long shadows, golden highlights" },
  { id: "dramatic", label: "Dramatic", description: "High contrast, deep shadows, single directional light" },
  { id: "soft-diffused", label: "Soft Diffused", description: "Even, shadowless lighting, product catalog style" },
  { id: "neon-accent", label: "Neon Accent", description: "Colored accent lighting, contemporary tech aesthetic" },
];

export const CAMERA_ANGLES: PromptOption[] = [
  { id: "front-3quarter", label: "Front 3/4", description: "Classic product view, slight angle showing depth" },
  { id: "side", label: "Side Profile", description: "Clean side elevation, silhouette emphasis" },
  { id: "top-down", label: "Top Down", description: "Bird's eye view, flat lay composition" },
  { id: "low-angle", label: "Low Angle", description: "Looking up, heroic and monumental feel" },
  { id: "close-up", label: "Close-up Detail", description: "Tight crop on specific detail or mechanism" },
  { id: "wide", label: "Wide Environmental", description: "Wide shot placing product in context" },
];

export const ENVIRONMENTS: PromptOption[] = [
  { id: "modern-interior", label: "Modern Interior", description: "Clean contemporary interior, minimal furniture" },
  { id: "workshop", label: "Workshop / Atelier", description: "Maker's workshop, tools and raw materials visible" },
  { id: "urban", label: "Urban", description: "City environment, concrete and glass architecture" },
  { id: "nature", label: "Nature", description: "Outdoor natural setting, organic backdrop" },
  { id: "minimal-white", label: "Minimal White", description: "Pure white infinity background, no distractions" },
  { id: "gallery", label: "Gallery / Exhibition", description: "Art gallery setting, museum-like presentation" },
];

export const MODIFIERS: PromptOption[] = [
  { id: "photorealistic", label: "Photorealistic", description: "Hyper-realistic rendering quality" },
  { id: "dof", label: "Depth of Field", description: "Shallow focus with bokeh background blur" },
  { id: "8k", label: "8K Resolution", description: "Ultra-high resolution output" },
  { id: "product-focused", label: "Product Focused", description: "Product is the clear hero of the composition" },
  { id: "symmetrical", label: "Symmetrical", description: "Balanced, symmetrical composition" },
  { id: "minimal", label: "Minimal", description: "Stripped back, essential elements only" },
  { id: "moody", label: "Moody Atmosphere", description: "Atmospheric, emotional lighting and tones" },
  { id: "sharp-detail", label: "Sharp Detail", description: "Crisp detail throughout, tack-sharp focus" },
];
