# BACE Logistic Hub Regensburg — Master Prompts for Nano Banana 2

Updated: 2026-03-30 (v4 — hardened after generation test)
Model: Nano Banana 2 (FAL.ai) with reference image upload
Aspect: 21:9 or 16:9, 4K

---

## CRITICAL RULES FOR ALL PROMPTS

### COLOR — NON-NEGOTIABLE
Every built module (hub, containers, bike boxes, cargo bike boxes, trailer) is **DARK anthracite charcoal grey, RAL DB703 Eisenglimmer matte finish** (Hex #4A4A4A). NOT black. NOT light grey. NOT silver. NOT metallic. Dark warm charcoal with subtle iron mica texture. This applies to ALL modules including any mobileHub visible inside vehicles.

### REFERENCE IMAGE PRESERVATION
When reference images of products are uploaded, the AI must reproduce their EXACT geometry, proportions, surface detail, and form. Do NOT redesign, stylize, or reinterpret the products. Place them into the scene AS-IS.

### NO BRANDING — ZERO TOLERANCE
No logos, no text, no brand names, no icons, no pictograms, no bicycle symbols, no graphics of any kind on any surface. All modules are clean, completely blank, anonymous industrial objects. Surfaces are plain RAL DB703 charcoal grey with no markings whatsoever.

### UNIFORM IMAGE QUALITY
Sharp focus and consistent exposure across the ENTIRE scene, foreground to background. No blur, no distortion, no exposure variation on distant objects. Every element rendered at equal quality regardless of distance from camera. This is a flat, evenly-lit architectural rendering — not a photograph with depth-of-field.

---

## CORRECTION CHECKLIST (v4)

| # | What | Correction | Verify |
|---|------|-----------|--------|
| 1 | Parking signs | **PARKVERBOT**: round white sign, red border, **SINGLE** red diagonal stripe from bottom-left to top-right. NOT Halteverbot (which has TWO crossing stripes forming an X). NOT a crossed-out circle | Single diagonal stripe only |
| 2 | Charging station | ONE dual-point charger, CENTERED between both CarSharing parking spots | Pillar centered, two cables |
| 3 | Street sign | At CORNER of intersection, proper height, OFF the tactile strip | Not on tactile pavement |
| 4 | bacehub | UNDER 240cm total height incl. roof/solar. Digital screen on one side | Compact, screen visible |
| 5 | Digital screen | Shows a **neutral, muted UI** — dark background with simple white/grey interface elements. NOT holographic, NOT iridescent, NOT colorful gradients | Subdued screen, no flashy colors |
| 6 | BikeBox closed | Keep as-is, good. NO icons or bicycle symbols on surface | Plain charcoal box, matches reference |
| 7 | Open bike shelter | **DOES NOT EXIST IN THIS SCENE**. There is NO roofed canopy, NO metal shelter structure, NO solar panel covered bike parking. This element has been permanently removed | Zero shelter structures visible |
| 8 | Micro mobility | **NO roof, NO canopy, NO shelter of any kind above them**. Scooters and shared bikes stand outdoors in a MARKED GEOFENCE AREA — visible painted lines or paved boundary on the ground | Geofence lines on ground, open sky above scooters |
| 9 | mobileHub uniformity | ALL containers IDENTICAL. Visible handle. RAL DB703 | Clones, correct color |
| 10 | mobileHub in truck | Must be **RAL DB703** — same exact color as all other modules | Same charcoal grey, not different |
| 11 | Cargo bike solution | **Cargo bike + mini trailer with mobileHub on trailer**. Larger dimensions. Zemmi/VEMO solution. The trailer is a small single-axle flatbed attached behind the cargo bike | Trailer visibly attached behind bike, container on trailer |
| 12 | Cargo bike riders | Wear **civilian clothes** (jeans, jacket, normal street wear). NO hi-vis vests, NO safety gear, NO uniforms | Normal people on bikes |
| 13 | Truck driver | Wears **YELLOW hi-vis vest** (bright lemon yellow, NOT orange, NOT red-orange). Walks TOWARD the hub / cargo bikes, facing LEFT in the scene | Yellow vest, walking toward center |
| 14 | Vehicle parking | Both delivery vehicles parked **orderly, parallel, side by side** within the marked bay. Straight, aligned, realistic | Neat parallel parking |
| 15 | Loading zone | A **clearly marked parking bay with painted white boundary lines** on the street surface (same visual treatment as the blue CarSharing bay). Sized to fit both vehicles parallel | Visible white/blue ground markings |
| 16 | Scene quality | **Uniform sharpness and exposure** across entire image, no distance blur/distortion | Background as sharp as foreground |
| 17 | Surface markings | **No icons, symbols, pictograms, or bicycle graphics** on any module surface. All surfaces are blank | Zero visual markings on any module |

---

## MASTER PROMPT 1 — Full Scene (Primary)

Upload reference images of: bacehub, mobilehub container, cargo bike + trailer, closed BikeBox

```
Photorealistic urban planning visualization, elevated camera angle 30 degrees from above-left, looking down at a city square in Regensburg, Germany. Warm afternoon daylight, natural shadows on cobblestone ground. Background: historic Bavarian old-town facades in sandstone and yellow-ochre, traditional shop awnings, pedestrians.

CRITICAL RENDERING RULES:
1. UNIFORM QUALITY: Every element rendered with equal sharpness and consistent exposure from foreground to background. No depth-of-field blur. No distortion on distant objects. This is a flat architectural rendering, not a photo.
2. COLOR: Every built infrastructure module is RAL DB703 dark anthracite charcoal grey, matte Eisenglimmer finish (hex #4A4A4A). Not black, not silver, not light grey. Dark warm charcoal.
3. ZERO BRANDING: No logos, no text, no icons, no bicycle symbols, no pictograms on any surface. Every module surface is completely plain and blank.

SCENE LAYOUT LEFT TO RIGHT:

LEFT — CARSHARING + EV CHARGING:
Three parked cars along a blue-painted parking bay on the cobblestone street. ONE single charging station pillar CENTERED between the two EV parking spots, with two charging cables reaching to both vehicles. A German PARKVERBOT sign mounted on a post on the SIDEWALK at the REAR END of the blue bay. IMPORTANT: Parkverbot is a round white sign with red border and ONE SINGLE red diagonal stripe going from lower-left to upper-right. It is NOT Halteverbot (which has TWO red stripes forming an X). Only one stripe.

LEFT-CENTER — STREET CORNER:
A street orientation sign on a pole at the CORNER of the intersection, at proper pedestrian height. The sign does NOT stand on the tactile guidance strip. The tactile ground strip for visually impaired people runs along the sidewalk edge, unobstructed.

CENTER — MAIN HUB (use uploaded reference image):
Place the hub module exactly as shown in the reference image. Do NOT redesign its form, doors, proportions, or surface. Reproduce the reference geometry precisely. Color: RAL DB703 anthracite charcoal grey matte. No icons or symbols on any surface — completely blank. TOTAL HEIGHT including roof is UNDER 240 centimeters. On the flat roof: dark photovoltaic solar panels flush with edges. On ONE SIDE of the hub: a vertical digital information screen showing a MUTED, NEUTRAL interface — dark screen background with simple white/grey UI elements. NOT colorful. NOT holographic. NOT iridescent or rainbow-colored. A plain, professional dark-mode digital display. The hub sits directly on cobblestone, no pedestal.

CENTER-GROUND — MOBILE CONTAINERS (use uploaded reference image):
Place 5-6 mobile containers on the ground near the hub. Reproduce the uploaded reference image EXACTLY — same geometry, same proportions, same surface detail. ALL containers are IDENTICAL CLONES of each other, no variation whatsoever. Each has a visible carrying handle on top. Color: RAL DB703 anthracite charcoal grey matte. No markings on surface. No pallets, no dollies.

MID-GROUND — CARGO BIKES WITH TRAILERS (use uploaded reference image):
Two cargo bikes, each with an attached mini single-axle trailer behind it. On each trailer sits one mobileHub container. The trailer is a small flatbed trailer hitched to the rear of the cargo bike. These are full-size urban logistics vehicles — generously proportioned, not toy-sized. Reproduce the uploaded reference EXACTLY — do not redesign the bike, trailer, or container. All module surfaces: RAL DB703 anthracite charcoal grey matte. No markings. One bike+trailer is being ridden by a person in CIVILIAN CLOTHES — normal street clothing like jeans and a jacket, absolutely NO safety vest, NO hi-vis, NO uniform. The second bike+trailer is parked, loaded, ready for departure. Both positioned in the MID-GROUND of the scene, not the foreground.

RIGHT-CENTER — BIKE PARKING + MICRO MOBILITY:
Enclosed BikeBox bicycle parking lockers in a row (RAL DB703 anthracite charcoal grey). Reproduce closed BikeBox from reference exactly. Surfaces are completely BLANK — no bicycle icon, no pictogram, no symbol of any kind.

IMPORTANT — THERE IS NO OPEN BIKE SHELTER IN THIS SCENE. No roofed structure. No canopy. No solar-panel covered shelter. No metal frame shelter. The open shelter has been removed from the concept. It does not exist.

Micro mobility zone: e-scooters and shared bikes parked in an orderly row. They stand OUTDOORS with OPEN SKY above them — no roof, no covering. They are within a clearly MARKED GEOFENCE AREA on the ground surface — visible painted white lines or paved boundary markings forming a rectangle on the cobblestone. Trees remain in their original positions providing natural shade.

FAR RIGHT — DELIVERY VEHICLES + LOADING ZONE:
The loading zone is a clearly MARKED PARKING BAY on the street with visible painted white boundary lines on the road surface (similar in visual treatment to the blue CarSharing bay on the left side). Within this marked bay: a white 3.5-ton delivery van and a larger delivery truck, parked NEATLY SIDE BY SIDE, PARALLEL to each other and to the curb. Straight, aligned, orderly — like real vehicles in a designated loading zone. NOT angled, NOT chaotic, NOT haphazard.

The van's rear ramp/lift platform is lowered. One mobileHub container sits on the lift platform — this container is RAL DB703 anthracite charcoal grey (the CORRECT current color, matching all other modules). The van driver wears a BRIGHT YELLOW hi-vis safety vest — lemon yellow, NOT orange, NOT red-orange. The driver is walking TOWARD the hub and cargo bikes (facing LEFT in the scene), not walking away toward the right.

A German PARKVERBOT sign (round, white, red border, SINGLE diagonal red stripe — one stripe only, not an X) on a post at one end of the loading bay.

QUALITY: Professional architectural visualization for municipal planning documents. Photorealistic rendering. Natural light, realistic shadows, cobblestone texture, authentic German urban context. No advertising aesthetic. Uniform sharpness and exposure across entire scene — every element equally crisp regardless of distance.
```

Aspect: 21:9 ultrawide | Resolution: 4K

---

## MASTER PROMPT 2 — Hub Detail (Close Composition)

Tighter framing, hub-centered. Use when Prompt 1 loses detail.

```
Photorealistic architectural visualization, elevated 30-degree camera angle, centered on an urban logistics hub on a cobblestone square in Regensburg, Germany. Warm afternoon light, long soft shadows. Historic Bavarian sandstone and ochre facades in background.

RENDERING RULES:
1. Uniform sharpness and exposure across the entire image. No blur, no distortion. Every object at equal quality.
2. All built modules: RAL DB703 dark anthracite charcoal grey, matte Eisenglimmer finish (hex #4A4A4A). Not black. Not silver.
3. ZERO markings on any surface — no text, no logos, no icons, no bicycle symbols, no pictograms. Every surface is completely blank.

CENTER — MAIN HUB (preserve uploaded reference exactly):
The hub module reproduced with EXACT geometry from the reference image. Do not redesign. Color: RAL DB703. Total height UNDER 240cm including roof. Roof: flush dark solar panels. One side: vertical digital information screen showing a MUTED dark-mode UI with simple white/grey interface elements — NOT colorful, NOT holographic, NOT iridescent. Sits on cobblestone, no base. All surfaces completely blank, no icons.

AROUND HUB — MOBILE CONTAINERS (preserve uploaded reference exactly):
6-8 containers cloned from the single reference image. EVERY container is an IDENTICAL copy. Same size, same form, same handle position. Zero variation. Color: RAL DB703. No markings. No pallets.

FOREGROUND RIGHT — LOADING ZONE:
A clearly marked parking bay with painted white boundary lines on the street. Two vehicles parked ORDERLY and PARALLEL side by side: a white 3.5t van with rear lift platform lowered, and a larger delivery truck beside it. One mobileHub container (RAL DB703 — same color as all other modules) on the van lift platform. The van driver in a BRIGHT YELLOW hi-vis vest (not orange) walks TOWARD the hub and cargo bikes, facing left. A PARKVERBOT sign (round, white, red border, SINGLE diagonal red stripe — one stripe, not an X) at one end of the bay.

MID-GROUND — CARGO BIKES + TRAILERS (preserve uploaded reference exactly):
Two identical cargo bikes, each towing a mini single-axle trailer with a mobileHub container on the trailer. Full-size logistics proportions. All module surfaces: RAL DB703. No markings. One ridden by a person in CIVILIAN CLOTHES (jeans, jacket — no vest, no uniform) departing from the hub. Second parked, loaded. Positioned behind the hub, not in the foreground.

EDGES — Left: blue CarSharing bay, single dual-point charger CENTERED between two parking spots, PARKVERBOT sign (single stripe) on sidewalk at rear end. Right: enclosed BikeBox lockers only (RAL DB703, blank surfaces, no icons). NO OPEN SHELTER — no roofed structure of any kind. E-scooters in a marked geofence area on the ground (painted boundary lines, open sky, no canopy). Trees in original positions.

CORNER: Street sign at the corner, proper height, not on the tactile ground strip.

STYLE: Municipal planning visualization. Photorealistic. Uniform sharpness. Not commercial.
```

Aspect: 16:9 | Resolution: 4K

---

## MASTER PROMPT 3 — Operational Workflow (Narrative)

Emphasizes the logistics chain: van → hub → cargo bike + trailer.

```
Photorealistic visualization showing an urban micro-logistics workflow on a cobblestone square in Regensburg, Germany. Elevated 30-degree camera angle with slight right bias to capture the full operational chain. Warm afternoon light on historic Bavarian sandstone facades.

RENDERING RULES:
1. Sharp focus and consistent exposure across the ENTIRE image. No depth-of-field blur. Background as crisp as foreground.
2. ALL infrastructure modules: RAL DB703 dark anthracite charcoal grey, matte Eisenglimmer (hex #4A4A4A). Including modules inside vehicles.
3. ZERO markings: No logos, no text, no icons, no bicycle symbols, no pictograms on any surface. All surfaces completely plain and blank.

THE WORKFLOW READS RIGHT TO LEFT:

PHASE 1 — DELIVERY (far right):
A marked loading zone with painted white boundary lines forming a parking bay on the street (same visual language as the blue CarSharing bay). Two delivery vehicles parked NEATLY, PARALLEL, SIDE BY SIDE within the bay — a white 3.5t van and a larger truck, both straight and aligned. The van's rear hydraulic lift platform is lowered. One mobileHub container sits on the lift being unloaded — this container is RAL DB703 anthracite charcoal grey, the SAME color as every other module. Additional mobileHub containers visible inside the truck, also RAL DB703. The van driver wears a BRIGHT YELLOW hi-vis safety vest (lemon yellow — NOT orange, NOT red-orange) and is walking TOWARD the hub and cargo bikes (facing LEFT), not away from the vehicles. A German PARKVERBOT sign at the loading bay end — round, white, red border, ONE SINGLE red diagonal stripe from lower-left to upper-right. Not two stripes, not an X.

PHASE 2 — TRANSFER (center):
Main hub (from uploaded reference, exact geometry preserved, NOT redesigned). RAL DB703. All surfaces blank — no icons. Height under 240cm including rooftop solar panels. Digital screen on one side showing a MUTED dark-mode UI — simple, neutral, NOT colorful or holographic. Around the hub base: 5-6 mobileHub containers, ALL IDENTICAL CLONES from the reference. Same size, same form, same handle. RAL DB703. No markings. No pallets.

PHASE 3 — LAST MILE (mid-ground, moving left):
Two cargo bikes, each towing a mini single-axle trailer carrying a mobileHub container (from uploaded reference, exact geometry preserved). Full-size logistics vehicles, generous proportions. All module surfaces: RAL DB703. No markings. One bike+trailer is ridden by a person in CIVILIAN CLOTHES (normal street clothing — jeans, jacket, no safety vest, no hi-vis, no uniform) departing from the hub. Second bike+trailer parked, loaded and ready. Bikes are in the MID-GROUND, behind the hub, not in the foreground.

SURROUNDING CONTEXT:
Left: Blue CarSharing bay, three parked cars, single dual-point EV charger CENTERED between two spots, PARKVERBOT sign (single stripe) on sidewalk at rear of bay. Street corner: orientation sign at corner, proper height, not on tactile strip.

Right: Enclosed BikeBox lockers only (RAL DB703, completely blank surfaces — no bicycle icon, no symbols). THERE IS NO OPEN BIKE SHELTER IN THIS SCENE — no roofed structure, no canopy, no solar-panel shelter. It has been removed. E-scooters and shared bikes standing in a marked geofence area on the ground — visible painted boundary lines forming a rectangle, open sky above, no roof. Trees in original positions.

RENDERING: Professional planning document quality. Photorealistic, natural light, cobblestone texture, authentic German urban setting. Not an advertisement. Uniform sharpness and exposure — every element equally crisp.
```

Aspect: 16:9 | Resolution: 4K

---

## REFERENCE IMAGE UPLOAD STRATEGY

Upload these reference images alongside the prompt:

| Ref # | What to Upload | Purpose |
|-------|---------------|---------|
| REF-1 | bacehub (the main container/locker module) | Preserves exact product geometry |
| REF-2 | mobilehub (single container unit) | Ensures all clones match the real product |
| REF-3 | Cargo bike + mini trailer (Zemmi/VEMO solution) | Prevents AI from redesigning the bike/trailer |
| REF-4 | Closed BikeBox | Preserves exact locker design |

### Key Instruction to Prepend When Uploading References

Add this line BEFORE any master prompt when including reference images:

```
REFERENCE IMAGES: The uploaded images show the EXACT products to be placed in this scene. Reproduce their geometry, proportions, surface detail, and form PRECISELY. Do not redesign, reinterpret, or stylize them. Do not add any icons, symbols, or pictograms to their surfaces. Only apply RAL DB703 dark anthracite charcoal grey matte color (hex #4A4A4A) to all module surfaces. Place them into the scene exactly as described in the spatial layout below.
```

---

## CHANGE LOG

### v4 (2026-03-30) — Hardened after generation test
Issues found in test output and fixed with stronger language:

| Issue Found | Fix Applied |
|------------|------------|
| Signs rendered as Halteverbot (X / double stripe) | Added explicit description: "ONE SINGLE diagonal stripe from lower-left to upper-right. Not two stripes, not an X" |
| Open bike shelter still appearing | Changed from "removed" to "DOES NOT EXIST IN THIS SCENE" with explicit list of what not to generate |
| Micro mobility still under roof | Added "OUTDOORS with OPEN SKY above them" and emphasized no covering of any kind |
| Bicycle icon on BikeBox surface | Added zero-tolerance: "no icons, no pictograms, no bicycle symbols" repeated throughout |
| Truck driver in orange vest | Specified "BRIGHT YELLOW, lemon yellow — NOT orange, NOT red-orange" |
| Truck driver walking wrong direction | Added "facing LEFT in the scene" for spatial clarity |
| Cargo bikes missing trailers | Expanded trailer description: "mini single-axle flatbed trailer hitched to the rear" |
| Vehicles parked chaotically | Added "SIDE BY SIDE, PARALLEL to each other and to the curb. Straight, aligned" |
| Loading bay unmarked | Added "visible painted white boundary lines on the road surface" |
| Digital screen too flashy/holographic | Specified "MUTED dark-mode UI, simple white/grey elements. NOT colorful, NOT holographic, NOT iridescent" |

### v3 (2026-03-30) — Ruben + Rudolf feedback
| Change | From |
|--------|------|
| Parkverbot not Halteverbot | Rudolf |
| Open BikeBox / shelter removed | Rudolf + Ruben |
| Micro mobility shelter removed | Rudolf |
| Cargo bike = bike + mini trailer | Ruben |
| Cargo bike riders in civilian clothes | Rudolf |
| Truck driver in YELLOW hi-vis | Rudolf |
| MobileHub in truck = RAL DB703 | Ruben |
| Vehicles parked orderly | Rudolf + Ruben |
| Consistent image quality | Ruben |

---

## TROUBLESHOOTING

| Problem | Fix (append to prompt) |
|---------|----------------------|
| Products look redesigned | "Reproduce the reference image products with ZERO modification to their form. Copy them exactly." |
| Color too light / silver | "RAL DB703 is a DARK color, similar to wet asphalt or dark iron. It is NOT silver or medium grey." |
| Color too black | "RAL DB703 is charcoal, NOT pure black. It has warmth and a subtle iron-mica shimmer." |
| Hub too tall | "The hub is compact, no taller than 230cm, approximately chest height on a tall person." |
| Containers not uniform | "Every container is a factory-manufactured clone. Zero variation between units." |
| Bikes in foreground | "Cargo bikes+trailers are in the mid-ground BEHIND the hub. Foreground is reserved for the van loading." |
| Icons/symbols on surfaces | "ZERO markings on any module surface. No bicycle icons, no pictograms, no symbols. Completely blank." |
| Screen too colorful | "The digital screen shows a MUTED dark-mode interface. Dark background, white/grey UI. Not colorful." |
| Open shelter appearing | "There is NO roofed structure in this scene. No canopy, no shelter, no solar-panel roof over bikes or scooters." |
| Wrong sign (X instead of /) | "PARKVERBOT: ONE single diagonal red stripe from bottom-left to top-right. NOT an X, NOT two stripes." |
| Chaotic parking | "Both vehicles PARALLEL, SIDE BY SIDE, straight within the marked bay. Orderly and realistic." |
| Background blurry | "Uniform sharpness. No depth-of-field. Background elements equally crisp as foreground." |
| Driver in orange vest | "YELLOW hi-vis vest. Bright lemon yellow. NOT orange." |
| Riders in safety vests | "Cargo bike riders in CIVILIAN CLOTHES. Jeans, jacket. No vests, no uniforms." |
| Trailer missing on bike | "Each cargo bike tows a mini single-axle trailer behind it with a mobileHub container on top." |
