import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "GOOGLE_GEMINI_API_KEY not configured. Add it to .env.local" },
      { status: 500 }
    );
  }

  try {
    const { prompt } = await request.json();
    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "A prompt is required" },
        { status: 400 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });

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
          contents: prompt,
          config: {
            responseModalities: ["Text", "Image"],
          },
        });

        const parts = response.candidates?.[0]?.content?.parts;
        if (!parts) continue;

        let imageBase64: string | null = null;
        let mimeType: string = "image/png";
        let text: string | null = null;

        for (const part of parts) {
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
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Image generation error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
