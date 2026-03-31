// ─── BACE Prompt Modules — Modular Mix & Match System ─────────────────────────

export interface PromptModule {
  id: string;
  label: string;
  description: string;
  promptText: string;
}

export interface PromptModuleCategory {
  id: string;
  label: string;
  icon: string;
  selectionType: "single";
  options: PromptModule[];
}

// ─── 1. PEOPLE ────────────────────────────────────────────────────────────────

const PEOPLE: PromptModuleCategory = {
  id: "people",
  label: "People",
  icon: "👥",
  selectionType: "single",
  options: [
    {
      id: "5-diverse-group",
      label: "5 Diverse Group",
      description: "Mixed ethnicity group, 25-35, casual editorial",
      promptText: `Frame 5 diverse adults (age 25-35) mid-interaction around the hub. A Black woman with short natural hair, sage-green linen blazer, white sneakers — mid-scan, phone tilted toward QR code, caught between concentration and a breaking half-smile. A Middle Eastern man, short beard, cream knit sweater, dark jeans — mid-laugh, coffee cup in grip, eyes crinkled. A South Asian woman, long dark hair, terracotta linen dress, crossbody bag — glancing up from phone mid-step. A blonde German man, navy tee, olive chinos, canvas tote — mid-pull extracting a package from an open locker. An East Asian woman with round glasses, oversized white shirt, bike shorts — one elbow resting on her parked city bike seat, watching with quiet amusement.\n\nEveryone caught between moments — NOT posed, NOT peak expression. 70% intensity. Bodies asymmetric, weight distributed naturally.`,
    },
    {
      id: "3-young-professionals",
      label: "3 Young Professionals",
      description: "Morning commute energy, focused and efficient",
      promptText: `Frame 3 young professionals (age 25-32). A mixed-race woman (warm brown skin, curly auburn hair in a loose updo with claw clip) in camel wool coat, wide-leg trousers, white leather sneakers — mid-pull extracting a kraft-paper package from an open locker, one earbud in, phone tucked in coat pocket. A South Asian man in navy peacoat — mid-stride passing behind the hub, earbuds in, glancing sideways. A German woman with auburn hair — approaching, phone raised, mid-step, crossbody bag swinging with momentum.\n\nFocused, efficient energy. Private rituals in public space. 70% expression intensity.`,
    },
    {
      id: "solo-woman",
      label: "Solo Woman",
      description: "One woman, independent, self-contained moment",
      promptText: `A solo woman (age 26-32), mixed heritage with textured hair, wearing an oversized cream knit cardigan over a fitted black top, straight-leg vintage jeans, clean white sneakers. She is mid-interaction with the hub — one hand reaching into an open locker, the other holding her phone loosely at her side. Her expression is private contentment — a closed-lip almost-smile, eyes soft, caught in the small satisfaction of a system that works. Weight on one hip, posture relaxed and asymmetric.\n\nNOT posed. NOT looking at camera. A candid private moment.`,
    },
    {
      id: "couple",
      label: "Couple",
      description: "Two people together, casual intimacy",
      promptText: `A mixed couple (both age 28-31) mid-interaction at the hub. She is a Black woman with shoulder-length locs, cream oversized knit cardigan over white tee, relaxed straight-leg jeans, brown leather loafers — mid-tap on the hub interface with one hand, phone in the other, head tilted in concentration, lips pressed in a small focused smile. He is a white German man, sandy stubble, faded olive field jacket and dark jeans, white sneakers — positioned slightly behind her, cradling one retrieved kraft package under his left arm, right hand mid-reach toward a second package. Mid-sentence, saying something casual that makes her nose crinkle — a small private joke.\n\nRelaxed body language, comfortable together. Natural couple energy, not staged.`,
    },
    {
      id: "man-and-dog",
      label: "1 Man + Dog",
      description: "Man with dog, simple daily routine",
      promptText: `A solo man (age 30-35) with a medium-sized mixed-breed dog on a leather leash. The man has a short beard, wears a washed navy henley, olive chinos with rolled cuffs, broken-in leather boots. He is mid-reach into an open locker with one hand, the leash wrapped around his other wrist, the dog sitting patiently beside him with head tilted, watching. His expression is gentle routine — relaxed jaw, slight upturn at the corner of his mouth, the ease of a daily habit.\n\nThe dog's leash has slack. A canvas tote hangs from his shoulder. NOT a photoshoot — a dog walk detour.`,
    },
    {
      id: "2-women-friends",
      label: "2 Women Friends",
      description: "Female friendship, teaching or discovering together",
      promptText: `Two women friends (age 26-29). The experienced friend: a German woman (light-brown skin, mixed heritage, textured curly hair in a high puff, round gold-wire glasses) in structured oversized white cotton shirt, olive wide-leg trousers, tan leather slides — mid-point at the hub interface, right index finger extended, left hand on hip, expression of pleasure in explaining. The new friend: a Black woman (dark skin, chin-length box braids with blonde tips, small gold nose stud) in terracotta oversized linen blazer over black bodysuit, cream trousers, white leather platform sandals — mid-lean toward the screen, eyes widened in the moment of "oh wait, this is actually cool," mouth slightly open.\n\nGenuine friendship energy. One teaching, one discovering. NOT staged.`,
    },
    {
      id: "solo-man",
      label: "Solo Man",
      description: "One man, headphones-in, zero ceremony",
      promptText: `A solo man (age 27-33), East Asian with a clean fade haircut, wearing over-ear headphones (matte black, premium but worn), a washed black cotton tee, relaxed dark jeans, and white leather sneakers with visible crease lines. He is mid-stride approaching the hub, one hand already reaching for a locker handle, phone in the other hand, eyes on the locker number — zero hesitation, pure muscle memory. Expression: none. This is a non-event for him. Jaw relaxed, mouth closed, attention already moving to the next thing.\n\nFlow state. The hub is invisible infrastructure. NOT a moment — an errand.`,
    },
    {
      id: "woman-and-baby",
      label: "Woman + Baby",
      description: "Mother with infant, the quiet triumph of micro-errands",
      promptText: `A woman (age 30-34) with an infant (3-5 months) in a front-facing carrier against her chest. The woman has auburn hair in a low messy ponytail, wears a soft grey oversized cardigan over a white tee, black leggings, clean white sneakers. She is mid-reach into an open locker with her right hand, her left hand instinctively cupped under the sleeping baby's bottom in the carrier. Her expression: tender efficiency — focused on the locker, but her body posture is a gentle sway, the unconscious rocking of a parent. The baby is asleep, cheek pressed against her chest, one tiny fist visible.\n\nThe quiet triumph of a sleeping baby and a completed errand. NOT idealized motherhood — real, tired, capable.`,
    },
    {
      id: "3-friends-celebration",
      label: "3 Friends Celebrating",
      description: "Burst of genuine surprise, raffle win energy",
      promptText: `3 friends (age 26-30) in a burst of celebration. An East Asian woman (shoulder-length black hair, blunt bangs mid-swing) in oversized lavender hoodie, black wide-leg trousers, chunky white platform sneakers — mid-thrust lifting a premium product box above her shoulder, head thrown back mid-laugh, eyes squeezed. A tall Black man (short-cropped hair, sharp jawline) in structured olive bomber and black jeans — both arms mid-raise, fingers spread, mid-shout, leaning toward her. A German woman (light brown hair escaping a messy bun, forehead slightly shiny) in striped Breton top and high-waisted jeans — mid-pivot, phone at arm's length recording.\n\nExplosive genuine surprise. Motion energy. i-D Magazine rawness.`,
    },
    {
      id: "4-people-mixed",
      label: "4 Mixed Group",
      description: "Diverse group of four, natural neighborhood scene",
      promptText: `Frame 4 people (age 25-33) in a natural neighborhood micro-scene. A Turkish-German woman (dark wavy hair, olive skin) in camel wrap coat and burgundy knit scarf — mid-reach into a locker. A Black man (close-trimmed beard) in olive field jacket and slim dark jeans — mid-cross of the street toward the hub, tote bag swinging. Through an adjacent shop window: a young German shopkeeper (blonde bob, canvas apron) mid-arrange of products. An elderly person (wire-rim glasses, wool cardigan) seated at a small cafe table with espresso, watching the street.\n\nNeighborhood intimacy. Everyone in their own rhythm, sharing the same space. NOT a group photo.`,
    },
  ],
};

