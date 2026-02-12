import { NextRequest } from "next/server";
import { getGlobalAIProvider } from "@/lib/ai/factory";
import { checkRateLimit, getClientIP, createRateLimitHeaders, trackActiveRequest, createRateLimitErrorResponse } from "@/lib/rate-limit";

// Strict rate limit: 5 requests per minute per IP, max 1 concurrent
const RATE_LIMIT_OPTIONS = {
  maxRequests: 5,
  windowMs: 60 * 1000,
  maxConcurrent: 1,
  minIntervalMs: 3000,
};

export async function POST(req: NextRequest) {
  const clientIP = getClientIP(req);
  const identifier = `tarot:${clientIP}`;

  try {
    const rateLimitResult = checkRateLimit(identifier, RATE_LIMIT_OPTIONS);

    if (!rateLimitResult.allowed) {
      return createRateLimitErrorResponse(rateLimitResult);
    }

    const { prompt, systemPrompt } = await req.json();

    if (!prompt) {
      return Response.json({ error: "Prompt is required" }, { status: 400 });
    }

    trackActiveRequest(identifier, true);

    const provider = getGlobalAIProvider();
    const stream = await provider.streamCompletion(prompt, {
      systemPrompt: systemPrompt || "你是一位资深的塔罗牌解读师。",
      temperature: 0.7,
      maxTokens: 2500,
    });

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
    console.error("Tarot API error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return Response.json({ error: message }, { status: 500 });
  } finally {
    trackActiveRequest(identifier, false);
  }
}
