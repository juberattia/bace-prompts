import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const contentType = request.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    return NextResponse.json(
      { error: "Content-Type must be application/json" },
      { status: 415 }
    );
  }

  const expectedPassword = process.env.WORKSHOP_PASSWORD;
  const authToken = process.env.WORKSHOP_AUTH_TOKEN;

  if (!expectedPassword || !authToken) {
    console.error("WORKSHOP_PASSWORD or WORKSHOP_AUTH_TOKEN not configured");
    return NextResponse.json(
      { error: "Server configuration error." },
      { status: 500 }
    );
  }

  try {
    const { password } = await request.json();

    if (!password || typeof password !== "string") {
      return NextResponse.json(
        { error: "Password is required" },
        { status: 400 }
      );
    }

    if (password !== expectedPassword) {
      return NextResponse.json(
        { error: "Incorrect password" },
        { status: 401 }
      );
    }

    // Password correct — set auth cookie and redirect
    const response = NextResponse.json({ success: true });

    response.cookies.set("workshop-auth", authToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      // Cookie valid for 7 days
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: "An internal error occurred." },
      { status: 500 }
    );
  }
}