// ─── 2. SHOT TYPE ─────────────────────────────────────────────────────────────

const SHOT_TYPE: PromptModuleCategory = {
  id: "shot-type",
  label: "Shot Type",
  icon: "🎬",
  selectionType: "single",
  options: [
    {
      id: "street-editorial-wide",
      label: "Street Editorial Wide",
      description: "Full scene with hub, people, and urban context",
      promptText: `Full street editorial composition — the hub, people, and city environment all visible in a wide establishing frame. The image reads as a complete editorial photograph with beginning, middle, and end. Three distinct depth layers visible. The hub is part of the scene, not the hero — life happening around infrastructure.`,
    },
    {
      id: "through-window-layer",
      label: "Through-Window Layer",
      description: "Shot through glass with reflections creating depth",
      promptText: `Shot THROUGH a glass surface — shop window, car window, or cafe glass — creating a layer of interior reflections (shelving, plants, objects) overlapping the street scene beyond. The glass creates a layered editorial effect with slight double-exposure on subject edges. Interior elements are semi-transparent, ghosting over the street scene. Fingerprints and small scratches on the glass are VISIBLE as textural elements.`,
    },
    {
      id: "close-up-hands-detail",
      label: "Close-Up Hands Detail",
      description: "Extreme close-up of hands interacting with hub",
      promptText: `Extreme close-up composition — HANDS are the subject. Fingers, knuckles, phone screen, locker handle, package texture — all in sharp medium-format detail. The hub's locker grid fills the background. One locker is open, revealing a package inside. The phone hovers near the QR code, screen reflected faintly on the hub's surface. Skin texture, nail detail, ring scratches, phone screen cracks — all visible at this intimate scale.`,
    },
    {
      id: "environmental-portrait",
      label: "Environmental Portrait",
      description: "Person-focused with rich urban background",
      promptText: `Environmental portrait composition — subject sharp in the midground, city context rich and detailed behind them. The person is the clear subject, but the environment tells the story of WHERE and WHEN. The hub is visible but secondary to the human presence. Depth of field isolates the subject while keeping enough background detail to establish location and atmosphere.`,
    },
    {
      id: "overhead-elevated",
      label: "Overhead / Elevated",
      description: "Bird's-eye or second-floor perspective looking down",
      promptText: `Elevated angle — camera positioned at second-floor window, balcony, or bridge, looking down at 30-45 degrees onto the scene below. The elevated perspective reveals spatial relationships: hub footprint, people's foreshortened figures, shadows pooling at feet, the geometry of the urban grid. From above, the hub's flat roof is partially visible — a real industrial surface. This angle creates a documentary, map-like composition.`,
    },
    {
      id: "walk-away-back-view",
      label: "Walk-Away Back View",
      description: "Subjects walking away from hub, mission complete",
      promptText: `Subjects' backs to camera, walking AWAY from the hub — the frame captures departure, not arrival. The hub recedes into the background, already behind them. Packages in hand or tucked under arms. The composition shows forward momentum, the natural end of an interaction. Figures create leading lines away from the hub. The hub succeeds when people walk away from it.`,
    },
  ],
};

// ─── 3. SERVICE ───────────────────────────────────────────────────────────────

