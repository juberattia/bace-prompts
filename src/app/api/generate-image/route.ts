import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
  if (!apiKey) {
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

  // Body size limit: 20MB (base64 reference images can be large)
  const contentLength = parseInt(request.headers.get("content-length") || "0", 10);
  if (contentLength > 20_000_000) {
    return NextResponse.json(
      { error: "Request body too large" },
      { status: 413 }
    );
  }

  try {
    const { prompt, referenceImages } = await request.json();
    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "A prompt is required" },
        { status: 400 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });

    // Build multi-part contents: reference images + text prompt
    const contentParts: Array<string | { inlineData: { data: string; mimeType: string } }> = [];

    // Add reference images as inline data parts
    if (Array.isArray(referenceImages)) {
      for (const ref of referenceImages) {
        if (ref?.dataUrl && typeof ref.dataUrl === "string") {
          const match = ref.dataUrl.match(/^data:(image\/[^;]+);base64,(.+)$/);
          if (match) {
            contentParts.push({ inlineData: { data: match[2], mimeType: match[1] } });
          }
        }
      }
    }

    // Add text prompt with reference instruction if images are present
    if (contentParts.length > 0) {
      contentParts.push(
        `Use the reference images above as visual guidance for the product design, shape, branding and proportions. Now generate the following scene:\n\n${prompt}`
      );
    } else {
      contentParts.push(prompt);
    }

    // Try image-capable models in order of preference
    const models = [
      "gemini-2.5-flash-image",
      "gemini-3.1-flash-image-preview",
      "gemini-3-pro-image-preview",
    ];

    let lastError = "";

    for (const model of models) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: contentParts as Parameters<typeof ai.models.generateContent>[0]["contents"],
          config: {
            responseModalities: ["Text", "Image"],
          },
        });

        const responseParts = response.candidates?.[0]?.content?.parts;
        if (!responseParts) continue;

        let imageBase64: string | null = null;
        let mimeType: string = "image/png";
        let text: string | null = null;

        for (const part of responseParts) {
          if (part.text) {
            text = part.text;
          } else if (part.inlineData) {
            imageBase64 = part.inlineData.data ?? null;
            mimeType = part.inlineData.mimeType ?? "image/png";
          }
        }

        if (imageBase64) {
          return NextResponse.json({
            image: `data:${mimeType};base64,${imageBase64}`,
            text,
          });
        }

        if (text) {
          lastError = text;
        }
      } catch (e: unknown) {
        lastError = e instanceof Error ? e.message : "Unknown error";
        continue;
      }
    }

    return NextResponse.json(
      {
        error:
          "Image generation requires a paid Google AI API plan. " +
          "Enable billing at https://ai.dev/projects to use this feature.",
      },
      { status: 402 }
    );
  } catch (err: unknown) {
    console.error("Image generation error:", err instanceof Error ? err.message : err);
    return NextResponse.json(
      { error: "An internal error occurred. Please try again." },
      { status: 500 }
    );
  }
}
