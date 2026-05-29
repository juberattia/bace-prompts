import { NextRequest, NextResponse } from "next/server";

// --- Rate Limiting (in-memory, works on Vercel serverless) ---
const rateMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 10; // requests per window
const RATE_WINDOW_MS = 60_000; // 1 minute

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT;
}

// --- Bot Blocking ---
const BLOCKED_BOTS = [
  "GPTBot",
  "ChatGPT-User",
  "CCBot",
  "ClaudeBot",
  "Bytespider",
  "PetalBot",
  "Amazonbot",
  "meta-externalagent",
];

function isBlockedBot(ua: string): boolean {
  return BLOCKED_BOTS.some((bot) => ua.includes(bot));
}

// --- Security Headers ---
const securityHeaders: Record<string, string> = {
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy":
    "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
  "Content-Security-Policy":
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; font-src 'self' data:; connect-src 'self' https:; frame-ancestors 'none';",
};

// --- Workshop Password Gate ---
const WORKSHOP_COOKIE = "workshop-auth";

function isWorkshopAuthed(request: NextRequest): boolean {
  const cookie = request.cookies.get(WORKSHOP_COOKIE);
  if (!cookie) return false;

  // Cookie value is an HMAC of the password — if env var changes, old cookies invalidate
  const expectedToken = process.env.WORKSHOP_AUTH_TOKEN;
  if (!expectedToken) return false;

  return cookie.value === expectedToken;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const ua = request.headers.get("user-agent") || "";

  // Block AI scrapers
  if (isBlockedBot(ua)) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  const isApiRoute = pathname.startsWith("/api/");

  // --- Workshop Password Gate ---
  // Protect /workshop but allow /workshop-login through
  if (pathname.startsWith("/workshop") && !pathname.startsWith("/workshop-login")) {
    if (!isWorkshopAuthed(request)) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/workshop-login";
      return NextResponse.redirect(loginUrl);
    }
  }

  // --- API Route Protection ---
  if (isApiRoute) {
    // Allow the workshop-auth endpoint to accept POST without origin checks
    // (it's protected by password validation, not origin)
    const isAuthRoute = pathname === "/api/workshop-auth";

    // Method enforcement: only POST allowed on API routes
    if (request.method !== "POST") {
      return NextResponse.json(
        { error: "Method not allowed" },
        { status: 405 }
      );
    }

    if (!isAuthRoute) {
      // Origin validation: block requests without a valid origin (curl, Postman, external sites)
      const origin = request.headers.get("origin");
      const host = request.headers.get("host");

      if (!origin) {
        return NextResponse.json(
          { error: "Forbidden" },
          { status: 403 }
        );
      }

      // Check origin matches the host (same-site request)
      try {
        const originHost = new URL(origin).host;
        if (originHost !== host) {
          return NextResponse.json(
            { error: "Forbidden" },
            { status: 403 }
          );
        }
      } catch {
        return NextResponse.json(
          { error: "Forbidden" },
          { status: 403 }
        );
      }
    }

    // Rate limiting by IP
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }
  }

  // --- Apply Security Headers to All Responses ---
  const response = NextResponse.next();

  for (const [key, value] of Object.entries(securityHeaders)) {
    response.headers.set(key, value);
  }

  return response;
}

export const config = {
  matcher: [
    // Match all paths except static files and Next.js internals
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2|ttf|eot)).*)",
  ],
};