const SERVICE: PromptModuleCategory = {
  id: "service",
  label: "Service",
  icon: "📦",
  selectionType: "single",
  options: [
    {
      id: "click-collect",
      label: "Click & Collect",
      description: "Ordered online, picking up from locker",
      promptText: `The BACE service shown is CLICK & COLLECT — the person ordered online and is now retrieving their package from the hub locker. One locker door is open, a kraft-paper package visible inside. The person's phone shows a confirmation screen or QR code. The interaction is mid-pickup: hand reaching in, package being extracted. This is the core BACE use case — frictionless package retrieval.`,
    },
    {
      id: "instant-buy",
      label: "Instant Buy",
      description: "Browsing and purchasing directly at the hub",
      promptText: `The BACE service shown is INSTANT BUY — the person is browsing products available in the hub and purchasing on the spot. The hub's interface screen shows a product browsing layout. One locker opens to reveal a curated product (specialty coffee, craft item, design object). The interaction conveys discovery and surprise — "I didn't know this was here." Impulse meets quality.`,
    },
    {
      id: "raffle-drop",
      label: "Raffle / Drop",
      description: "Limited product drop or raffle win moment",
      promptText: `The BACE service shown is RAFFLE / DROP — a limited product release through the hub. The person just won or secured a sought-after item. A premium product box is being lifted from the locker with visible excitement. The locker frames the empty space where the prize was. This is the emotional peak — genuine surprise and celebration. Energy, not efficiency.`,
    },
    {
      id: "rent-service",
      label: "Rent Service",
      description: "Borrowing items temporarily from the hub",
      promptText: `The BACE service shown is RENT — borrowing items temporarily instead of buying. A portable Bluetooth speaker, camping gear, power tool, or other rentable item is mid-extraction from the locker. The person's body language says "weekend plans" not "purchase." Items are practical and desirable. Rent promotes access over ownership, sustainability over consumption.`,
    },
    {
      id: "neighborhood-retail",
      label: "24/7 Neighborhood Retail",
      description: "Local shop extension, always accessible",
      promptText: `The BACE service shown is 24/7 NEIGHBORHOOD RETAIL — the hub extends a local shop's reach around the clock. Products from nearby small businesses are available via the lockers. The adjacent shop is visible in the scene. The hub bridges digital convenience with local commerce — a physical link between online browsing and neighborhood stores. Fresh bread, specialty coffee, curated products from local makers.`,
    },
    {
      id: "bike-mobility",
      label: "Bike Mobility",
      description: "Hub as mobility station with bikes and scooters",
      promptText: `The BACE hub is positioned as a MOBILITY STATION — e-scooters and city bikes parked alongside. The person is mid-transition between transport and package pickup, combining mobility and logistics in one stop. The hub is part of a micro-mobility ecosystem. Bicycle wheels and scooter handlebars in frame. The intersection of movement and delivery infrastructure.`,
    },
    {
      id: "qr-scan-pickup",
      label: "QR Scan Pickup",
      description: "The frictionless 4-step flow in detail",
      promptText: `The BACE service shown is the QR SCAN PICKUP — the frictionless 4-step flow. Step 1: approach. Step 2: scan QR code with phone. Step 3: locker opens. Step 4: take package. The phone is angled toward the hub's QR code area, screen showing a scanning interface. The interaction takes seconds. Technology disappearing into routine. Zero friction, zero ceremony.`,
    },
    {
      id: "returns-delivery",
      label: "Returns & Delivery",
      description: "Dropping off returns or consolidated delivery",
      promptText: `The BACE service shown is RETURNS & CONSOLIDATED DELIVERY — the person is placing a package INTO the locker (reverse flow) or collecting multiple consolidated deliveries in one stop. A return label is visible on the package. The two-way function is demonstrated: pick up AND drop off. One delivery point replaces multiple failed home deliveries. Sustainability through consolidation.`,
    },
  ],
};

// ─── 4. MOOD ──────────────────────────────────────────────────────────────────

