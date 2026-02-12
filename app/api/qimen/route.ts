import { NextRequest } from "next/server";
import { getGlobalAIProvider } from "@/lib/ai/factory";
import { calculateQimen } from "@/lib/calculations/qimen";
import { checkRateLimit, getClientIP, createRateLimitHeaders, trackActiveRequest, createRateLimitErrorResponse } from "@/lib/rate-limit";

// Rate limit for AI interpretation only
const RATE_LIMIT_OPTIONS = {
  maxRequests: 20,
  windowMs: 60 * 1000,
  maxConcurrent: 2,
  minIntervalMs: 5000,
};

export async function POST(req: NextRequest) {
  const clientIP = getClientIP(req);
  const identifier = `qimen:${clientIP}`;

  try {
    const { prompt, date, method, category } = await req.json();

    // 第一步：纯计算起局（不触发AI，不限流）
    let qimenData = null;
    if (date) {
      const calcDate = new Date(date);
      qimenData = calculateQimen(calcDate, method || "chaibu");
    }

    // 纯起局请求，直接返回结果（不限流）
    if (!prompt) {
      return Response.json({ qimen: qimenData });
    }

    // 第二步：AI解读（需要限流）
    const rateLimitResult = checkRateLimit(identifier, RATE_LIMIT_OPTIONS);

    if (!rateLimitResult.allowed) {
      return createRateLimitErrorResponse(rateLimitResult);
    }

    trackActiveRequest(identifier, true);

    const provider = getGlobalAIProvider();
    const categoryPrefix = category ? `【占测类别：${category}】` : "";
    const stream = await provider.streamCompletion(`${categoryPrefix}${prompt}`, {
      systemPrompt: "你是一位奇门遁甲大师。",
    });

    return new Response(stream, {
      headers: createRateLimitHeaders(
        rateLimitResult.remaining,
        rateLimitResult.resetTime,
        RATE_LIMIT_OPTIONS.maxRequests
      ),
    });
  } catch (error) {
    console.error("Qimen API error:", error);
    return Response.json({ error: "API Error" }, { status: 500 });
  } finally {
    trackActiveRequest(identifier, false);
  }
}
