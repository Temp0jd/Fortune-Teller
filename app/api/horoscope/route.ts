import { NextRequest } from "next/server";
import { getGlobalAIProvider } from "@/lib/ai/factory";
import { checkRateLimit, getClientIP, createRateLimitHeaders, trackActiveRequest, createRateLimitErrorResponse } from "@/lib/rate-limit";

// Strict rate limit: 5 requests per minute per IP, max 1 concurrent
const RATE_LIMIT_OPTIONS = {
  maxRequests: 5,
  windowMs: 60 * 1000, // 1 minute
  maxConcurrent: 1,    // Only 1 concurrent request per IP
  minIntervalMs: 3000, // Min 3 seconds between requests
};

export async function POST(req: NextRequest) {
  const clientIP = getClientIP(req);
  const identifier = `horoscope:${clientIP}`;

  try {
    // Check rate limit (includes concurrent and interval checks)
    const rateLimitResult = checkRateLimit(identifier, RATE_LIMIT_OPTIONS);

    if (!rateLimitResult.allowed) {
      return createRateLimitErrorResponse(rateLimitResult);
    }

    const { prompt, systemPrompt } = await req.json();

    if (!prompt) {
      return Response.json({ error: "Prompt is required" }, { status: 400 });
    }

    // Track active request (increment)
    trackActiveRequest(identifier, true);

    const provider = getGlobalAIProvider();
    const stream = await provider.streamCompletion(prompt, {
      systemPrompt:
        systemPrompt ||
        "你是一位专业的星座运势解读师，擅长根据星座特点提供运势分析。语气要积极向上、温暖鼓励。",
      temperature: 0.7,
      maxTokens: 2048,
    });

    // Track active request (decrement) - we'll do this in the finally block
    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
        ...createRateLimitHeaders(
          rateLimitResult.remaining,
          rateLimitResult.resetTime,
          RATE_LIMIT_OPTIONS.maxRequests
        ),
      },
    });
  } catch (error) {
    console.error("Horoscope API error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return Response.json({ error: message }, { status: 500 });
  } finally {
    // Always decrement active request count
    trackActiveRequest(identifier, false);
  }
}