const MOOD: PromptModuleCategory = {
  id: "mood",
  label: "Mood",
  icon: "💫",
  selectionType: "single",
  options: [
    {
      id: "effortless-belonging",
      label: "Effortless Belonging",
      description: "The ordinary magic of people who share a place",
      promptText: `Effortless belonging atmosphere, the ordinary magic of people who share a place. The scene radiates the quiet satisfaction of a neighborhood that works — people in their own rhythms, sharing space without performance. No one is trying. Everyone belongs. The feeling of a place you'd want to live in.`,
    },
    {
      id: "quiet-morning-efficiency",
      label: "Quiet Morning Efficiency",
      description: "Focused calm of an optimized morning routine",
      promptText: `Private ritual atmosphere, the focused calm of someone who has optimized their morning. Efficiency without rush. The scene has a pre-9am quality — cool light, minimal crowds, purposeful movement. The satisfaction of systems that work without asking for attention. Cool, not cozy.`,
    },
    {
      id: "delighted-surprise",
      label: "Delighted Surprise",
      description: "Stumbling onto something good, discovery energy",
      promptText: `Delighted surprise atmosphere, the energy of stumbling onto something good. Eyebrows lifting, the onset of a grin, a lean-in of interest. Not explosive — more like a pleasant unexpected find. The warmth of discovery between friends. "Wait, you can do THAT here?"`,
    },
    {
      id: "explosive-surprise",
      label: "Explosive Genuine Surprise",
      description: "Full celebration energy, raffle win moment",
      promptText: `Explosive surprise atmosphere, the half-second before full comprehension of winning. Arms mid-raise, mouth open, eyes squeezed, head thrown back. Bodies in motion — leaning, grabbing, pointing. The kinetic energy of genuine celebration. NOT posed joy — CAUGHT joy. Raw, loud, physical.`,
    },
    {
      id: "calm-efficiency",
      label: "Calm Efficiency",
      description: "Systems that work without friction",
      promptText: `Calm efficiency atmosphere, the satisfaction of systems that work without friction. No drama, just clarity. The scene has a designed quality — everything in its place, movements purposeful, no wasted energy. The visual equivalent of a well-organized morning. Minimal, graphic, intentional.`,
    },
    {
      id: "urban-velocity",
      label: "Urban Velocity",
      description: "Kinetic city energy, bodies in motion",
      promptText: `Urban velocity atmosphere, the kinetic energy of a city waking up and moving. Bicycle wheels, mid-stride legs, bags swinging, scarves catching wind. The scene buzzes with purposeful movement — not chaos, but coordinated urban rhythm. Everyone going somewhere. Energy, not stillness.`,
    },
    {
      id: "neighborhood-intimacy",
      label: "Neighborhood Intimacy",
      description: "Knowing your street by its rhythms",
      promptText: `Neighborhood intimacy atmosphere, the feeling of knowing your street by its rhythms. A shopkeeper arranging products, a regular at a cafe, familiar faces passing. The scene has the warmth of recognition without sentimentality — this is ROUTINE intimacy, not Hallmark warmth. Real, lived-in, specific.`,
    },
    {
      id: "private-contentment",
      label: "Private Contentment",
      description: "Quiet personal satisfaction, a private moment",
      promptText: `Private contentment atmosphere, the quiet personal satisfaction of a small thing going right. A closed-lip almost-smile, eyes soft, a moment entirely for oneself. The world recedes. The interaction is personal and small — collecting a package, completing a task — but the feeling is disproportionately good. Luxury in micro-moments.`,
    },
    {
      id: "energized-calm",
      label: "Energized Calm",
      description: "Post-exercise, body warm, mind clear",
      promptText: `Energized calm atmosphere, the settled confidence of a body that just worked. Endorphins visible in posture — upright, open, grounded. Slight sheen on temples. The person moves with physical awareness — muscles engaged, balance easy, energy contained but present. Post-gym clarity. Alert, not wired.`,
    },
    {
      id: "niche-joy",
      label: "Niche Joy",
      description: "The private thrill of getting the specific thing you wanted",
      promptText: `Niche joy atmosphere, the private thrill of getting the specific thing you wanted. The satisfaction is SPECIALIZED — this isn't general happiness, it's the particular pleasure of a vinyl collector finding a pressing, a coffee snob getting their beans, a hobbyist receiving their specific order. The joy of specificity.`,
    },
  ],
};

// ─── 5. CITY ──────────────────────────────────────────────────────────────────

const CITY: PromptModuleCategory = {
  id: "city",
  label: "City",
  icon: "🏙️",
  selectionType: "single",
  options: [
    {
      id: "munich-viktualienmarkt",
      label: "Munich — Viktualienmarkt",
      description: "Traditional market square, cobblestone, Bavarian facades",
      promptText: `Position the BACE hub DIRECTLY on cobblestone at Viktualienmarkt, Munich. NO concrete foundation. NO pedestal. The hub's bottom edge meets the cobblestone surface directly — gaps between hub base and uneven stones visible. Market stalls in background. Heilig-Geist-Kirche tower rising into the sky. Traditional Bavarian facades in sandstone and ochre. Market shoppers as soft shapes.`,
    },
    {
      id: "hamburg-hafencity",
      label: "Hamburg — HafenCity",
      description: "Modern waterfront architecture, clean concrete, maritime",
      promptText: `Position the BACE hub on modern concrete sidewalk in Hamburg HafenCity. NO concrete foundation — hub base meets sidewalk directly, a narrow shadow line at the base. Speicherstadt red-brick arches visible. Canal water with cool morning reflections — grey-blue, NOT warm glimmer. Elbphilharmonie angular roofline in soft focus. Modern architecture, maritime industrial character.`,
    },
    {
      id: "cologne-belgisches-viertel",
      label: "Cologne — Belgisches Viertel",
      description: "Ornate Altbau facades, boutiques, tree-lined streets",
      promptText: `Position the BACE hub on tree-lined sidewalk in Cologne Belgisches Viertel. NO concrete foundation — hub sits directly on pavement. Ornate Altbau facades with iron balconies in cream and pale grey. Plane trees with green canopy. Boutique shops, a vintage Vespa against the curb. The Belgisches Viertel streetscape — cosmopolitan, residential, European.`,
    },
    {
      id: "berlin-kreuzberg",
      label: "Berlin — Kreuzberg",
      description: "Bergmannstrasse, street art, direct urban energy",
      promptText: `Position the BACE hub on Bergmannstrasse in Berlin-Kreuzberg. NO concrete foundation — hub sits directly on asphalt/stone pavement. Independent bookshop windows, bar outdoor chairs, plane trees. Berlin's raw urban energy — street art visible, diverse pedestrians, cycling infrastructure. Authentic, unpolished, alive.`,
    },
    {
      id: "munich-werksviertel",
      label: "Munich — Werksviertel",
      description: "Converted industrial, modern co-working, clean concrete",
      promptText: `Position the BACE hub outside a modern co-working building in Munich Werksviertel. NO concrete foundation — hub sits directly on clean concrete pavement, flush. Converted industrial facades — factory walls with window grids, modern glass inserts. The geometric order of repurposed architecture. Clean, minimal, designed.`,
    },
    {
      id: "hamburg-schanzenviertel",
      label: "Hamburg — Schanzenviertel",
      description: "Creative quarter, diverse storefronts, lived-in",
      promptText: `Position the BACE hub on a sidewalk in Hamburg Schanzenviertel. NO concrete foundation — hub directly on pavement. Eclectic storefronts, indie cafes, vintage shops. Graffiti and street art on walls. The Schanze's creative-class energy — diverse, slightly rough, authentic. A neighborhood that hasn't been polished smooth.`,
    },
    {
      id: "berlin-prenzlauer-berg",
      label: "Berlin — Prenzlauer Berg",
      description: "Renovated Altbau, young families, chestnut trees",
      promptText: `Position the BACE hub on a square in Berlin-Prenzlauer Berg. NO concrete foundation — hub on cobblestone. Renovated Altbau rooftops with terracotta tiles. Chestnut tree canopies. Organic cafes with outdoor tables. A playground nearby. The Prenzlauer Berg quality — gentrified but genuine, young families, weekend markets.`,
    },
    {
      id: "cologne-ehrenfeld",
      label: "Cologne — Ehrenfeld",
      description: "Street art, weekend markets, record stores",
      promptText: `Position the BACE hub in Cologne-Ehrenfeld at the edge of a street market. NO concrete foundation — hub on cobblestone. Large murals in earthy tones on side walls. Mismatched market stall awnings. Record stores with vinyl crates outside. Ehrenfeld's creative energy — diverse, independent, unpretentious.`,
    },
    {
      id: "munich-glockenbach",
      label: "Munich — Glockenbach",
      description: "Residential streets, cafes, quiet urban quality",
      promptText: `Position the BACE hub on a residential side street in Munich-Glockenbach. NO concrete foundation — hub on paved sidewalk. Low residential buildings with flower boxes. A corner cafe with two outdoor tables. Mature street trees creating shade. Glockenbach's quiet urban quality — walkable, local, lived-in.`,
    },
    {
      id: "berlin-friedrichshain",
      label: "Berlin — Friedrichshain",
      description: "Boxhagener Platz, flea markets, indie culture",
      promptText: `Position the BACE hub on Boxhagener Platz in Berlin-Friedrichshain. NO concrete foundation — hub on cobblestone. Plane trees casting shade, flea market tables on weekends, indie bars and cafes lining the square. Friedrichshain's youthful energy — creative, diverse, slightly alternative.`,
    },
  ],
};

