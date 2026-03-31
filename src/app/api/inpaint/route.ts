import { NextRequest, NextResponse } from "next/server";
import { fal } from "@fal-ai/client";

export const maxDuration = 60;

function dataUrlToBlob(dataUrl: string): Blob {
  const [header, base64] = dataUrl.split(",");
  const mimeMatch = header.match(/data:(.*?);/);
  const mimeType = mimeMatch ? mimeMatch[1] : "image/png";
  const buffer = Buffer.from(base64, "base64");
  return new Blob([buffer], { type: mimeType });
}

export async function POST(request: NextRequest) {
  const falKey = process.env.FAL_KEY;
  if (!falKey) {
    return NextResponse.json(
      { error: "FAL_KEY not configured. Add it to .env.local" },
      { status: 500 }
    );
  }

  fal.config({ credentials: falKey });

  try {
    const {
      imageDataUrl,
      maskDataUrl,
      prompt,
      model,
      strength,
      referenceImageDataUrl,
    } = await request.json();

    if (!imageDataUrl || !maskDataUrl || !prompt) {
      return NextResponse.json(
        { error: "imageDataUrl, maskDataUrl, and prompt are required" },
        { status: 400 }
      );
    }

    // Upload image and mask to FAL storage
    const imageBlob = dataUrlToBlob(imageDataUrl);
    const maskBlob = dataUrlToBlob(maskDataUrl);

    const [imageUrl, maskUrl] = await Promise.all([
      fal.storage.upload(imageBlob),
      fal.storage.upload(maskBlob),
    ]);

    let result;

    if (model === "kontext") {
      // Flux Kontext Inpaint
      const input: Record<string, unknown> = {
        prompt,
        image_url: imageUrl,
        mask_url: maskUrl,
      };
      if (typeof strength === "number") {
        input.strength = strength;
      }
      if (referenceImageDataUrl) {
        const refBlob = dataUrlToBlob(referenceImageDataUrl);
        const refUrl = await fal.storage.upload(refBlob);
        input.reference_image_url = refUrl;
      }

      result = await fal.subscribe("fal-ai/flux-kontext-lora/inpaint" as const, {
        input: input as never,
        logs: true,
      });
    } else {
      // FLUX.1 [dev] Inpainting (default)
      const input: Record<string, unknown> = {
        prompt,
        image_url: imageUrl,
        mask_url: maskUrl,
        strength: typeof strength === "number" ? strength : 0.85,
        num_images: 1,
        output_format: "png",
      };

      result = await fal.subscribe("fal-ai/flux-lora/inpainting" as const, {
        input: input as never,
        logs: true,
      });
    }

    const images = (result.data as { images?: Array<{ url: string }> }).images;
    if (!images || images.length === 0) {
      return NextResponse.json(
        { error: "No image was generated" },
        { status: 500 }
      );
    }

    // Fetch result and convert to base64 data URL
    const imageResponse = await fetch(images[0].url);
    if (!imageResponse.ok) {
      return NextResponse.json(
        { error: "Failed to download generated image" },
        { status: 500 }
      );
    }

    const imageBuffer = await imageResponse.arrayBuffer();
    const base64 = Buffer.from(imageBuffer).toString("base64");
    const contentType =
      imageResponse.headers.get("content-type") || "image/png";

    return NextResponse.json({
      image: `data:${contentType};base64,${base64}`,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    const details =
      err instanceof Error
        ? JSON.stringify(err, Object.getOwnPropertyNames(err))
        : String(err);
    console.error("FAL.ai inpaint error:", message, details);
    return NextResponse.json({ error: message, details }, { status: 500 });
  }
}
