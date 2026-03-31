// ─── BACE Hub Scenes — 24 Master Prompts ────────────────────────────────────

export interface BaceScene {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  category: "lifestyle" | "solo-duo";
  people: string;
  city: string;
  camera: string;
  angle: string;
  light: string;
  mood: string;
  service: string;
  editorial: string;
  aspectRatio: string;
  prompt: string;
}

// ─── Lifestyle Group Scenes (3-6 people) ────────────────────────────────────

const LIFESTYLE_SCENES: BaceScene[] = [
  {
    id: "lifestyle-1",
    number: 1,
    title: "Hero: Community Gathering",
    subtitle: "The ordinary magic of a functioning neighborhood",
    category: "lifestyle",
    people: "5 diverse adults",
    city: "Munich (Viktualienmarkt)",
    camera: "Hasselblad X2D 100C + XCD 38mm f/2.5",
    angle: "Low angle, camera at hip height",
    light: "Bright overcast 5800K",
    mood: "Effortless belonging",
    service: "Click & Collect + Instant Buy",
    editorial: "Cereal Magazine",
    aspectRatio: "16:9",
    prompt: `Effortless belonging atmosphere, the ordinary magic of people who share a place,

Low angle, camera at hip height tilted 10 degrees upward. Hasselblad X2D 100C, XCD 38mm f/2.5, bright overcast daylight — flat diffused light from high white sky creating even illumination with NO harsh shadows, 5800K neutral color temperature. Medium format tonal richness. The hub and people feel monumental from this low perspective.

Position a BACE hub (from uploaded reference — reproduce EXACTLY, light grey metallic, locker grid intact) DIRECTLY on cobblestone at Viktualienmarkt, Munich. NO concrete foundation. NO pedestal. The hub's bottom edge meets the cobblestone surface directly — gaps between hub base and uneven stones visible.

FOREGROUND: Cobblestone surface in sharp focus at the very bottom of frame — individual stones, moss in gaps, a crushed chestnut, a bicycle tire track in morning dew. The ground plane creates a strong leading line to the hub.

MIDGROUND — THE HUB + PEOPLE:
Frame 5 diverse adults (age 25-35) mid-interaction around the hub, seen from slightly below — giving them natural stature. A Black woman with short natural hair, sage-green linen blazer, white sneakers — mid-scan, phone tilted toward QR code, caught between concentration and a breaking half-smile. Shot from below, her jawline catches the diffused overhead light. A Middle Eastern man, short beard, cream knit sweater, dark jeans — mid-laugh, coffee cup tipping in his grip, eyes crinkled, one hand mid-gesture. A South Asian woman, long dark hair, terracotta linen dress, crossbody bag — glancing up from phone mid-step, lips parted, weight shifting forward. A blonde German man, navy tee, olive chinos, canvas tote — mid-pull extracting a package from an open locker, one foot braced against the cobblestone, body leaning back with the pull. An East Asian woman with round glasses, oversized white shirt tucked at front only, bike shorts — one elbow resting on her parked city bike seat, watching the group, quiet closed-lip amusement.

Everyone caught between moments — NOT posed, NOT peak expression. 70% intensity. Bodies asymmetric, weight distributed naturally.

BACKGROUND: Viktualienmarkt stalls soft in Hasselblad medium-format bokeh — characteristic creamy falloff. Heilig-Geist-Kirche tower rising into the white overcast sky. Market shoppers as soft shapes. Traditional Bavarian facades in sandstone and ochre, muted by the overcast light — no warm glow, just honest color.

STRATEGIC IMPERFECTION: Medium format film grain — fine, organic, tactile. Skin pores visible on noses and cheeks — the overcast light reveals texture without flattering. Stray hairs on the Black woman's temple catching what little directional light exists. The Middle Eastern man's sweater has a natural crease at the elbow and slight pilling at the cuff. Coffee cup is a takeaway paper cup with a slight dent. Cobblestone shows genuine wear — a cracked stone, wet patches, a cigarette butt in a gap. One tote bag strap has slipped to the elbow. The overcast sky is NOT pure white — subtle grey gradation. Medium format vignette at corners.

NOT veneer-perfect teeth. NOT airbrushed skin. NOT golden-hour warmth. Real overcast European daylight. Cereal Magazine editorial tone.`,
  },
  {
    id: "lifestyle-2",
    number: 2,
    title: "Shop & Collect: Morning Commute",
    subtitle: "Private ritual in public space",
    category: "lifestyle",
    people: "3 young professionals",
    city: "Hamburg (HafenCity / Speicherstadt)",
    camera: "Leica M11 + Summilux 50mm f/1.4",
    angle: "Elevated from bridge, 30° down",
    light: "Cloudy-bright 6200K",
    mood: "Quiet morning efficiency",
    service: "Click & Collect",
    editorial: "Monocle",
    aspectRatio: "16:9",
    prompt: `Private ritual atmosphere, the focused calm of someone who has optimized their morning,

Elevated angle — camera positioned on a first-floor bridge or balcony, looking down at 30 degrees onto the sidewalk below. Leica M11, Summilux 50mm f/1.4, early morning cloudy-bright light — thin cloud layer diffusing sunlight into soft cool 6200K directional from the east, creating subtle shadows without harshness. Leica rangefinder micro-contrast and 3D pop on the main subject.

Position a BACE hub (from uploaded reference — reproduce EXACTLY) on modern concrete sidewalk in Hamburg HafenCity. NO concrete foundation — hub base meets sidewalk directly, a narrow shadow line where hub meets ground. Seen from above, the hub's flat roof is partially visible — showing its real industrial top surface.

FOREGROUND: The metal railing of the bridge/balcony, slightly out of focus — brushed steel with visible bolts, creating a horizontal band across the top 15% of frame. A pedestrian's hand on the railing, cropped at the wrist, fingers slightly blurred.

MIDGROUND — THE HUB + PEOPLE (seen from above):
Frame 3 young professionals (age 25-32) from this elevated perspective — their shoulders and tops of heads give an intimate, documentary feel. A mixed-race woman (warm brown skin, curly auburn hair in a loose updo — the top of her head shows the hair gathered with a claw clip) in camel wool coat, wide-leg trousers, white leather sneakers — mid-pull extracting a kraft-paper package from an open locker, one earbud in, the white cord visible against her dark collar. Phone tucked in coat pocket, screen glow visible. From above, her shadow stretches left on the concrete.

A South Asian man in navy peacoat — mid-stride passing behind the hub, seen from above his shoulder line creates a diagonal through the frame, earbuds in, glancing sideways. A German woman with auburn hair — approaching from the opposite direction, the top of her phone visible as she raises it, mid-step, her crossbody bag swinging with momentum.

BACKGROUND: Speicherstadt red-brick arches seen from this elevated angle create a geometric pattern. Canal water below with cool morning reflections — grey-blue, NOT warm glimmer. Elbphilharmonie angular roofline in soft focus against white-grey sky. Commuters on the canal bridge as small dark shapes.

STRATEGIC IMPERFECTION: Leica film grain — distinctive, slightly contrasty. The elevated angle reveals the messiness of real life: the woman's coat has a lint speck on the shoulder visible from above. The claw clip is slightly crooked. One earbud cord has a small knot. The sidewalk has gum stains and a faded road marking. Hub's roof from above shows minor dust and a dry leaf. Concrete expansion joints are visible. The man's peacoat has a slightly raised collar on one side. Morning cool light means slightly blue skin tones on hands — realistic. A bicycle is locked to a post with a U-lock at an awkward angle.

NOT warm. NOT cozy. Cool, efficient, minimal. The Monocle Magazine commuter. Natural imperfections throughout.`,
  },
  {
    id: "lifestyle-3",
    number: 3,
    title: "Instant Buy: Local Discovery",
    subtitle: "Best-friend energy in passing",
    category: "lifestyle",
    people: "2 women",
    city: "Cologne (Belgisches Viertel)",
    camera: "Leica Q3 (28mm f/1.7 fixed)",
    angle: "Through shop window",
    light: "Open shade 5600K",
    mood: "Delighted surprise",
    service: "Instant Buy",
    editorial: "Apartamento",
    aspectRatio: "4:5",
    prompt: `Delighted surprise atmosphere, the energy of stumbling onto something good,

Shot THROUGH a shop window from inside — the glass creates a layer of interior reflections (shelving, a hanging plant, price tags) overlapping the street scene outside. Leica Q3, 28mm f/1.7, subjects in open shade beneath a building overhang, bright overcast sky beyond at 5600K creating a luminous background. The wide 28mm lens pulls in the full street context while maintaining Leica's distinctive micro-contrast and slight barrel distortion at edges.

Position a BACE hub (from uploaded reference — reproduce EXACTLY) on tree-lined sidewalk in Cologne Belgisches Viertel, visible through the shop window. NO concrete foundation — hub base sits directly on pavement, a thin line of shadow beneath. The glass reflection partially overlays the hub, creating a layered editorial effect.

FOREGROUND (inside shop): Faint reflections on the glass — the edge of a wooden shelf, a trailing pothos plant, a hand-written price tag reversed in the reflection. A small "OPEN" sign stuck to the glass with tape, slightly peeling. These interior elements are semi-transparent, ghosting over the street scene.

MIDGROUND — THE HUB + PEOPLE (through glass):
Frame 2 women (age 24-30) mid-discovery at the hub's Instant Buy screen, seen through the shop window. A Black woman with protective braids styled up, oversized vintage cream cardigan falling off one shoulder, straight-leg jeans, New Balance 550s — one finger mid-tap on the hub interface, head tilted, brows lifting in surprise. Her friend, a Turkish-German woman (dark wavy hair, olive skin) in a rust-colored ribbed tank and high-waisted wide-leg pants — leaning in close, chin near her friend's shoulder, face mid-grin, one hand gripping her friend's upper arm. A reusable shopping bag with a baguette tip and celery tops peeking out.

One locker door open. Inside: a craft coffee bag with minimal kraft label.

BACKGROUND (through glass, beyond subjects): Ornate Altbau facades with iron balconies in the open-shade light — honest color, no warm glow. Plane trees with green canopy. A vintage Vespa. The Belgisches Viertel streetscape dissolving into the wide-angle perspective.

STRATEGIC IMPERFECTION: Leica Q3 film grain. The shop window has fingerprints, a small scratch, and a sticker residue mark — these are VISIBLE in the image as textural elements. The glass reflection creates slight double-exposure effect on the subjects' edges. The wide 28mm lens shows subtle barrel distortion at frame edges. The cream cardigan has natural pilling. Baguette is slightly crushed at the tip. One braid has a flyaway. Skin pores visible through the glass — the flat open-shade light reveals texture honestly. Pavement has a crack with a weed. The OPEN sign tape is yellowed.

NOT pretty. GRAPHIC. The window-layer creates an Apartamento Magazine editorial feel — real spaces, real glass, real life. Natural imperfections throughout.`,
  },
  {
    id: "lifestyle-4",
    number: 4,
    title: "Raffle Win: Celebration Moment",
    subtitle: "Explosive genuine surprise between friends",
    category: "lifestyle",
    people: "3 friends",
    city: "Berlin (Kreuzberg / Bergmannkiez)",
    camera: "Leica M11 + Summilux 35mm f/1.4",
    angle: "Dutch tilt 15°",
    light: "Direct midday sun 5400K",
    mood: "Explosive genuine surprise",
    service: "Raffle",
    editorial: "i-D Magazine",
    aspectRatio: "16:9",
    prompt: `Explosive surprise atmosphere, the half-second before full comprehension of winning,

Dutch tilt — camera rotated 15 degrees clockwise creating diagonal energy through the frame. Leica M11, Summilux 35mm f/1.4, direct midday sun at 5400K creating HARD graphic shadows on pavement — sharp-edged shadow shapes of people and hub on the ground. High contrast between sunlit surfaces and deep shadow areas. Leica rangefinder rendering with punchy mid-tones.

Position a BACE hub (from uploaded reference — reproduce EXACTLY) on Bergmannstrasse in Berlin-Kreuzberg. NO concrete foundation — hub sits directly on the asphalt/stone pavement, hard noon shadow beneath it creating a clean dark line. The midday sun hits the hub's light grey metallic surface directly — making it almost glow against the shadowed areas.

FOREGROUND: A hard shadow on the pavement — the geometric shadow shape of a street sign and a bicycle, creating a graphic dark pattern across the bottom of the tilted frame. One shadow merges with a person's shadow.

MIDGROUND — THE HUB + PEOPLE:
Frame 3 friends (age 26-30) in a burst of celebration, the Dutch tilt amplifying their motion energy. An East Asian woman (shoulder-length black hair, blunt bangs mid-swing) in oversized lavender hoodie, black wide-leg trousers, chunky white platform sneakers — mid-thrust lifting a premium product box above her shoulder with one hand, the other gripping her phone, weight shifting to toes, head thrown back mid-laugh, mouth open, eyes squeezed. The midday sun creates a hard shadow of her raised arm on the hub's light grey metallic surface behind her.

A tall Black man (short-cropped hair, sharp jawline lit harshly by overhead sun creating defined cheekbone shadows) in structured olive bomber and black jeans — both arms mid-raise, fingers spread, mid-shout, leaning toward her. A German woman (light brown hair escaping a messy bun, forehead slightly shiny in the direct sun) in striped Breton top and high-waisted jeans — mid-pivot, phone at arm's length recording, one foot off ground, squinting slightly in the bright light.

The hub's open locker frames the empty space where the prize was.

BACKGROUND: Bergmannstrasse at noon — hard shadow bands from building edges cutting across the street at angles enhanced by the Dutch tilt. An independent bookshop's window reflecting white sky. A bar's outdoor chairs, half in sun, half in sharp shadow. Plane trees with bright green canopy against white-blue sky. A cyclist mid-pedal as motion blur on the diagonal.

STRATEGIC IMPERFECTION: Leica film grain — contrasty, punchy. The direct sun is UNFLATTERING in the best way — shows every real texture. Skin shine on all foreheads and noses — the German woman's forehead genuinely glistening. Hard shadows under eyes create slight racoon effect — NOT corrected. Motion blur on the swinging bangs and the recording phone arm. Hoodie wrinkle pattern from being bunched. One sneaker toe cap scuffed. Messy bun has 4-5 strands fully escaped and sunlit. Teeth visible but NOT perfect — natural overlap. Phone screen has a visible crack line. Pavement has gum spots and a faded crosswalk marking. The hard shadow edges are slightly diffused at the furthest points (real sun behavior). Slight chromatic aberration on the high-contrast edges.

NOT golden. NOT warm. HARSH NOON LIGHT. The i-D Magazine energy — direct, raw, young. Natural imperfections throughout.`,
  },
  {
    id: "lifestyle-5",
    number: 5,
    title: "Office Break: Lunch Pickup",
    subtitle: "Design meets function",
    category: "lifestyle",
    people: "3 co-workers",
    city: "Munich (Werksviertel)",
    camera: "Hasselblad X2D 100C + XCD 55mm f/2.5",
    angle: "Dead-center symmetry",
    light: "Bright overcast 6000K + building shade",
    mood: "Calm efficiency",
    service: "Click & Collect",
    editorial: "Cereal Magazine",
    aspectRatio: "16:9",
    prompt: `Calm efficiency atmosphere, the satisfaction of systems that work without friction,

Dead-center straight-on composition — camera perfectly level, hub centered in frame, symmetrical. Hasselblad X2D 100C, XCD 55mm f/2.5, bright overcast daylight at 6000K with subjects in partial building shade creating flat, even, graphic illumination. Medium format's vast tonal range renders both the bright sky reflections and shadow areas with detail. No drama — just clarity.

Position a BACE hub (from uploaded reference — reproduce EXACTLY) centered in frame outside a modern co-working building in Munich Werksviertel. NO concrete foundation — hub sits directly on clean concrete pavement, flush. The symmetrical composition places the hub as the architectural centerline, like a Wes Anderson frame but without the irony.

FOREGROUND: Clean concrete pavement with a subtle grid pattern of expansion joints — geometric, graphic. A dropped receipt and a leaf. The ground plane is nearly empty, emphasizing the graphic symmetry.

MIDGROUND — THE HUB + PEOPLE (asymmetric within the symmetric frame):
Frame 3 co-workers (age 27-35) breaking the symmetry with their organic human presence. A South Asian woman (long dark hair in low ponytail, two face-framing pieces) in structured white blouse, camel tailored trousers, white sneakers — mid-reach into an open locker on the RIGHT side of the hub, body creating an asymmetric break in the centered composition. Her weight on one leg, the other knee bent. She is mid-extraction of a paper meal-prep bag.

A German man (light brown hair, two-day stubble) in charcoal merino crew-neck and dark jeans — positioned LEFT of hub, leaning one hip against the hub's side, mid-bite from a meal container balanced on his palm, phone in other hand, thumb mid-scroll. His body mirrors the South Asian woman's position on the opposite side — near-symmetry broken by their different poses.

A Black woman (TWA, small gold studs) in sage relaxed-fit blazer over white tee, wide-leg linen pants — approaching from the RIGHT edge of frame, mid-stride, laptop bag strap across chest, one hand raised in a low wave. She breaks the right edge of the symmetric composition.

BACKGROUND: Werksviertel's converted industrial facades — SYMMETRICAL architecture mirroring the composition. A large factory wall with a grid of windows, modern glass inserts reflecting the white sky. Two identical young trees flanking the building entrance. The geometric order of the architecture contrasts with the organic human movement.

STRATEGIC IMPERFECTION: Hasselblad medium format grain — almost invisible but present as texture. The flat overcast light reveals EVERYTHING — the man's stubble shadow, the woman's blouse crease where it was tucked all morning, the meal container's condensation marks. Skin has a cool, honest quality in 6000K light — no warmth to hide behind. The concrete has scuff marks from deliveries, a bike-tire mark. One expansion joint has a small weed. The German man's merino shows pilling at the contact points. Meal bag has a grease spot at the bottom. The hub's white surface shows a faint water stain from recent rain. Building windows have varying degrees of cleanliness.

NOT cozy. NOT warm. GRAPHIC and MINIMAL. Cereal Magazine architectural photography with people. Natural imperfections throughout.`,
  },
  {
    id: "lifestyle-6",
    number: 6,
    title: "Mobility Station: Bike + Hub",
    subtitle: "Bodies and machines in motion",
    category: "lifestyle",
    people: "4 people",
    city: "Hamburg (Alster / Rotherbaum)",
    camera: "Leica Q3 (28mm f/1.7 fixed)",
    angle: "Ground level, camera on pavement",
    light: "Direct morning sun 5200K",
    mood: "Urban velocity",
    service: "All Parcel Services",
    editorial: "COLORS Magazine",
    aspectRatio: "16:9",
    prompt: `Urban velocity atmosphere, the kinetic energy of a city waking up and moving,

Ground-level angle — camera placed nearly ON the pavement surface, tilted slightly upward, creating dramatic perspective distortion with the 28mm wide-angle. Leica Q3, 28mm f/1.7, direct low morning sun from the east at 5200K — creating LONG hard shadows stretching toward camera across the pavement. Clean, direct, unstyled light. The ground-level perspective makes bicycle wheels and human legs dominant in the foreground, with the hub rising in the midground.

Position a BACE hub (from uploaded reference — reproduce EXACTLY) at a mobility point near Hamburg Alster lake. NO concrete foundation — hub sits directly on paved surface, from this ground-level angle the gap between hub base and ground is visible, a narrow dark shadow line. The hub TOWERS from this perspective.

FOREGROUND: Pavement surface in extreme close-up detail — asphalt texture, a painted bike-lane marking (faded), a crushed leaf, a dropped metro ticket. A bicycle wheel in sharp focus enters the left side of frame, tire tread detail visible, spokes creating a pattern. A person's ankle and sneaker mid-step enters the right edge.

MIDGROUND — THE HUB + PEOPLE (from ground up):
Frame 4 people (age 25-32) seen from below — their full height emphasized by the low angle. A mixed-race woman (warm brown skin, curly dark hair under a cycling cap) in fitted navy merino zip and black cycling tights — mid-dismount from her city bike, one leg swinging over the saddle, her figure dramatically framed against the bright sky, leaning toward the hub's QR screen with phone extended. From below, her cycling shoes' sole treads are visible.

A German man (sandy hair, wind-ruffled) in moss-green rain jacket and chinos — mid-unlock of an e-scooter next to the hub, seen from below at knee-to-head, his hand reaching down toward the scooter handlebar creates a strong diagonal. A Middle Eastern woman (burnt-orange headscarf, cream trench coat, white sneakers) — mid-approach, shot from ground-level her stride appears powerful and purposeful, the wide angle distorting her leading foot larger. A Black man (short fade, grey cashmere hoodie) settling onto a bench, seen from below the bench's legs and slats frame him.

E-scooters in a row beside the hub — from ground level their wheels and kickstands dominate.

BACKGROUND: Alster lake glimpsed between people's legs and the hub — a horizontal band of grey-blue water. White Jugendstil villa facades rise against the sky. Trees with canopy high above. The sky occupies the top 30% of the frame — partly cloudy, NOT pure blue, with a realistic mix of white and light grey clouds.

STRATEGIC IMPERFECTION: Leica Q3 grain — punchy, contrasty at this ISO. The ground-level perspective reveals what you never see: gum spots on pavement, a tiny puddle in a dip, gravel particles near the curb. The bike-lane paint is genuinely faded and chipped. The cycling cap has a sweat stain at the band. Cycling tights show a chain-oil mark near the right ankle — perfectly visible from this low angle. The scooters are NOT aligned — one leans more than others. Sneaker soles show wear patterns. The bench seat has a carved initial. Wide-angle barrel distortion stretches the frame edges. A pigeon in the mid-background pecking at something.

NOT aspirational. DOCUMENTARY. Street-level truth. The COLORS Magazine perspective — from the ground, where life actually happens. Natural imperfections throughout.`,
  },
  {
    id: "lifestyle-7",
    number: 7,
    title: "24/7 Neighborhood Retail",
    subtitle: "The comfort of familiar places",
    category: "lifestyle",
    people: "4 people + toddler",
    city: "Cologne (Sudstadt / Chlodwigplatz)",
    camera: "Fuji GFX 100S + GF 50mm f/3.5",
    angle: "Through parked car window",
    light: "Mixed 5400K + 3000K shop spill",
    mood: "Neighborhood intimacy",
    service: "Local Shop Extension",
    editorial: "Apartamento",
    aspectRatio: "16:9",
    prompt: `Neighborhood intimacy atmosphere, the feeling of knowing your street by its rhythms,

Shot THROUGH a parked car's open passenger window — the car's interior (dashboard edge, side mirror, a forgotten coffee cup in the holder) creates a dark frame around the bright street scene beyond. Fuji GFX 100S, GF 50mm f/3.5, late afternoon 5400K natural light on the street mixed with warm 3000K light spilling from the adjacent shop window. Medium format tonal richness handles the extreme dynamic range between dark car interior and bright exterior.

Position a BACE hub (from uploaded reference — reproduce EXACTLY) on the residential street in Cologne Sudstadt, seen through the car window. NO concrete foundation — hub sits directly on sidewalk pavers next to a small retail shop. The car window frame creates a natural crop, showing the hub and people as a scene-within-a-scene.

FOREGROUND (car interior): Dark dashboard edge along the bottom. The side mirror reflecting a sliver of the street. A paper coffee cup in the center console holder with a ring stain on the lid. The window frame's rubber seal. A parking ticket tucked behind the windshield wiper, visible at the edge. These elements are slightly soft, creating depth.

MIDGROUND — THE HUB + PEOPLE (through window):
Frame 4 people in a neighborhood evening micro-story. A Turkish-German woman (age 29, dark wavy hair, olive skin) in a camel wrap coat and burgundy knit scarf — mid-reach into a locker, her left hand at her side where a toddler (age 3, puffy jacket, little boots) grips two of her fingers and looks up at her. Her face: closed-lip relief, the expression of not-having-to-go-to-another-store.

A Black man (age 34, close-trimmed beard) in olive field jacket and slim dark jeans — mid-cross of the street toward the hub, tote bag swinging from shoulder. Through the adjacent shop window (warm light from inside): a young German shopkeeper (late 20s, blonde bob, canvas apron) mid-arrange of products on a shelf. An elderly person (wire-rim glasses, wool cardigan) seated at a small cafe table with espresso, watching the street.

BACKGROUND (through car window, beyond subjects): Sudstadt residential facades in honest late-afternoon light — no warm glow, just the natural color of sandstone in diffused light. Severinstorburg medieval tower in distance. Bicycles against iron railings. A corner pub sign. The sky visible between buildings — white-grey with a thin blue break.

STRATEGIC IMPERFECTION: Fuji GFX grain — fine, film-like, organic color rendition. The car window creates a slight color cast from the tinted edge. Dashboard has dust visible in the light. Coffee cup lid has a dried ring. The car's side mirror shows a slightly different angle of the scene — a layered perspective. The wrap coat drapes asymmetrically. Toddler's jacket zipper is askew. The shop window has a fingerprint and a faded "Closed" sign. The espresso saucer has a brown ring. Cobblestone gaps have dried leaves. The tote bag shows sun-fade. Through-window framing creates slight focus shift between car interior and street scene.

NOT a lifestyle ad. NOT warm and fuzzy. INTIMATE and REAL — like catching a neighborhood scene from a car while waiting for someone. Apartamento Magazine lived-in quality. Natural imperfections throughout.`,
  },
  {
    id: "lifestyle-8",
    number: 8,
    title: "Sustainability: Consolidated Delivery",
    subtitle: "The logic of a better system",
    category: "lifestyle",
    people: "5 diverse adults",
    city: "Berlin (Prenzlauer Berg / Kollwitzplatz)",
    camera: "Leica SL2-S + Summicron 35mm f/2",
    angle: "High angle from 2nd floor, 45° down",
    light: "Cloudy-bright 5800K",
    mood: "Bright urban clarity",
    service: "One Delivery + Returns",
    editorial: "Monocle",
    aspectRatio: "16:9",
    prompt: `Urban clarity atmosphere, the quiet logic of a system that just makes sense,

High angle — camera positioned at second-floor window or balcony, looking down at 45 degrees onto Kollwitzplatz below. Leica SL2-S, Summicron 35mm f/2, cloudy-bright midday at 5800K — high thin clouds creating soft even illumination, luminous white sky. Clinical Leica sharpness with organic Summicron falloff. The elevated angle reveals the SPATIAL relationship between hub, people, and neighborhood.

Position a BACE hub (from uploaded reference — reproduce EXACTLY) on Kollwitzplatz in Berlin-Prenzlauer Berg, seen from above. NO concrete foundation — from this angle, the hub sits directly on the square's surface, its rectangular footprint clearly visible against the ground. The hub's flat roof is visible — a real industrial surface.

FOREGROUND: The building's window ledge or balcony railing at the very bottom of frame — a terracotta pot with herbs (someone's kitchen garden), creating a domestic foreground. A clothesline edge with a single hanging towel. The intimate domestic framing contrasts with the public scene below.

MIDGROUND — THE HUB + PEOPLE (from above):
Frame 5 diverse adults (age 26-32) seen from above — their foreshortened figures create a documentary, map-like composition. A German woman (auburn hair with visible freckles — the top-down angle shows her part line and the way her freckled shoulders catch light) in white tee and vintage Levi's 501s — mid-stack of 3 kraft packages, chin on top package, one arm curving around the pile. From above, her shadow pools at her feet.

A Black woman (locs in a high bun — from above, the spiral pattern is visible) in earth-toned linen jumpsuit — mid-place of a return package INTO a locker, body angled, demonstrating two-way function. A South Asian man on a vintage bicycle — one foot down, paused, mid-check of phone, from above the bicycle creates a graphic diamond shape.

A mixed couple mid-walk AWAY from the hub — from above their paired shadows merge. East Asian man in washed black tee, Southern European woman in cream knit top — carrying packages in reusable totes, mid-conversation.

NO delivery vans ANYWHERE in the scene. Clean streets. Bicycles. Reusable bags.

BACKGROUND (from above, spreading outward): Kollwitzplatz's chestnut tree canopies seen from above — dense green with gaps showing the square below. Renovated Altbau rooftops with terracotta tiles and satellite dishes. An organic cafe's outdoor tables — small round shapes with tiny figures. A playground's colorful equipment. The urban grid spreading out in the flat even light.

STRATEGIC IMPERFECTION: Leica SL2-S grain — fine, clinical. The elevated documentary angle shows reality: the rooftops have patchy moss, a gutter with a dead leaf, an antenna slightly bent. The herb pot in the foreground has dry soil and one wilting basil leaf. The Levi's wear lines are visible even from above. The vintage bicycle has surface rust. Reusable totes are faded. Cobblestone has a chalk drawing from children — partially rained away. A pigeon on the edge of a bench. From this height, the hub's roof shows dust, a small puddle from recent rain, a screw visible at one corner. The chestnut canopy has brown-edged leaves (seasonal reality). Window ledge has paint peeling at the corner.

NOT aspirational. SPATIAL AND CLEAR. The Monocle Magazine urban-planning perspective — showing how infrastructure serves life. Natural imperfections throughout.`,
  },
  {
    id: "lifestyle-9",
    number: 9,
    title: "Rent Service: Borrow, Don't Buy",
    subtitle: "A good idea on a regular day",
    category: "lifestyle",
    people: "3 young people",
    city: "Munich (Schwabing / Leopoldstrasse)",
    camera: "Hasselblad X2D 100C + XCD 90mm f/2.5",
    angle: "Low angle with puddle reflection",
    light: "Post-rain 5600K",
    mood: "Effortless spontaneity",
    service: "Rent",
    editorial: "The Gentlewoman",
    aspectRatio: "4:5",
    prompt: `Effortless spontaneity atmosphere, the pleasure of getting exactly what you need without owning it,

Low angle at knee height, aimed partly at a rain puddle on the pavement — the BACE hub and people are visible BOTH directly and REFLECTED in the wet surface, creating a mirrored composition. Hasselblad X2D 100C, XCD 90mm f/2.5, post-rain light — clouds breaking with a bright white area, 5600K, wet surfaces reflecting the luminous sky. Medium format shallow plane of focus isolates the reflection in sharp focus while the real subjects above are also sharp. The wet ground makes everything more graphic.

Position a BACE hub (from uploaded reference — reproduce EXACTLY) on a side street off Leopoldstrasse in Munich-Schwabing. NO concrete foundation — hub sits directly on wet pavement. The puddle sits between camera and hub, reflecting the hub's light grey metallic surface and the people around it. The hub looks crisp and architectural reflected in still water.

FOREGROUND: The puddle surface — still water reflecting a mirror image of the hub and sky. Small ripples at the puddle edge from a recent footstep. A fallen leaf floats at the puddle's periphery. The wet pavement around the puddle has a dark, saturated sheen that makes everything more graphic.

MIDGROUND — THE HUB + PEOPLE:
Frame 3 young people (age 23-26) mid-use of the Rent feature, reflected in the puddle below. A Black woman (short TWA catching diffused sky-light, gold hoop earrings) in oversized beige university sweatshirt with slightly frayed cuffs, black biker shorts, chunky white sneakers (the white sneakers' reflection in the puddle is a key visual element) — mid-lift of a portable Bluetooth speaker from the locker, one hand cradling the bottom, brows just rising in anticipation.

A German man (curly light brown hair, round tortoiseshell glasses) in faded vintage band tee and relaxed chinos with rolled cuff — bracing a picnic blanket under one arm, paper snack bag dangling, other hand mid-tap on phone. His reflection in the puddle shows his entire figure inverted. A Middle Eastern woman (long dark hair, printed midi dress, denim jacket over one arm, sandals) — mid-close of a locker after returning a portable charger, already half-turned to leave, her reflection beginning to stretch in the puddle as she turns.

BACKGROUND: Schwabing's cafes and bookshops in post-rain Hasselblad bokeh — wet leaves on trees glistening, a bookstore's steamed-up window, cyclists on wet roads with tire spray. LMU building in soft focus. The sky: realistic post-rain clouds with one bright break creating the reflected light in the puddle.

STRATEGIC IMPERFECTION: Hasselblad medium format grain — barely visible but adding organic texture to the wet surfaces. The puddle reflection is NOT mirror-perfect — slight ripple distortion, a small leaf disrupting part of the image, puddle edge is irregular (natural, not round). Wet sneakers — the white has absorbed some pavement grime at the sole edge. The sweatshirt has rain-damp marks on the shoulders. Glasses have two visible rain droplets on one lens. The band tee's print is cracked. Wet pavement reveals usually-hidden stains and marks. Rainwater drips from the hub's top edge at one point. A cafe's outdoor chair is still folded from the rain, while the one next to it is optimistically open. The sandals show wet footprints.

NOT cozy. NOT warm. WET AND REAL. The way a city looks 10 minutes after rain — everything sharp, reflective, alive. The Gentlewoman Magazine quality — intelligent, specific, actual. Natural imperfections throughout.`,
  },
  {
    id: "lifestyle-10",
    number: 10,
    title: "Weekend Market Integration",
    subtitle: "The market ecosystem",
    category: "lifestyle",
    people: "6 diverse people",
    city: "Cologne (Ehrenfeld / Venloer Strasse)",
    camera: "Leica M11 + Summilux 35mm f/1.4",
    angle: "From behind hub",
    light: "Direct late-morning sun 5400K",
    mood: "Vibrant abundance",
    service: "Local Shop Extension",
    editorial: "COLORS Magazine",
    aspectRatio: "16:9",
    prompt: `Vibrant abundance atmosphere, the energy of a neighborhood at its most alive,

Camera positioned BEHIND the BACE hub — the hub's rear corner and edge visible as a sharp vertical element on the left 20% of frame, with the market scene spreading out beyond it. Leica M11, Summilux 35mm f/1.4, direct late-morning sun at 5400K from camera-right, market awnings and buildings creating alternating bands of sunlight and shadow across the scene. Leica micro-contrast makes the alternating light feel punchy and alive.

Position a BACE hub (from uploaded reference — reproduce EXACTLY) at the edge of a weekend street market in Cologne-Ehrenfeld. NO concrete foundation — hub sits directly on cobblestone. Camera is BEHIND the hub, so the rear surface of the hub is visible as a structural frame element — showing the hub's back panel, any wiring conduit, the real industrial backside. This angle is unexpected and honest.

FOREGROUND: The hub's rear left corner — sharp, vertical, light grey metallic — acting as a compositional frame. The hub's back surface texture visible at close range: industrial material, mounting hardware, a small ventilation grille. This architectural element anchors the left side while the market scene fills the right 80%.

MIDGROUND — THE MARKET + PEOPLE:
Frame 6 diverse people across the market, with some wrapping around to the hub's visible front side. MAIN GROUP (3) visible at the hub's front edge (camera looking past the hub's corner to see them at the locker face): A Black man (age 28, cream fisherman beanie, olive utility jacket) — mid-receive of a kraft package, both hands on it, tilting to read the label. A Korean-German woman (age 26, straight black hair, small silver hoops) in pastel pink oversized blazer over white tee — one hand mid-scroll on the hub interface, head forward with focused interest. A German woman (age 31, short dark pixie cut, small tattoo behind ear) in burgundy turtleneck and black wide-leg trousers — mid-sip of an oat-milk latte, weight on one hip.

SECONDARY (3, in the market beyond): A Middle Eastern man (structured navy jacket, canvas market bag with vegetable tops) — mid-stride, head turned mid-glance back toward the hub. A mixed-race couple at a flower stall in the mid-background — the woman's voluminous curls and the man's flannel shirt recognizable even at distance.

BACKGROUND: Ehrenfeld street art — a large mural in earthy tones on a side wall, seen from this angle the mural wraps slightly. Mismatched market stall awnings (NOT uniform — every stall different). A record store with vinyl crates outside. Market stalls in alternating sun-and-shadow bands creating rhythm across the scene.

STRATEGIC IMPERFECTION: Leica grain — distinctive, contrasty. Shooting from BEHIND the hub reveals reality: a small cable running from the hub's base, the back panel's industrial mounting bolts, a faded serial number sticker. The fisherman beanie is lopsided. Boot leather has crease lines. The latte cup has a crush dent and the lid is slightly off-center. Cobblestone has scattered produce debris — a trampled herb sprig, a dropped grape. Market awnings have sun-fade marks and one has a small tear repaired with tape. The mural has a small tag in the corner. Direct sun creates hard shadows that slice across people's faces, dividing their features — unflattering but graphically powerful.

Shot from BEHIND makes the hub feel like part of the neighborhood infrastructure, not a hero product. It EXISTS here. COLORS Magazine documentary energy. Natural imperfections throughout.`,
  },
  {
    id: "lifestyle-11",
    number: 11,
    title: "Social Landmark: Meet Me at the BACE",
    subtitle: "The unspoken agreement of a meeting place",
    category: "lifestyle",
    people: "4 friends",
    city: "Berlin (Friedrichshain / Boxhagener Platz)",
    camera: "Fuji GFX 100S + GF 80mm f/1.7",
    angle: "Telephoto from across square",
    light: "Open shade 5600K",
    mood: "Ritual comfort",
    service: "Click & Collect",
    editorial: "The Gentlewoman",
    aspectRatio: "16:9",
    prompt: `Ritual comfort atmosphere, the warmth of always knowing where to find your people,

Long-lens telephoto compression — camera positioned far across Boxhagener Platz, shooting through layers of distance. Fuji GFX 100S, GF 80mm f/1.7, subjects in the OPEN SHADE beneath plane trees while the background catches direct late-afternoon light at 5600K. The telephoto compression stacks the depth layers — trees, people, hub, buildings — into a dense, layered frame. Medium format at f/1.7 creates an impossibly thin focal plane.

Position a BACE hub (from uploaded reference — reproduce EXACTLY) on Boxhagener Platz in Berlin-Friedrichshain. NO concrete foundation — hub on cobblestone, but from this compressed telephoto distance the base detail is less critical, the hub reads as an object IN the landscape.

FOREGROUND: An OUT-OF-FOCUS pedestrian walking across the square between camera and subjects — their dark silhouetted torso and arm occupying the left 30% of frame as a soft, blurred presence. This passing stranger creates the voyeuristic street-photography feel. A tree trunk soft on the right edge.

MIDGROUND — THE HUB + PEOPLE:
Frame 4 friends (age 25-33) in the thin focal plane — sharp against heavily compressed, stacked background. Shot from this telephoto distance, the interaction feels OBSERVED, not directed — true candid energy.

A South Asian woman (age 27, long dark hair, small nose ring) in a rust-colored silk cami and black wide-leg pants — shoulder blade against the hub's side, mid-laugh with head tilted, iced coffee in a sweating cup. From telephoto distance, her laugh reads as genuine because it's not performing for a close camera.

A white German man (age 30, messy dirty-blonde hair, linen shirt) — facing her, mid-gesture with one hand, slight lean forward. The telephoto flattens the distance between them — they look closer than they are.

A Black woman (age 29, long braids over one shoulder) in emerald wrap top and cream culottes — mid-arrive from the left, arms beginning to open, mid-stride, braids mid-swing. From this distance her movement is a blur of gesture.

An East Asian man (age 32, wire-frame glasses, charcoal blazer over white tee) — at the hub screen, mid-tap, body half-turned, caught between task and conversation.

BACKGROUND: Boxhagener Platz layers COMPRESSED by telephoto — plane tree trunks stacking behind each other. Restaurant facades and outdoor chairs flattened into a pattern. Cyclists as soft shapes passing through the background layer. A dog walker barely discernible. Altbau facades compressed into a flat wall of cream and grey. The scene has the layered density of a Saul Leiter photograph.

STRATEGIC IMPERFECTION: Fuji GFX film-like grain — organic, gentle, with warm-neutral color science. The telephoto compression means small background movements become visible soft blurs — a cyclist, a turning head. The out-of-focus foreground pedestrian's jacket has a visible texture even in blur. The iced coffee cup sweats — water drops catching shade-light. Linen shirt wrinkles naturally. The nose ring reflects a tiny point. Braids show fuzzy edges near the roots. Wire-frame glasses have a lens smudge. The thin focal plane means some people's hands or bags drift slightly OUT of focus even as their faces are sharp — the reality of shooting at f/1.7. Cobblestone through telephoto shows a compressed grid pattern. A flea-market table stacked in background. No perfectly even lighting — dappled tree-shade creates subtle light-dark patches on everyone.

NOT a group portrait. NOT arranged. OBSERVED from a distance. Saul Leiter meets The Gentlewoman. The long lens tells the truth because no one is performing for it. Natural imperfections throughout.`,
  },
  {
    id: "lifestyle-12",
    number: 12,
    title: "QR Scan: The Frictionless Moment",
    subtitle: "Technology disappearing into routine",
    category: "lifestyle",
    people: "1 (hands + jaw only)",
    city: "Hamburg (Schanzenviertel)",
    camera: "Hasselblad X2D 100C + XCD 90mm f/2.5",
    angle: "Extreme close-up, hands only",
    light: "Bright overcast 6000K",
    mood: "Quiet satisfaction",
    service: "The 4-Step Flow",
    editorial: "Documentary",
    aspectRatio: "4:5",
    prompt: `Quiet satisfaction atmosphere, the moment when technology is so seamless it stops being technology,

Extreme close-up — frame TIGHT on hands, phone, and the hub's locker surface. NO full face — only the jaw, chin, and lower cheek of the subject enter the top of frame. Hasselblad X2D 100C, XCD 90mm f/2.5, bright overcast at 6000K — flat, honest, texture-revealing light with no directional bias. Medium format resolves extraordinary detail at this close range — individual skin pores, phone screen pixels, metal locker seam lines.

Position the BACE hub locker face (from uploaded reference — reproduce EXACTLY, locker grid sharp) filling the RIGHT HALF of the frame as a flat surface. The hub's light grey metallic surface acts as a minimalist background. NO concrete foundation visible in this tight crop.

FOREGROUND: The subject's hand — fingers curled around an open locker door edge, pulling. Extreme detail: individual knuckle creases, a short-filed nail, a tiny scar on the index finger, the shadow between fingers. The hand has natural melanin variation, visible tendons, and warm brown skin. Her other hand enters from the left edge gripping an iPhone, its screen casting a cool blue-white glow on the locker surface.

MIDGROUND — THE INTERACTION:
The BACE hub locker grid in SHARP detail — each locker compartment visible with its shadow depth, the metal door edges, the slight variation between closed doors. One locker is open, revealing a kraft-paper package inside — the paper's texture, a minimal stamp label, a small crease. The QR scanner panel is visible. The phone hovers 15cm from the QR code, screen reflected faintly on the hub's surface.

The subject's jaw and chin enter the TOP of frame — warm brown skin with golden undertones, the edge of the jawline, the beginning of a closed-lip smile just at the corner of the mouth. A gold stud earring. The very bottom of an afro curl at the temple. This is ALL we see of the face — the rest is hands and hub surface.

BACKGROUND: Extremely shallow medium-format depth of field — the Schanzenviertel street dissolves into abstract shapes. A colorful facade becomes a wash of pink and sage. A bicycle wheel is a soft circle. A human shape in blur.

STRATEGIC IMPERFECTION: Hasselblad medium format resolves details that smaller sensors cannot — this is CRITICAL. Individual skin pores on knuckles and chin. The phone screen has a hairline crack in the tempered glass protector. A faint finger smudge on the phone's camera lens housing. The locker door has two microscopic scratches near the handle from daily use. The kraft paper has a genuine fold crease and a small dent in the package. The gold stud earring is HANDMADE — slightly imperfect shape, not factory-uniform. One fingernail is shorter than the others. The hub's white surface has a faint water mark from a previous rain. The QR screen has a pixel of dust in one corner. The jawline has a nearly-invisible peach-fuzz catching the flat light.

NOT a tech-product ad. NOT a beauty close-up. ANTHROPOLOGICAL. The way a documentary photographer shoots hands at work — intimate, respectful, revealing. The texture of daily life at maximum resolution. Natural imperfections throughout.`,
  },
];