// ─── 6. CAMERA ────────────────────────────────────────────────────────────────

const CAMERA: PromptModuleCategory = {
  id: "camera",
  label: "Camera",
  icon: "📷",
  selectionType: "single",
  options: [
    {
      id: "hasselblad-38mm",
      label: "Hasselblad X2D + 38mm",
      description: "Medium format wide, tonal richness, monumental",
      promptText: `Hasselblad X2D 100C, XCD 38mm f/2.5. Medium format tonal richness — vast dynamic range rendering both highlight and shadow with detail. The wide 38mm on medium format gives an expansive field of view while maintaining the characteristic shallow plane of focus. Creamy Hasselblad bokeh in background. Fine, organic film grain.`,
    },
    {
      id: "hasselblad-55mm",
      label: "Hasselblad X2D + 55mm",
      description: "Medium format standard, clarity and depth",
      promptText: `Hasselblad X2D 100C, XCD 55mm f/2.5. Medium format standard lens — the workhorse focal length with massive tonal range. Renders subjects with clinical detail while the background melts into characteristic medium-format bokeh. Even illumination, no drama — just clarity. Fine grain, organic texture.`,
    },
    {
      id: "hasselblad-90mm",
      label: "Hasselblad X2D + 90mm",
      description: "Medium format telephoto, shallow focus, intimate",
      promptText: `Hasselblad X2D 100C, XCD 90mm f/2.5. Medium format telephoto — an impossibly thin focal plane isolating the subject. Extreme subject separation with creamy bokeh. The 90mm on medium format compresses perspective subtly while rendering skin and texture with extraordinary detail. Intimate without intrusion.`,
    },
    {
      id: "leica-m11-35mm",
      label: "Leica M11 + 35mm",
      description: "Rangefinder 35mm, micro-contrast, street energy",
      promptText: `Leica M11, Summilux 35mm f/1.4. Rangefinder rendering with distinctive micro-contrast and 3D pop. The 35mm focal length captures environmental context while maintaining subject presence. Punchy mid-tones, contrasty grain. The classic street photography lens on the classic street photography body.`,
    },
    {
      id: "leica-m11-50mm",
      label: "Leica M11 + 50mm",
      description: "Rangefinder 50mm, portrait rendering, classic",
      promptText: `Leica M11, Summilux 50mm f/1.4. Rangefinder rendering at the classic portrait focal length — micro-contrast that makes subjects pop from backgrounds. Shallow depth of field with distinctive Leica bokeh character. Contrasty, dimensional, with that rangefinder 3D quality that no other system replicates.`,
    },
    {
      id: "leica-q3-28mm",
      label: "Leica Q3 28mm",
      description: "Wide-angle intimacy, distinctive vignette",
      promptText: `Leica Q3, 28mm f/1.7 fixed lens. Wide-angle intimacy — pulls in the full street context while maintaining Leica's distinctive micro-contrast. Slight barrel distortion at frame edges. Characteristic vignette. The wide 28mm creates dramatic perspective distortion when close to subjects. Street photography energy with a wide embrace.`,
    },
    {
      id: "fuji-gfx-80mm",
      label: "Fuji GFX + 80mm",
      description: "Medium format portrait, film-like color",
      promptText: `Fuji GFX 100S, GF 80mm f/1.7. Medium format with film-like color science — organic, rich, with that distinctive Fuji rendering. At f/1.7, the focal plane is razor-thin on this medium-format sensor. Telephoto compression stacks depth layers. Fine, film-like grain with organic color rendition.`,
    },
    {
      id: "leica-sl2s-35mm",
      label: "Leica SL2-S + 35mm",
      description: "Clinical sharpness, organic falloff",
      promptText: `Leica SL2-S, Summicron 35mm f/2. Clinical sharpness with organic Summicron falloff — the bridge between precision and warmth. The 35mm field of view captures context while the f/2 aperture provides selective focus. Fine, clinical grain. The SL2-S renders with a coolness that suits documentary work.`,
    },
  ],
};

// ─── 7. LIGHT ─────────────────────────────────────────────────────────────────

