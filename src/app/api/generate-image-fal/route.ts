import { NextRequest, NextResponse } from "next/server";
import { fal } from "@fal-ai/client";

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  const falKey = process.env.FAL_KEY;
  if (!falKey) {
    return NextResponse.json(
      { error: "Server configuration error. Please contact the administrator." },
      { status: 500 }
    );
  }

  // Content-Type validation
  const contentType = request.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    return NextResponse.json(
      { error: "Content-Type must be application/json" },
      { status: 415 }
    );
  }

  // Body size limit: 1MB
  const contentLength = parseInt(request.headers.get("content-length") || "0", 10);
  if (contentLength > 1_000_000) {
    return NextResponse.json(
      { error: "Request body too large" },
      { status: 413 }
    );
  }

  fal.config({ credentials: falKey });

  try {
    const { prompt, aspectRatio, resolution } = await request.json();
    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "A prompt is required" },
        { status: 400 }
      );
    }

    const result = await fal.subscribe("fal-ai/nano-banana-2", {
      input: {
        prompt,
        num_images: 1,
        aspect_ratio: aspectRatio || "1:1",
        resolution: resolution || "1K",
        output_format: "png",
        safety_tolerance: "4",
      },
      logs: true,
    });

    const images = (result.data as { images?: Array<{ url: string }> }).images;
    if (!images || images.length === 0) {
      return NextResponse.json(
        { error: "No image was generated" },
        { status: 500 }
      );
    }

    // Fetch the image URL and convert to base64 data URL for frontend compatibility
    const imageUrl = images[0].url;
    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) {
      return NextResponse.json(
        { error: "Failed to download generated image" },
        { status: 500 }
      );
    }

    const imageBuffer = await imageResponse.arrayBuffer();
    const base64 = Buffer.from(imageBuffer).toString("base64");
    const contentType = imageResponse.headers.get("content-type") || "image/png";

    return NextResponse.json({
      image: `data:${contentType};base64,${base64}`,
    });
  } catch (err: unknown) {
    console.error("FAL.ai generation error:", err instanceof Error ? err.message : err);
    return NextResponse.json(
      { error: "An internal error occurred. Please try again." },
      { status: 500 }
    );
  }
}