// ─── Solo & Duo Scenes (1-2 people) ────────────────────────────────────────

const SOLO_DUO_SCENES: BaceScene[] = [
  {
    id: "solo-1",
    number: 1,
    title: "The Good Morning Pickup",
    subtitle: "The luxury of a quiet morning",
    category: "solo-duo",
    people: "1 solo woman",
    city: "Hamburg (Eppendorf)",
    camera: "Hasselblad X2D 100C + XCD 90mm f/2.5",
    angle: "Over-the-shoulder close",
    light: "Cloudy-bright 6200K",
    mood: "Private contentment",
    service: "Shop & Collect",
    editorial: "The Gentlewoman",
    aspectRatio: "4:5",
    prompt: `Private contentment atmosphere, the small luxury of having the city to yourself for five more minutes,

Over-the-shoulder angle — camera positioned behind and slightly above the subject's left shoulder, looking past her neck, the curve of her ear, and loose hair strands toward the open BACE hub locker and her reaching hands. Hasselblad X2D 100C, XCD 90mm f/2.5 at f/2.5, early morning cloudy-bright at 6200K — thin clouds diffusing the rising eastern sun into soft cool directional light. The shallow medium-format focal plane holds her shoulder and hands sharp while her face (seen only in three-quarter profile from behind) softens slightly at the edge of focus.

Position a BACE hub (from uploaded reference — reproduce EXACTLY) on a tree-lined residential sidewalk in Hamburg-Eppendorf. NO concrete foundation — hub sits directly on grey pavement tiles. The quiet Eppendorf morning: a row of white Jugendstil town houses, a bicycle chained to a wrought-iron fence, no traffic. The hub is the only public-facing object on this residential stretch.

FOREGROUND: Her left shoulder and upper arm in soft focus — the fabric texture of a washed navy cotton jacket visible. The edge of her jaw. Two loose strands of hair (dark, wavy, Middle Eastern texture) catching the cool morning light. A small gold hoop earring just entering the frame. This close over-the-shoulder framing creates intimacy — we are right there with her.

MIDGROUND — HER HANDS + THE HUB:
Her right hand mid-reach into the open locker, fingers curving around a small brown paper bag (specialty coffee beans) with a minimal label. Her left hand rests on the open locker door, fingertips pressing the edge. Her nails are short, one with chipped dark nail polish. The locker interior is visible — clean, functional, the bag nestled inside. The adjacent lockers are closed, their grid pattern sharp. The locker panel shows a faint confirmation indicator.

What we see of her: three-quarter back view. Dark wavy hair in a loose low bun with pieces escaped at the nape. The navy cotton jacket collar. The curve of her cheek — and on that cheek, the beginning of a private smile. Not for anyone. Just for the coffee. Just for the morning.

BACKGROUND: Eppendorf's Jugendstil facades in medium-format bokeh — white plaster, ornate window frames, iron balcony railings. A single mature linden tree, leaves slightly moving. An empty residential street stretching into the soft distance. One lit window in an upper floor — someone else is awake. The sky is light grey-blue, luminous, NOT dramatic.

STRATEGIC IMPERFECTION: Hasselblad grain — fine, organic. The over-the-shoulder angle reveals the real back of a real person: a small tag sticking out at the jacket collar. The low bun is imperfect — held by a single hair tie, slightly lopsided, wisps at the nape. The gold hoop earring has a tiny clasp visible. Her fingers show real texture — dry knuckle skin from the morning cold. The paper bag has a natural crease and the label is slightly off-center (handmade by the roaster). The locker interior has a faint scratch on the back wall. The pavement tiles have a gap where moss grows. The bicycle chained to the fence has a slightly flat rear tire. Morning dew on the iron railing.

NOT a product shot. NOT a commercial moment. THE GENTLEWOMAN — a woman in her own world, in her own morning, doing exactly what she wants. Natural imperfections throughout.`,
  },
  {
    id: "solo-2",
    number: 2,
    title: "The Couple's Saturday Errand",
    subtitle: "Saturday lightness",
    category: "solo-duo",
    people: "2 (couple)",
    city: "Berlin (Prenzlauer Berg — Kastanienallee)",
    camera: "Leica Q3 (28mm f/1.7 fixed)",
    angle: "Wide street-level from across street",
    light: "Bright overcast 5800K",
    mood: "Easy companionship",
    service: "All Parcel Services",
    editorial: "i-D Magazine",
    aspectRatio: "16:9",
    prompt: `Easy companionship atmosphere, the lightness of a Saturday with nowhere to rush to,

Wide street-level angle — camera positioned across Kastanienallee at human height, capturing the full sidewalk context. The couple and hub occupy the center-right of frame but at MODEST SCALE — they are 30% of image height, embedded in the streetscape, NOT dominating it. Leica Q3, 28mm f/1.7 at f/4.0, bright overcast midday at 5800K — flat even illumination, luminous white sky filling the top of the wide frame, graphic quality from the absence of directional shadow. The wide 28mm lens pulls in the entire Kastanienallee context — the street, the trees, the buildings — making the couple part of Berlin, not separate from it.

Position a BACE hub (from uploaded reference — reproduce EXACTLY) on the Kastanienallee sidewalk in Berlin-Prenzlauer Berg. NO concrete foundation — hub sits directly on the concrete sidewalk, nestled between a mature chestnut tree and a parked bicycle. From across the street, the hub reads as part of the sidewalk furniture — natural, integrated, belonging.

FOREGROUND: The street surface — Kastanienallee's asphalt with a tram rail embedded, a faded crosswalk marking, a manhole cover. A parked car's rear bumper enters the bottom-left corner. This is the gutter-to-sidewalk view of a real Berlin street.

MIDGROUND — THE HUB + COUPLE:
A mixed couple (both age 28-31) mid-interaction at the hub, seen from across the street as part of the sidewalk scene. She is a Black woman with shoulder-length locs, wearing a cream oversized knit cardigan over a white tee, relaxed straight-leg jeans, and brown leather loafers — mid-tap on the hub's locker panel with one hand, phone in the other, head tilted slightly in concentration, lips pressed in a small focused smile that is about to become a satisfied grin. She just found the confirmation screen.

He is a white German man, sandy stubble, wearing a faded olive field jacket and dark jeans, white sneakers — positioned slightly behind her, already cradling one retrieved kraft package under his left arm, his right hand mid-reach toward a second package she is pulling from the locker for him. He is mid-sentence, mouth slightly open, saying something casual that makes her nose crinkle slightly — a small private joke between them. His body language is relaxed, weight on one hip, comfortable waiting.

From across the street they look like any couple on any Saturday — unremarkable, easy, content. The hub is part of their errand flow, not an event.

BACKGROUND: Kastanienallee's full width — renovated Altbau facades in cream, pale yellow, and light grey rising four stories on both sides. Ground-floor shops: a vintage clothing store, a Spatkauf (corner shop) with crates of bottles outside, a cafe with a single outdoor table. Chestnut trees lining the sidewalk with full canopies. A tram line disappearing into the distance. A few pedestrians: someone mid-walk with a dog far down the sidewalk, a cyclist approaching in the bike lane. The scene is ALIVE but not crowded.

STRATEGIC IMPERFECTION: Leica Q3 grain — punchy, characterful. The 28mm wide-angle shows slight barrel distortion at frame edges — the buildings lean slightly outward. The street surface is genuinely worn — patches, cracks, the tram rail has rust coloring in the groove. The crosswalk markings are faded to 60%. The parked car has a small dent near the taillight. She has a canvas tote slung over one shoulder — slightly faded, a button pin on the strap. His field jacket has a slightly bent collar. The kraft package under his arm is shifting — he is adjusting his grip. Her loafers have natural leather crease lines. The Spatkauf's bottle crates are not neatly stacked. One chestnut tree has a branch pruning scar. A torn event poster on a lamppost. The overcast light flattens everything into honest, equal illumination — no flattery, no drama.

NOT romantic. NOT styled. ORDINARY and GOOD. The way i-D shoots a real couple on a real street. Natural imperfections throughout.`,
  },
  {
    id: "solo-3",
    number: 3,
    title: "The Dog Walk Detour",
    subtitle: "Man-and-dog simplicity",
    category: "solo-duo",
    people: "1 solo man + dog",
    city: "Munich (Glockenbach)",
    camera: "Fuji GFX 100S + GF 80mm f/1.7",
    angle: "Clean side profile",
    light: "Direct midday sun 5400K",
    mood: "Gentle routine",
    service: "Click & Collect",
    editorial: "Cereal Magazine",
    aspectRatio: "4:5",
    prompt: `Gentle routine atmosphere, the uncomplicated pleasure of a man and his dog doing errands,

Clean profile angle — camera placed perfectly perpendicular to the hub's locker face, shooting the subject in exact SIDE PROFILE. Fuji GFX 100S, GF 80mm f/1.7 at f/2.0, direct midday sun from almost directly above at 5400K — creating strong top-down shadows under his brow ridge, nose, and chin. Graphic, sculptural, like a portrait on a coin. The medium format at f/2.0 holds his profile sharp while the hub's locker grid behind him stays detailed and the background falls to creamy Fuji-color bokeh.

Position a BACE hub (from uploaded reference — reproduce EXACTLY) against a building wall on a residential street in Munich-Glockenbach, near the Glockenbach canal. NO concrete foundation — hub sits directly on sidewalk paving stones. The hub's locker face is the BACKGROUND SURFACE — its light grey metallic grid fills the right two-thirds of the frame, the subject's dark profile silhouetted against it.

FOREGROUND: The taut leash — a tan leather leash stretching from the subject's left hand (closest to camera) diagonally DOWN and OUT of frame bottom-left, creating a strong compositional line. The leash leads to a bollard just out of frame where the dog waits. The leash has a slight curve, tension visible. A set of keys hangs from his belt loop, catching a flash of overhead light.

MIDGROUND — THE SUBJECT + HUB:
A South Asian man (age 30, clean-shaven, strong profile — straight nose, defined jaw, thick dark eyebrows) seen in COMPLETE SIDE PROFILE against the hub's white locker grid. He wears a washed black cotton crew-neck tee, relaxed khaki chinos with a slight break at the ankle, and worn-in white Adidas Gazelles. His right hand is mid-pull, extracting a small rectangular box (a book or a vinyl record — something personal) from an open locker at chest height. His left hand grips the dog leash. His expression in profile: closed-lip smile, the corner of his mouth turned up, cheek slightly rounded — the quiet happiness of receiving something you ordered for yourself. His posture is relaxed, one foot slightly forward, weight casual.

The dog is PARTLY visible — just the front half entering the bottom-left corner of frame: a medium-sized mixed breed, tan and white, sitting attentively, ears forward, nose pointed toward him. The leash connects them diagonally across the frame.

BACKGROUND: The hub's locker grid as immediate background — crisp light grey metallic geometric pattern against which his dark profile is graphic. Beyond the hub's edge (left side of frame): Glockenbach streetscape in Fuji bokeh — a canal railing, plane trees with dappled canopy, a pastel-painted building facade, a small bridge. The midday sun creates a bright zone beyond the hub's shade. A distant cyclist.

STRATEGIC IMPERFECTION: Fuji GFX grain — film-like, warm-neutral, organic. The direct overhead sun creates unflattering but REAL shadows — a strong shadow under his brow makes his eyes slightly recessed, a dark triangle under his nose, a chin shadow on his neck. This is NOT fashion lighting — this is noon. His tee shirt has a subtle fade line at the collar from sun exposure. The Gazelles have a scuff on the outer edge and the toe cap has a faint grass stain. His forearm has natural hair catching the sun. The leather leash is worn smooth at the grip point, slightly darker from hand oil. The dog's fur has natural direction changes and one ear is slightly higher than the other. The locker grid behind him has a small fingerprint smudge on one door. The bollard where the leash loops has a sticker remnant scraped half off. Paving stones have one slightly raised — a trip hazard. Keys on belt loop are jumbled, not organized.

NOT posed. NOT styled. SIDE-ON like a documentary portrait — formal framing, informal subject. Cereal Magazine meets street photography. Natural imperfections throughout.`,
  },
  {
    id: "solo-4",
    number: 4,
    title: "The After-Gym Refuel",
    subtitle: "The satisfaction of a body that just worked",
    category: "solo-duo",
    people: "1 solo woman",
    city: "Cologne (Ehrenfeld)",
    camera: "Leica M11 + Summilux 50mm f/1.4",
    angle: "Three-quarter front, below eye level",
    light: "Open shade 5600K",
    mood: "Energized calm",
    service: "Click & Collect",
    editorial: "i-D Magazine",
    aspectRatio: "4:5",
    prompt: `Energized calm atmosphere, the grounded confidence of a body that just did something hard,

Three-quarter front angle, camera positioned at chest height looking slightly UP at the subject — her chin naturally elevated, eye line slightly above camera. Leica M11, Summilux 50mm f/1.4 at f/1.8, subject in open shade beneath a building overhang at 5600K, the background beyond the shade is brighter overcast sky and Ehrenfeld street — creating a natural luminance gradient. Leica rangefinder rendering: punchy micro-contrast on her face, creamy falloff on the background.

Position a BACE hub (from uploaded reference — reproduce EXACTLY) under a building overhang on a side street in Cologne-Ehrenfeld. NO concrete foundation — hub directly on concrete sidewalk. The overhang creates even, flattering open-shade light on the hub and subject while the street beyond is brighter.

FOREGROUND: Her gym bag strap — a black nylon strap cutting diagonally across the bottom-right of frame, slightly out of focus. The strap has a carabiner clipped to it with a water bottle swinging. A rolled yoga mat pokes out of the bag's open top. These elements anchor that she just came from the gym.

MIDGROUND — THE SUBJECT + HUB:
A Black woman (age 27, medium-brown skin with reddish undertones — she is slightly flushed from the workout) with her natural hair pulled back in a high puff secured with a thick black elastic. Small gold stud earrings. She wears a grey marl oversized hoodie (slightly pushed-up sleeves to the elbows, revealing lean forearms), black cycling shorts, and white Nike Air Force 1s with a scuff on the toe box.

She is mid-close of a locker door with her LEFT hand — the package (a small padded mailer, her supplement order) already tucked under her RIGHT arm against her ribcage. Her expression: easy closed-lip smile, cheeks slightly flushed, eyes relaxed, slight squint — the endorphin calm. She has done this pickup many times; there is zero novelty and total ease. She is already thinking about her next task.

The hub's locker grid is partially visible behind her — she stands slightly to the left of the locker face, body angled three-quarters. The locker panel shows a completed-pickup confirmation.

BACKGROUND: Ehrenfeld side street in Leica bokeh — a street art mural (abstract geometric shapes, NOT figurative) on the opposite wall. A parked cargo bike. A corner Spatkauf with a neon "Open" sign. Concrete sidewalk extending toward a busier cross-street where a pedestrian walks. The brighter background beyond the shade overhang creates a luminous glow around the scene edges.

STRATEGIC IMPERFECTION: Leica M11 grain — characterful, slightly contrasty. The post-gym reality: a thin sheen of sweat on her forehead and upper lip catching the even shade-light. Two baby hairs escaped from the puff, stuck slightly to her damp temple. The hoodie has a faint deodorant mark inside the pushed-up sleeve (visible because the sleeve is bunched). Her forearms have a faint goosebump texture from the air hitting post-workout skin. The AF1s have not just a scuff but a slightly yellowed sole from wear. The yoga mat has a small nick in the rolled edge. The padded mailer is slightly dented from shipping. Her gold studs are different sizes — one is 3mm, the other 4mm. The locker door has a small dent near the bottom corner. The concrete under the overhang has a faded chalk hopscotch grid from neighborhood kids. The cargo bike in the background has a cable lock dangling.

NOT a fitness ad. NOT athleisure marketing. A REAL PERSON after real exercise on a real street. i-D Magazine energy — direct, unapologetic, no filter. Natural imperfections throughout.`,
  },
  {
    id: "solo-5",
    number: 5,
    title: "The FaceTime While You Wait",
    subtitle: "A friend's voice makes everything better",
    category: "solo-duo",
    people: "1 solo woman",
    city: "Berlin (Kreuzberg — Oranienstrasse)",
    camera: "Leica SL2-S + Summicron 35mm f/2",
    angle: "Off-axis asymmetric",
    light: "Mixed 5800K + 3200K neon",
    mood: "Unselfconscious laughter",
    service: "All Parcel Services",
    editorial: "COLORS Magazine",
    aspectRatio: "4:5",
    prompt: `Unselfconscious laughter atmosphere, the body language of talking to someone who always makes you laugh,

Slightly off-axis composition — subject positioned on the left third of frame, camera 10 degrees right of center, creating an editorial asymmetry. The hub fills the right side. Leica SL2-S, Summicron 35mm f/2 at f/2.8, mixed light: bright overcast 5800K from above + a warm 3200K neon shop sign spill from camera-left, creating a subtle warm-cool split across her face and the hub surface. Clinical Leica sharpness with natural Summicron rendering.

Position a BACE hub (from uploaded reference — reproduce EXACTLY) against a shop wall on Oranienstrasse in Berlin-Kreuzberg. NO concrete foundation — hub directly on the asphalt sidewalk. The subject leans against the HUB'S SIDE PANEL (not the locker face) — using it as a wall to lean on. The hub is simultaneously infrastructure and informal furniture.

FOREGROUND: A parked bicycle wheel in the bottom-right, spokes creating a geometric pattern against the asphalt. A crumpled flyer on the ground near the bicycle. The sidewalk texture — rough asphalt with a painted bike-lane edge.

MIDGROUND — THE SUBJECT + HUB:
An East Asian woman (age 25, shoulder-length black hair with a natural slight wave, no bangs, hair tucked behind one ear revealing a row of three small ear piercings) leaning her full back and one shoulder blade against the hub's side panel. She wears a vintage-wash oversized denim jacket (sleeves bunched to wrists), a black ribbed tank underneath, wide-leg dark navy trousers, and cream Converse Chuck 70s with slight toe-cap yellowing.

Her RIGHT hand holds her phone at face height in FaceTime position — the screen facing her, the rear camera facing us, showing a small reflection of the street in the phone's camera lens. Her LEFT hand is mid-gesture — fingers spread, palm slightly up, the universal "can you BELIEVE this?" gesture. Her face is mid-laugh — mouth open showing teeth (NOT perfect, slight natural overlap on the bottom row), eyes crinkled to near-closed, nose scrunched, head tilted slightly back against the hub. This is GENUINE laughter, caught mid-convulsion, not a polite smile. Her body weight has shifted — one foot flat, the other heel raised, legs crossed at the ankle. The laugh has made her slump slightly against the hub.

BACKGROUND: Oranienstrasse in evening editorial light — a shop with a warm neon sign casting the 3200K spill (a Turkish grocery or a bar). Graffiti on a doorway. A Doner shop's lit menu board. A couple walking hand-in-hand in soft focus. The mixed Kreuzberg streetscape: Turkish, Arabic, and German shop signs coexisting. A street tree. The overcast sky above Kreuzberg's roofline.

STRATEGIC IMPERFECTION: Leica SL2-S grain — fine, clinical, revealing. The mixed warm/cool light creates a realistic color temperature split — one cheek slightly warmer from the neon, the other cooler from the overcast sky. This is NOT corrected, NOT white-balanced to uniform. The denim jacket has genuine wear — lighter at the elbows, a small fraying thread at the cuff, a barely-visible stain near the pocket. The Converse toe caps have yellowed from wear, not artificially distressed. Her ear piercings include one slightly irritated hole (tiny redness). The phone has a clear case that has yellowed with age. The hub's side panel shows a faint scuff from where someone else leaned before. The asphalt has painted utility markings. The flyer on the ground is rain-wrinkled. A cigarette butt near the bicycle wheel.

NOT a phone ad. NOT a lifestyle shoot. A STREET MOMENT caught by someone with a very good camera. COLORS Magazine humanity — diverse, unposed, alive. Natural imperfections throughout.`,
  },
  {
    id: "solo-6",
    number: 6,
    title: "The Rainy Return",
    subtitle: "Rain doesn't matter when you're still happy",
    category: "solo-duo",
    people: "1 solo man",
    city: "Hamburg (Schanzenviertel)",
    camera: "Hasselblad X2D 100C + XCD 55mm f/2.5",
    angle: "Direct front-facing at eye level",
    light: "Overcast rain 6500K",
    mood: "Post-good-times glow",
    service: "Rent — Return",
    editorial: "Apartamento",
    aspectRatio: "4:5",
    prompt: `Post-good-times glow atmosphere, the warm feeling still radiating from inside even when the outside is grey and wet,

Straight front-facing at eye level — camera directly facing the subject, his eyes looking almost into the lens (but slightly past it, at the locker). Hasselblad X2D 100C, XCD 55mm f/2.5 at f/3.5, overcast rain at 6500K — the coolest, greyest light in this entire set. Flat, directionless, wet. Rain falling as fine mist, barely visible but making everything damp and reflective. Medium format handles the low-contrast scene with tonal richness that prevents it from looking flat.

Position a BACE hub (from uploaded reference — reproduce EXACTLY) on a narrow side street in Hamburg-Schanzenviertel. NO concrete foundation — hub directly on wet cobblestone, small puddles around its base reflecting the light grey of its surface. Rain beads on the hub's exterior — tiny water droplets on the light grey metallic surface.

FOREGROUND: Rain in the air — fine mist visible against the darker background, slightly out of focus, creating a textural veil between camera and subject. A few larger drops caught mid-fall. Wet cobblestone in the very bottom of frame reflecting ambient light.

MIDGROUND — THE SUBJECT + HUB:
A Middle Eastern man (age 29, short dark beard trimmed close, warm olive skin with rain-damp sheen, thick dark eyebrows, brown eyes) in a dark navy waterproof parka with the hood UP — the hood frames his face, shadows inside the hood creating depth. Under the parka: a charcoal crewneck sweater, dark jeans. Black leather Chelsea boots with rain droplets on the toe caps.

He is mid-place of a portable projector (a small black rectangular device) INTO an open locker — his right hand guiding it onto the shelf, his left hand on the locker door ready to close. His expression is the KEY: closed-lip SMILE, genuine, warm, eyes soft and slightly crinkled at the corners. He is still thinking about last night — the movie, the friends, the laughter. The rain doesn't touch his mood. His beard has fine rain mist in it, catching the grey light.

The hub's light grey metallic surface has rain beads and small running water tracks. The locker interior is dry — the contrast between wet exterior and dry interior tells the story of protection.

BACKGROUND: Schanzenviertel in the rain — colorful building facades (teal, dusty pink, cream) made MORE vivid by the wet grey light. Rain-dark cobblestone reflects the building colors as smeared vertical reflections. A red umbrella carried by a pedestrian in the far background is the ONLY color accent beyond the facades. A cafe with steamed-up windows. The narrow street perspective creates depth.

STRATEGIC IMPERFECTION: Hasselblad grain — fine, present as texture in the grey tones. Rain is the dominant imperfection agent: beads on the hub surface are irregular in size and spacing. His hood has one side slightly more forward than the other. Rain has darkened the parka's shoulders more than the chest. His beard has actual mist droplets — 4-5 tiny drops catching light on the chin hairs. The Chelsea boots have water marks where the leather meets the sole. One cobblestone near the hub has a small puddle where the hub's drainage runs. His jeans are damp at the bottom 10cm — rain splash from walking. The projector has a fingerprint smudge on its surface. Inside the locker: dry, clean, a contrast to the wet world outside. The cafe window steam is uneven — thicker where the espresso machine is. The rain creates a slight haziness in the mid-ground, reducing contrast naturally.

NOT melancholy. NOT moody. HAPPY in the rain — the contentment is INSIDE him and no weather can change it. Apartamento Magazine: real weather, real textures, real life. Natural imperfections throughout.`,
  },
  {
    id: "solo-7",
    number: 7,
    title: "The Cargo Bike Stop",
    subtitle: "A life where everything connects",
    category: "solo-duo",
    people: "1 solo woman",
    city: "Munich (Maxvorstadt)",
    camera: "Leica M11 + Summilux 35mm f/1.4",
    angle: "Three-quarter rear",
    light: "Bright cloudy 5600K",
    mood: "Movement paused",
    service: "Click & Collect + Local Shop Extension",
    editorial: "Monocle",
    aspectRatio: "16:9",
    prompt: `Movement paused atmosphere, the satisfaction of a life where everything connects,

Three-quarter rear angle — camera positioned behind the subject and to her right, capturing her back, the cargo bike, and the hub she reaches toward. Her head is turned in three-quarter profile toward the locker. Leica M11, Summilux 35mm f/1.4 at f/2.0, bright cloudy daylight at 5600K — high thin clouds creating luminous even illumination with an occasional brighter area in the cloud layer. The rear angle makes the scene feel OBSERVED, not staged — as if the photographer noticed her from behind and raised the camera.

Position a BACE hub (from uploaded reference — reproduce EXACTLY) on a wide sidewalk in Munich-Maxvorstadt, near the Pinakothek museum area. NO concrete foundation — hub directly on paved sidewalk. The hub is positioned between a tree and a bench, integrated into the sidewalk furniture.

FOREGROUND: The cargo bike's rear wheel and frame — partially in frame on the left side, spokes and gear mechanism in detail, a pannier bag clipped to the rear rack. A bicycle light is mounted to the seatpost. The saddle is slightly worn. These cycling details anchor her identity as someone who lives by bike.

MIDGROUND — THE SUBJECT + HUB:
A Southern European woman (age 31, Mediterranean features — olive skin, dark brown wavy hair in a low messy ponytail, a few loose pieces at the neck, strong arched eyebrows) seen from behind and side. She wears a camel wool overshirt jacket open over a white Breton-stripe tee, dark indigo jeans, and tan suede Chelsea boots. A crossbody canvas bag hangs at her hip.

She is mid-pause on the bike — LEFT foot flat on the ground, RIGHT foot still on the pedal, the bike leaning slightly toward her. Her LEFT hand grips the handlebar for balance. Her RIGHT hand reaches AWAY from the bike toward the hub's open locker — fingers mid-grasp of a paper bag (local bakery sourdough, the bread shape visible through the paper). Her head is turned RIGHT toward the locker — we see her profile: a contented half-smile, eyes on the bread. The turn of her neck shows a delicate gold chain.

The cargo bike's front box is visible — already containing a canvas grocery bag with leafy greens and a small brown package from a previous hub pickup.

BACKGROUND: Maxvorstadt's wide museum-quarter sidewalk — a Pinakothek building's neoclassical facade in luminous grey stone. Mature trees with full canopy. Modern street benches. A tram stop in the distance. A student on a bench reading. The wide sidewalk emphasizes space and calm — this is a neighborhood designed for walking and cycling.

STRATEGIC IMPERFECTION: Leica M11 grain — rangefinder-characteristic, punchy. The rear angle reveals what front angles hide: the wool overshirt has a slight pull at the back seam. Her ponytail elastic is doubled, slightly stretched. The neck chain clasp has migrated to the front — visible as a tiny detail at the side of her neck. The cargo bike frame has a sticker from the bike shop partially peeled. The front box has a scratch on the edge. The pannier bag's clip is slightly crooked. Her suede boots have a rain stain on the left ankle. The bread bag has a small translucent grease spot where the sourdough's crust oil seeps through. A bike bell on the handlebar is slightly rusted. The sidewalk paving has a repair patch — newer, different-colored concrete replacing a damaged section. A pigeon near the bench.

NOT a cycling ad. NOT a lifestyle brand shot. A WOMAN ON A BIKE doing her errands, seen from behind as she passes through. Monocle Magazine functionality — the city working as it should. Natural imperfections throughout.`,
  },
  {
    id: "solo-8",
    number: 8,
    title: "First-Time Friends",
    subtitle: "Showing a friend something that works",
    category: "solo-duo",
    people: "2 friends",
    city: "Cologne (Belgisches Viertel)",
    camera: "Fuji GFX 100S + GF 50mm f/3.5",
    angle: "Wide with 40% negative space",
    light: "Dappled tree shade 5400K",
    mood: "Friendly curiosity",
    service: "Instant Buy",
    editorial: "The Gentlewoman",
    aspectRatio: "16:9",
    prompt: `Friendly curiosity atmosphere, the small thrill of showing someone something that actually works,

Wide composition with deliberate NEGATIVE SPACE — subjects and hub in the right 60% of frame, the left 40% is empty tree-lined sidewalk and Altbau facade, creating editorial breathing room. Fuji GFX 100S, GF 50mm f/3.5 at f/4.0, dappled tree shade — direct midday sun at 5400K filtered through a plane tree's canopy, creating a shifting mosaic of bright spots and leaf-shadow patterns on the subjects, the hub, and the ground. The medium format renders the dappled light beautifully — bright spots slightly blown, shadows richly detailed.

Position a BACE hub (from uploaded reference — reproduce EXACTLY) on a sidewalk in Cologne Belgisches Viertel beneath a plane tree. NO concrete foundation — hub directly on pavement. The tree-shade pattern falls across the hub's light grey metallic surface — a moving graphic of light and shadow.

FOREGROUND: Empty sidewalk stretching left — clean, spacious, a few scattered dry leaves, the shadow of the plane tree trunk creating a strong dark diagonal. A cafe's sandwich board sign at the far left edge, slightly cropped. The empty space is NOT dead — it is compositional rest, editorial luxury.

MIDGROUND — THE TWO FRIENDS + HUB:
TWO women (age 26-29) in a first-time-user teaching moment. The EXPERIENCED friend: a German woman (light-brown skin, mixed heritage, textured curly hair in a high puff, round gold-wire glasses) in a structured oversized white cotton shirt, olive wide-leg trousers, and tan leather slides. She is mid-point at the hub's interface panel — her right index finger extended toward the screen, left hand on her hip, body angled toward her friend. Her expression: the pleasure of explaining — slight raised eyebrows, a "see? easy" smile, head tilted toward the screen.

The NEW friend: a Black woman (dark skin with rich warm undertones, chin-length box braids with blonde tips, small gold nose stud) in a terracotta oversized linen blazer over a black bodysuit, relaxed cream trousers, and white leather platform sandals. She is mid-lean-in toward the screen — her upper body tilted forward, one hand on the hub's edge for balance, eyes WIDENED slightly in the moment of "oh wait, this is actually cool." Her mouth is slightly open — the onset of an impressed laugh. She is genuinely surprised by how simple it is.

The hub's interface panel shows a product browsing layout. One locker is open, demonstrating the system.

BACKGROUND: Belgisches Viertel — ornate Altbau facades with iron balconies and tall windows in cream and pale grey. A boutique shop window with a minimal display. A vintage Vespa parked against the curb. The plane tree's trunk and canopy frame the right side. A pedestrian in the far distance. The dappled shade pattern continues on the building wall — a signature visual element of European tree-lined streets.

STRATEGIC IMPERFECTION: Fuji GFX grain — organic, film-like. The dappled light is the HERO imperfection — it creates uneven, unpredictable illumination: a bright spot on the experienced friend's shoulder, a shadow across the new friend's forehead, a moving pattern on the hub surface that would be "corrected" in a commercial shoot but here gives LIFE. The white cotton shirt has a crease at the elbow from being pushed up. The gold-wire glasses have a tiny reflection of the screen. The linen blazer has natural linen wrinkles (unavoidable, unironed, correct). The blonde braid-tips are slightly uneven — some tips lighter than others. The nose stud catches one dappled light spot. The leather slides show a foot imprint from wear. The platform sandals have a small scuff. The cafe sandwich board is slightly tilted. The Vespa has a helmet hanging from the mirror. A dry leaf is stuck in the plane tree bark. The hub's open locker reveals a slightly dusty interior corner.

NOT a product demonstration. NOT a how-to photo. TWO FRIENDS on a sidewalk, one showing the other something good. The Gentlewoman tone — intelligent women, real interaction, no performance. Natural imperfections throughout.`,
  },
  {
    id: "solo-9",
    number: 9,
    title: "The Headphones-In Routine",
    subtitle: "Zero ceremony, pure flow",
    category: "solo-duo",
    people: "1 solo man",
    city: "Berlin (Mitte — Auguststrasse)",
    camera: "Leica SL2-S + Summicron 50mm f/2",
    angle: "Perpendicular tracking pan",
    light: "Backlit sun 5200K",
    mood: "Flow state",
    service: "Click & Collect",
    editorial: "i-D Magazine",
    aspectRatio: "16:9",
    prompt: `Flow state atmosphere, the efficiency of a routine so smooth it has become invisible,

Perpendicular tracking angle — camera at the subject's left side, perfectly parallel to his direction of motion. Slight horizontal PAN MOTION: the subject is sharp while the background has a 2-3 pixel horizontal motion blur from the camera panning with him. Leica SL2-S, Summicron 50mm f/2 at f/2.5, bright afternoon sun at 5200K from BEHIND the subject, creating a rim-light edge on his hair, shoulders, and left arm while his front is in relative shade — lit by ambient fill from the bright sidewalk and building facades opposite. This backlight-to-frontshade creates depth and dimension.

Position a BACE hub (from uploaded reference — reproduce EXACTLY) on Auguststrasse in Berlin-Mitte, the gallery district. NO concrete foundation — hub on sidewalk pavement. He is captured mid-stride PAST the hub — already extracting a small package from the locker while continuing to walk. He doesn't stop. The hub's locker door is mid-swing from being opened.

FOREGROUND: A gallery's edge — a polished concrete step and the corner of a glass window with a faint exhibition poster reflection, slightly motion-blurred from the pan. Anchors the gallery-district location.

MIDGROUND — THE SUBJECT + HUB:
A Black man (age 28, short fade with a defined line-up, warm dark skin, clean-shaven jawline catching the rim light) in a black structured overshirt jacket, white tee underneath, relaxed dark grey trousers, and off-white New Balance 2002Rs. Over-ear headphones (dark grey, matte, premium — Sony or Bose aesthetic) sit on his head, the band catching a line of backlight.

He is MID-STRIDE — left foot forward, right foot pushing off, body leaning slightly into the walk. His LEFT hand extends back toward the hub's open locker, fingers curving around a small package he is mid-extract — pulling it toward himself as he moves forward. His RIGHT hand is in his trouser pocket, relaxed. His expression: focused-calm half-smile, eyes looking FORWARD (not at the hub), chin slightly up, jaw relaxed. He is listening to something good. The pickup is muscle memory.

The hub is slightly BEHIND him in the frame — he has already passed it, reaching back. The locker door swings on its hinge from being opened. The motion and body language say: this took 4 seconds and he didn't break stride.

BACKGROUND: Auguststrasse in motion-blurred pan — gallery windows with white interiors, the Kunst-Werke building, cobblestone street with the motion blur turning it into horizontal streaks. A tree becomes a vertical green smear. Another pedestrian is a soft shape. The horizontal motion blur transforms the background into an impressionist version of Berlin-Mitte.

STRATEGIC IMPERFECTION: Leica SL2-S grain — clean but present. The PAN MOTION is the key imperfection: the background blur is not perfectly smooth — there is a slight stutter where the photographer adjusted their tracking speed. The rim light catches individual hair follicle texture at the fade-line. The headphone band has a slight mark from repeated wear. The overshirt has a natural fold where it buttons off-center. His trouser pocket has a phone-shaped bulge. The NB 2002Rs have a subtle crease at the toe from walking — visible because the backlighting catches the suede texture. The locker door mid-swing is slightly motion-blurred. The small package is a padded mailer with handwritten addressing. His ear, seen from the side, has natural detail — the tragus, a small mole below the earlobe. The sidewalk in his path has a puddle-stain from a recent street cleaning.

NOT posed. NOT product-interaction. PURE MOTION through a city. The subject barely registers the hub — and that is the point. i-D Magazine: youth, movement, music, city. Natural imperfections throughout.`,
  },
  {
    id: "solo-10",
    number: 10,
    title: "The New Mom's Micro-Errand",
    subtitle: "The quiet triumph of a sleeping baby",
    category: "solo-duo",
    people: "1 woman + infant",
    city: "Hamburg (Winterhude)",
    camera: "Hasselblad X2D 100C + XCD 38mm f/2.5",
    angle: "Front, gentle 10° downward",
    light: "Soft overcast 5800K",
    mood: "Tender efficiency",
    service: "Click & Collect + One Delivery",
    editorial: "The Gentlewoman",
    aspectRatio: "4:5",
    prompt: `Tender efficiency atmosphere, the quiet triumph of a plan that keeps the baby asleep,

Medium front angle, camera slightly above eye level looking gently down at 10 degrees — this subtle downward angle draws the viewer's eye from her face down to the sleeping baby on her chest. Hasselblad X2D 100C, XCD 38mm f/2.5 at f/3.5, soft overcast at 5800K — perfectly even, luminous, shadowless, the gentlest light condition. Medium format resolves both the subject's face and the baby's fine features with extraordinary tonal detail.

Position a BACE hub (from uploaded reference — reproduce EXACTLY) on a residential sidewalk in Hamburg-Winterhude, near the Winterhude canal. NO concrete foundation — hub on clean paving stones, flanked by a mature birch tree. The setting is quiet, residential, family-scaled.

FOREGROUND: A birch tree trunk — white bark with dark markings, slightly soft, entering the left edge of frame. A few birch leaves in the top-left corner, also soft. The tree frames the scene organically and signals "quiet street."

MIDGROUND — THE SUBJECT + BABY + HUB:
A white German woman (age 33, natural light-brown hair in a loose low ponytail, minimal makeup, light freckles across her nose and cheeks, clear skin with the slight fatigue of new-parenthood visible as soft purple-grey under her eyes) wearing a navy Breton-stripe mariniere long-sleeve, high-waisted dark jeans, and white Veja Esplar sneakers. Over the mariniere: a structured baby carrier (charcoal grey fabric, quality brand) holding an INFANT (approx. 4 months, asleep, round cheek pressed against her chest, tiny fist curled near its own face, a small knit hat covering its head). Her chin occasionally dips to check the baby — a reflex.

She is mid-close of a locker door with her RIGHT hand — gentle, measured, trying not to make a loud click. Her LEFT arm cradles the baby carrier's base for support. Under her right arm she has already tucked a padded package (diapers) and a small box (coffee subscription) against her ribcage. Her expression: controlled contentment — a HELD smile, lips pressed together slightly, cheeks slightly raised, eyes soft. She is happy but she is QUIET — everything modulated to not wake the baby. Her movements are careful, deliberate, slow.

The hub's screen shows a completed pickup. One locker still slightly ajar from her retrieval.

BACKGROUND: Winterhude's residential character — a row of 1920s apartment buildings in cream and pale yellow, iron gates with small front gardens. The canal is partially visible between buildings — a horizontal band of grey-green water. A parked bicycle with a child seat on the back (her bicycle, establishing her mode of transport). A neighbor's window with a potted plant. The street is EMPTY — no traffic, no crowds. The quiet is palpable.

STRATEGIC IMPERFECTION: Hasselblad grain — the finest in this set, revealing micro-texture. The soft overcast light reveals everything without dramatizing: the faint purple-grey under her eyes (real exhaustion, NOT concealed), the baby's fine barely-visible hair peeking from the hat edge, the baby carrier's buckle strap slightly twisted at one shoulder. The mariniere has a tiny dried milk stain near the collar (she noticed too late). Her ponytail elastic is wrapped three times, the tail slightly kinked from a previous tighter tie. The Vejas have formula-drip stains on the tongue. The package is slightly crushed from tucking under her arm. The baby's fist has a fine wrinkle pattern — medium format resolves this. The knit hat has a small loose thread. The paving stones have a bicycle-track mark. The birch bark peels slightly at a knot. The child seat on the parked bicycle has a small rain cover bundled untidily. A forgotten pacifier clipped to the baby carrier strap.

NOT a mother-and-baby ad. NOT aspirational parenting. A REAL NEW MOM doing a real errand with real bags under her eyes and a real milk stain. The Gentlewoman: women as they actually are. Natural imperfections throughout.`,
  },
  {
    id: "solo-11",
    number: 11,
    title: "The Vinyl Collector",
    subtitle: "The private thrill of getting the thing you wanted",
    category: "solo-duo",
    people: "1 solo man",
    city: "Cologne (Ehrenfeld)",
    camera: "Leica M11 + Summilux 50mm f/1.4",
    angle: "Tight medium, record as graphic element",
    light: "Overcast 5800K + sun break",
    mood: "Niche joy",
    service: "Local Shop Extension",
    editorial: "Cereal Magazine",
    aspectRatio: "4:5",
    prompt: `Niche joy atmosphere, the private thrill of receiving the exact thing you spent weeks hunting for,

Tight medium framing — cropped from mid-chest to just above the head, leaving no wasted space. The vinyl record held at chest height creates a FLAT GRAPHIC RECTANGLE in the composition, its cover art becoming a design element. Leica M11, Summilux 50mm f/1.4 at f/1.4 wide open, bright overcast at 5800K with one concentrated sun-break beam hitting his hands and the record, creating a natural spotlight effect. The extreme shallow depth of field at f/1.4 makes his face sharp while the hub behind him becomes a soft white plane.

Position a BACE hub (from uploaded reference — reproduce EXACTLY) directly behind the subject — the hub's locker grid visible as a soft light grey metallic geometric pattern filling the background. NO concrete foundation — hub on Ehrenfeld sidewalk. One locker is open — the one he just took the record from.

FOREGROUND: The vinyl record itself — he holds it with BOTH HANDS at chest height, face-out, slightly tilted, the album art visible. His thumbs grip the top edge, fingers underneath. The record is in its shrink-wrap — the cellophane catching and refracting the light beam. The record's edge and his hands are in the critical focus plane.

MIDGROUND — THE SUBJECT:
A white German man (age 27, curly medium-brown hair slightly longer on top, a few days of stubble that is more patchy than intentional, pale-green eyes, thin eyebrows, angular nose) in a washed burgundy crewneck sweatshirt with the sleeves pushed to mid-forearm, revealing a small simple line-drawing tattoo on his inner left forearm. Relaxed dark straight-leg jeans.

His face — IN SHARP FOCUS — tells the story: eyes slightly widened, reading the tracklist on the record's back (his eyes are directed DOWN at the record, not at camera), mouth slightly open in a "yes" expression, the onset of a broad grin pulling at the corners of his mouth. One eyebrow is raised higher than the other. He is tilting the record to catch light on the text. This is a deeply personal, nerdy, specific joy — not performative, not for anyone watching.

BACKGROUND: The hub's locker grid in extreme f/1.4 bokeh — the grey metallic rectangles become soft glowing shapes. The open locker is a darker rectangle with soft edges. Beyond the hub, Ehrenfeld blurs into abstract color: a street art mural becomes a wash of teal and ochre. A shop sign becomes unreadable warm shapes. The Leica bokeh is characteristically smooth with just a hint of swirl at the edges.

STRATEGIC IMPERFECTION: Leica M11 grain — present, characterful, especially in the sweatshirt's dark burgundy tones. The sun-break beam on the record creates a localized warmth on his hands — a REAL natural spotlight, not artificial. His curly hair has individual curls going in different directions, one with a slight knot at the end. The stubble is genuinely patchy — thinner on the cheeks, denser on the chin, a gap below the left sideburn. The sweatshirt is pilled at the ribbed cuff. The tattoo is slightly faded — NOT fresh, a few years old. His fingernails are short, one thumbnail has a tiny hangnail. The vinyl's shrink-wrap has a small tear at one corner where he couldn't resist checking. The record has a price sticker on the cellophane — a small round sticker with hand-written "12,50." The open locker behind him has a small scuff at the base. One curl of his hair crosses his forehead slightly, catching the Leica's micro-contrast.

NOT a record-label promo. NOT a brand lifestyle shot. A GUY who got the record he wanted, looking at it the way collectors look at records. Cereal Magazine specificity — one object, one person, one quiet obsession. Natural imperfections throughout.`,
  },
  {
    id: "solo-12",
    number: 12,
    title: "The Walk-Away",
    subtitle: "The hub succeeds when people walk away from it",
    category: "solo-duo",
    people: "2 friends",
    city: "Berlin (Friedrichshain — Boxhagener Strasse)",
    camera: "Fuji GFX 100S + GF 50mm f/3.5",
    angle: "Backs to camera, walking away",
    light: "Front-lit afternoon sun 5200K",
    mood: "Forward momentum",
    service: "All Parcel Services",
    editorial: "Monocle",
    aspectRatio: "16:9",
    prompt: `Forward momentum atmosphere, the ease of having gotten what you need and heading somewhere good,

Straight back-to-camera angle — both subjects walking AWAY, their backs filling the center of frame, heading down the street TOWARD the sunlight. The hub is BEHIND them (and behind the camera's position), visible in the scene because the camera is positioned between the hub and the departing subjects. Fuji GFX 100S, GF 50mm f/3.5 at f/4.0, direct afternoon sun at 5200K hitting the subjects from AHEAD — they walk into the light, their backs catching sun on shoulders and hair edges, the sidewalk ahead of them bright. The camera is in the hub's shadow zone. This front-lit departure creates an optimistic, forward energy.

Position a BACE hub (from uploaded reference — reproduce EXACTLY) behind the camera position — visible only at the frame EDGES as a blurred grey metallic shape entering the bottom-left corner and a grey reflection in a shop window. NO concrete foundation. The hub is a receding context, not the subject. The subjects are LEAVING it.

FOREGROUND: The hub's presence — a soft grey metallic blur at the very bottom-left of frame (its corner) and its reflection faintly visible in a parked car's window. This minimal presence says "they were just here." A few cobblestones in detail at the very bottom of frame.

MIDGROUND — THE TWO FRIENDS (from behind):
A South Asian woman (age 28, long dark hair loose down her back, swinging slightly with her stride, henna-brown highlights catching the sunlight) and a Black man (age 30, short natural hair, the back of his neck showing a subtle skin-fade line). Both seen from behind, full-length.

SHE wears a cream oversized cotton blazer, a dusty-rose midi skirt, and white leather mules. Her RIGHT hand carries a small paper bag from the hub at her side, swinging with her step. Her LEFT arm is mid-gesture — elbow bent, hand up near her shoulder, making a point in conversation. Her head is tilted slightly toward him — mid-sentence, the motion of her hair confirms she is animated and happy.

HE wears a charcoal cotton overshirt open over a white tee, relaxed olive chinos, and beaten-up tan leather sneakers. His LEFT hand holds a small boxed package from the hub — casually, down at his side. His RIGHT hand is in his pocket. His head tilts slightly toward her — listening, his right shoulder slightly raised in the beginning of a responsive shrug or laugh.

They walk in SYNC — matching stride length, close but not touching, the body language of people comfortable enough to walk at the same pace without trying.

BACKGROUND: Boxhagener Strasse disappearing INTO the afternoon light — the street perspective creates a vanishing point between them. Renovated Altbau facades on both sides catching direct sun, creating warm-colored walls. Plane trees line the street, their canopies creating intermittent shade spots on the sidewalk ahead. Cafe tables in the distance. A cyclist. A street sign. The sidewalk narrows toward the vanishing point, pulling the eye forward with the subjects.

STRATEGIC IMPERFECTION: Fuji GFX grain — film-like, organic, beautiful in the back-lit hair. Shooting backs reveals: her blazer has a small thread pull near the seam. Her midi skirt has a natural linen crinkle at the hem. Her mules show her heel slightly — a realistic fit imperfection. The henna highlights are faded and grown-out — NOT fresh salon color. His overshirt has a wrinkle across the shoulders from how he was seated. His leather sneakers have visible tread wear on the outer sole. His pocket bulges slightly with phone and keys. The package he carries has a small corner dent. Her paper bag has a faded stamp. The cobblestones ahead of them have a repair section — different stone color. A dropped takeaway receipt on the sidewalk. Their paired shadows stretch TOWARD the camera, connecting them to the hub they just left. One plane tree has a low branch they will need to duck under.

NOT looking back. NOT showcasing the hub. WALKING FORWARD — the hub enabled their packages and now they are ON to the next thing. The hub succeeds when people walk away from it. Monocle Magazine: the city working, people moving, life continuing. Natural imperfections throughout.`,
  },
];

// ─── Exports ────────────────────────────────────────────────────────────────

export const ALL_SCENES: BaceScene[] = [...LIFESTYLE_SCENES, ...SOLO_DUO_SCENES];

export function getLifestyleScenes(): BaceScene[] {
  return LIFESTYLE_SCENES;
}

export function getSoloDuoScenes(): BaceScene[] {
  return SOLO_DUO_SCENES;
}

export function getSceneById(id: string): BaceScene | undefined {
  return ALL_SCENES.find((s) => s.id === id);
}