const LIGHT: PromptModuleCategory = {
  id: "light",
  label: "Light",
  icon: "☀️",
  selectionType: "single",
  options: [
    {
      id: "bright-overcast",
      label: "Bright Overcast",
      description: "Soft, even, 5800K — luminous and editorial",
      promptText: `Bright overcast daylight — flat diffused light from high white sky creating even illumination with NO harsh shadows, 5800K neutral color temperature. Luminous and editorial. The overcast light reveals texture without flattering — skin pores, fabric weave, surface detail all honestly rendered. NOT golden. NOT warm. Real European overcast.`,
    },
    {
      id: "direct-midday",
      label: "Direct Midday Sun",
      description: "Hard graphic shadows, 5400K, high contrast",
      promptText: `Direct midday sun at 5400K creating HARD graphic shadows on pavement — sharp-edged shadow shapes of people and hub on the ground. High contrast between sunlit surfaces and deep shadow areas. The direct sun is UNFLATTERING in the best way — shows every texture. Skin shine on foreheads and noses. Hard shadows under eyes. NOT golden — HARSH NOON LIGHT.`,
    },
    {
      id: "open-shade",
      label: "Open Shade",
      description: "Subjects in building shade, 5600K, natural fill",
      promptText: `Subjects in OPEN SHADE beneath a building overhang or tree canopy, bright overcast sky beyond at 5600K creating a luminous background. The shade provides soft, even illumination on faces while the background glows. Natural fill from reflected ground light. Flat, honest, editorial. The light that fashion editors actually prefer.`,
    },
    {
      id: "cloudy-bright",
      label: "Cloudy-Bright",
      description: "High white sky, 6200K, very European",
      promptText: `Cloudy-bright light — thin cloud layer diffusing sunlight into soft cool 6200K directional from the east, creating subtle shadows without harshness. High white sky. The very European quality of light that makes everything look like a magazine editorial. Flat, even, luminous. Colors feel honest and slightly cool.`,
    },
    {
      id: "post-rain",
      label: "Post-Rain",
      description: "Wet surfaces, reflections, 5600K luminous break",
      promptText: `Post-rain light — clouds breaking with a bright white area, 5600K, wet surfaces reflecting the luminous sky. Everything is more graphic after rain — saturated colors, mirror-like pavement, sharp reflections. The way a city looks 10 minutes after rain — everything sharp, reflective, alive. Puddles create mirror compositions.`,
    },
    {
      id: "mixed-light",
      label: "Mixed Light",
      description: "5400K natural + 3000K shop spill, warm-cool split",
      promptText: `Mixed light — 5400K natural daylight meeting warm 3000K light spilling from adjacent shop windows. The warm-cool split creates a subtle color contrast across subjects and surfaces. One side warm, one side cool. The dynamic range challenge of real urban environments — NOT corrected, embraced.`,
    },
    {
      id: "overcast-rain",
      label: "Overcast Rain",
      description: "Cool-grey 6500K, flat, wet reflections",
      promptText: `Overcast rain light at 6500K — cool-grey, flat, wet surfaces reflecting ambient light. Active or just-finished rain. Everything has a wet sheen. Colors are muted but surfaces are reflective. The grey sky is NOT depressing — it's graphic and honest. Rain drops visible on surfaces and clothing.`,
    },
    {
      id: "backlit-sun",
      label: "Backlit Sun",
      description: "Sun from behind, rim-light edge, 5200K",
      promptText: `Direct sun from BEHIND the subject at 5200K — creating a rim-light edge on silhouette. Hair catches light as a bright halo. Face in relative shadow with soft fill from reflected ground and building surfaces. The backlit quality creates a cinematic separation between subject and background. Lens flare possible.`,
    },
    {
      id: "dappled-shade",
      label: "Dappled Tree Shade",
      description: "Midday sun through canopy, 5400K, moving pattern",
      promptText: `Dappled tree shade — midday sun at 5400K filtered through tree canopy, creating alternating bright spots and shadow patches across subjects and the hub surface. The moving pattern of light and shadow is the HERO element — unpredictable, uneven, a bright spot on one shoulder, shadow across a forehead. Natural, organic illumination that would be "corrected" in a commercial shoot but here gives LIFE.`,
    },
  ],
};

// ─── 8. ANGLE ─────────────────────────────────────────────────────────────────

const ANGLE: PromptModuleCategory = {
  id: "angle",
  label: "Angle",
  icon: "📐",
  selectionType: "single",
  options: [
    {
      id: "low-angle-hip",
      label: "Low Angle Hip Height",
      description: "Camera at hip, tilted up — subjects feel monumental",
      promptText: `Low angle, camera at hip height tilted 10 degrees upward. The hub and people feel monumental from this low perspective. The ground plane creates strong leading lines. Subjects shot from below have natural stature — jawlines catch overhead light, bodies tower. The sky occupies the upper portion of the frame.`,
    },
    {
      id: "eye-level-off-center",
      label: "Eye-Level Off-Center",
      description: "Natural eye level, subject slightly off-center",
      promptText: `Eye-level camera, subject positioned off-center on the left or right third of frame — creating editorial asymmetry. The eye-level perspective feels natural and immediate, like a passerby's glance. The off-center composition creates visual tension and negative space for the environment to breathe.`,
    },
    {
      id: "elevated-30-down",
      label: "Elevated 30° Down",
      description: "First-floor or bridge level, looking down",
      promptText: `Elevated angle — camera on a first-floor bridge, balcony, or window, looking down at 30 degrees onto the sidewalk below. The elevated view reveals shoulder tops, foreshortened figures, the hub's roof surface, and shadow patterns on the ground. An intimate, documentary feel from above — observational, not surveillance.`,
    },
    {
      id: "dutch-tilt-15",
      label: "Dutch Tilt 15°",
      description: "Camera rotated 15° for diagonal energy",
      promptText: `Dutch tilt — camera rotated 15 degrees clockwise creating diagonal energy through the frame. The tilt amplifies motion, makes static subjects feel dynamic, and adds an editorial edge. Horizon line runs diagonally. Buildings lean. The frame feels alive with kinetic potential.`,
    },
    {
      id: "dead-center-symmetry",
      label: "Dead-Center Symmetry",
      description: "Hub centered, Wes Anderson graphic frame",
      promptText: `Dead-center straight-on composition — camera perfectly level, hub centered in frame, symmetrical. The people break the symmetry with their organic human presence. Like a Wes Anderson frame but without the irony — graphic, architectural, intentional. The symmetry of infrastructure contrasts with the asymmetry of life.`,
    },
    {
      id: "through-shop-window",
      label: "Through Shop Window",
      description: "Camera inside, shooting out through glass",
      promptText: `Camera positioned INSIDE a shop, shooting OUT through the window — the glass creates a layer of interior reflections overlapping the street scene. Interior elements (shelves, plants, price tags) are semi-transparent, ghosting over subjects. The window frame creates a natural crop. Fingerprints and glass scratches add texture. A scene-within-a-scene.`,
    },
    {
      id: "over-shoulder",
      label: "Over-Shoulder",
      description: "Close behind subject, looking past them at hub",
      promptText: `Over-the-shoulder close — camera positioned just behind and slightly above the subject's shoulder, looking past them at the hub and their hands. The subject's shoulder, neck, and ear fill the left side of frame as a soft foreground element. The hub interaction is seen from their perspective — intimate, first-person-adjacent. Hair detail and clothing texture visible at close range.`,
    },
    {
      id: "street-level-wide",
      label: "Street-Level Wide",
      description: "Camera on ground, dramatic perspective distortion",
      promptText: `Ground-level angle — camera placed nearly ON the pavement surface, tilted slightly upward, creating dramatic perspective distortion. The ground-level perspective makes bicycle wheels and human legs dominant in the foreground. The hub TOWERS from this low perspective. Pavement texture in extreme close-up detail — asphalt, painted markings, cracks. NOT aspirational — DOCUMENTARY. Street-level truth.`,
    },
  ],
};

// ─── 9. BACE HUB ─────────────────────────────────────────────────────────────

const BACE_HUB: PromptModuleCategory = {
  id: "bace-hub",
  label: "BACE Hub",
  icon: "🏗️",
  selectionType: "single",
  options: [
    {
      id: "standard-hub",
      label: "Standard Hub",
      description: "Full hub visible, locker grid, integrated into scene",
      promptText: `A BACE hub (from uploaded reference — reproduce EXACTLY, white/cream, locker grid intact). Compact rectangular container module, approximately 2.3m tall, 3-4m wide. Grid of locker compartments with metal doors. Small window section. 'bace' branding visible. WHITE/CREAM color. The hub sits DIRECTLY on the ground surface — cobblestone, asphalt, or pavement. NO concrete foundation. NO pedestal. NO platform — bottom edge touching the ground. The hub reads as natural urban infrastructure, belonging in the scene.`,
    },
    {
      id: "hub-close-up",
      label: "Hub Close-Up Detail",
      description: "Tight framing on locker grid, material detail",
      promptText: `A BACE hub in SHARP close-up detail — each locker compartment visible with shadow depth, metal door edges, the slight variation between closed doors. One locker is open, revealing a kraft-paper package inside — the paper's texture, a minimal stamp label, a small crease. The QR scanner panel area visible. The hub's material surface at close range: industrial white/cream finish, 'bace' branding, mounting hardware visible. Reproduce from uploaded reference EXACTLY. NO redesign. NO stylization.`,
    },
  ],
};

// ─── All Categories ───────────────────────────────────────────────────────────

export const PROMPT_MODULE_CATEGORIES: PromptModuleCategory[] = [
  PEOPLE,
  SHOT_TYPE,
  SERVICE,
  MOOD,
  CITY,
  CAMERA,
  LIGHT,
  ANGLE,
  BACE_HUB,
];

// ─── Prompt Assembly ──────────────────────────────────────────────────────────

const STRATEGIC_IMPERFECTION_BLOCK = `STRATEGIC IMPERFECTION: Film grain matched to camera system. Skin pores visible on noses and cheeks. Stray hairs catching light. Fabric pilling, creased elbows, scuffed shoes. Chipped nail polish, slightly crooked accessories. Urban wear: gum spots, faded paint, cracked pavement. NOT airbrushed. NOT veneer-perfect teeth. Caught between moments at 70% expression intensity. Natural imperfections throughout.`;

export interface PromptSelections {
  [categoryId: string]: string; // categoryId -> optionId
}

export function assemblePrompt(
  selections: PromptSelections,
  prefix: string
): string {
  const getSelectedText = (categoryId: string): string | null => {
    const optionId = selections[categoryId];
    if (!optionId) return null;
    const category = PROMPT_MODULE_CATEGORIES.find((c) => c.id === categoryId);
    if (!category) return null;
    const option = category.options.find((o) => o.id === optionId);
    return option?.promptText ?? null;
  };

  const parts: string[] = [];

  // Prefix
  parts.push(prefix);

  // Mood opens the prompt
  const mood = getSelectedText("mood");
  if (mood) parts.push(mood);

  // Technical block: Angle + Camera + Light
  const technicalParts: string[] = [];
  const angleText = getSelectedText("angle");
  if (angleText) technicalParts.push(angleText);
  const cameraText = getSelectedText("camera");
  if (cameraText) technicalParts.push(cameraText);
  const lightText = getSelectedText("light");
  if (lightText) technicalParts.push(lightText);
  if (technicalParts.length) parts.push(technicalParts.join("\n\n"));

  // City + Hub placement
  const cityText = getSelectedText("city");
  if (cityText) parts.push(cityText);
  const hubText = getSelectedText("bace-hub");
  if (hubText) parts.push(hubText);

  // People
  const peopleText = getSelectedText("people");
  if (peopleText) parts.push(peopleText);

  // Service
  const serviceText = getSelectedText("service");
  if (serviceText) parts.push(serviceText);

  // Shot type
  const shotText = getSelectedText("shot-type");
  if (shotText) parts.push(shotText);

  // Always append strategic imperfection
  parts.push(STRATEGIC_IMPERFECTION_BLOCK);

  return parts.filter(Boolean).join("\n\n");
}

// ─── Presets — Quick-fill from master scenes ──────────────────────────────────

export interface PromptPreset {
  id: string;
  label: string;
  description: string;
  selections: PromptSelections;
}

export const PROMPT_PRESETS: PromptPreset[] = [
  {
    id: "preset-hero-community",
    label: "#1 Hero: Community Gathering",
    description: "Munich Viktualienmarkt, 5 diverse adults, effortless belonging",
    selections: {
      people: "5-diverse-group",
      "shot-type": "street-editorial-wide",
      service: "click-collect",
      mood: "effortless-belonging",
      city: "munich-viktualienmarkt",
      camera: "hasselblad-38mm",
      light: "bright-overcast",
      angle: "low-angle-hip",
      "bace-hub": "standard-hub",
    },
  },
  {
    id: "preset-morning-commute",
    label: "#2 Morning Commute",
    description: "Hamburg HafenCity, 3 professionals, quiet efficiency",
    selections: {
      people: "3-young-professionals",
      "shot-type": "overhead-elevated",
      service: "click-collect",
      mood: "quiet-morning-efficiency",
      city: "hamburg-hafencity",
      camera: "leica-m11-50mm",
      light: "cloudy-bright",
      angle: "elevated-30-down",
      "bace-hub": "standard-hub",
    },
  },
  {
    id: "preset-local-discovery",
    label: "#3 Instant Buy: Local Discovery",
    description: "Cologne Belgisches Viertel, 2 women, delighted surprise",
    selections: {
      people: "2-women-friends",
      "shot-type": "through-window-layer",
      service: "instant-buy",
      mood: "delighted-surprise",
      city: "cologne-belgisches-viertel",
      camera: "leica-q3-28mm",
      light: "open-shade",
      angle: "through-shop-window",
      "bace-hub": "standard-hub",
    },
  },
  {
    id: "preset-raffle-win",
    label: "#4 Raffle Win: Celebration",
    description: "Berlin Kreuzberg, 3 friends, explosive surprise",
    selections: {
      people: "3-friends-celebration",
      "shot-type": "street-editorial-wide",
      service: "raffle-drop",
      mood: "explosive-surprise",
      city: "berlin-kreuzberg",
      camera: "leica-m11-35mm",
      light: "direct-midday",
      angle: "dutch-tilt-15",
      "bace-hub": "standard-hub",
    },
  },
  {
    id: "preset-office-break",
    label: "#5 Office Break: Lunch Pickup",
    description: "Munich Werksviertel, 3 co-workers, calm efficiency",
    selections: {
      people: "3-young-professionals",
      "shot-type": "street-editorial-wide",
      service: "click-collect",
      mood: "calm-efficiency",
      city: "munich-werksviertel",
      camera: "hasselblad-55mm",
      light: "bright-overcast",
      angle: "dead-center-symmetry",
      "bace-hub": "standard-hub",
    },
  },
  {
    id: "preset-qr-detail",
    label: "#13 QR Scan: Hands Close-Up",
    description: "Hamburg Schanzenviertel, extreme close-up, quiet satisfaction",
    selections: {
      people: "solo-man",
      "shot-type": "close-up-hands-detail",
      service: "qr-scan-pickup",
      mood: "private-contentment",
      city: "hamburg-schanzenviertel",
      camera: "hasselblad-90mm",
      light: "bright-overcast",
      angle: "over-shoulder",
      "bace-hub": "hub-close-up",
    },
  },
  {
    id: "preset-solo-woman",
    label: "#14 Good Morning Pickup",
    description: "Hamburg, solo woman, private contentment",
    selections: {
      people: "solo-woman",
      "shot-type": "environmental-portrait",
      service: "click-collect",
      mood: "private-contentment",
      city: "hamburg-hafencity",
      camera: "hasselblad-90mm",
      light: "cloudy-bright",
      angle: "over-shoulder",
      "bace-hub": "standard-hub",
    },
  },
  {
    id: "preset-man-dog",
    label: "#16 Dog Walk Detour",
    description: "Munich Glockenbach, man + dog, gentle routine",
    selections: {
      people: "man-and-dog",
      "shot-type": "environmental-portrait",
      service: "click-collect",
      mood: "private-contentment",
      city: "munich-glockenbach",
      camera: "fuji-gfx-80mm",
      light: "direct-midday",
      angle: "eye-level-off-center",
      "bace-hub": "standard-hub",
    },
  },
  {
    id: "preset-walk-away",
    label: "#24 The Walk-Away",
    description: "Berlin Friedrichshain, 2 friends walking away, forward momentum",
    selections: {
      people: "2-women-friends",
      "shot-type": "walk-away-back-view",
      service: "click-collect",
      mood: "effortless-belonging",
      city: "berlin-friedrichshain",
      camera: "fuji-gfx-80mm",
      light: "backlit-sun",
      angle: "eye-level-off-center",
      "bace-hub": "standard-hub",
    },
  },
  {
    id: "preset-rent-borrow",
    label: "#9 Rent: Borrow, Don't Buy",
    description: "Munich Schwabing, 3 young people, post-rain puddle",
    selections: {
      people: "3-friends-celebration",
      "shot-type": "street-editorial-wide",
      service: "rent-service",
      mood: "effortless-belonging",
      city: "munich-viktualienmarkt",
      camera: "hasselblad-90mm",
      light: "post-rain",
      angle: "low-angle-hip",
      "bace-hub": "standard-hub",
    },
  },
];
