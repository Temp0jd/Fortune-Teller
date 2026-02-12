import { NextRequest } from "next/server";
import { getGlobalAIProvider } from "@/lib/ai/factory";
import { calculateHuangli } from "@/lib/calculations/huangli";
import { checkRateLimit, getClientIP, createRateLimitHeaders, trackActiveRequest, createRateLimitErrorResponse } from "@/lib/rate-limit";

// Rate limit for AI interpretation only
const RATE_LIMIT_OPTIONS = {
  maxRequests: 20,
  windowMs: 60 * 1000,
  maxConcurrent: 2,
  minIntervalMs: 5000,
};

const HUANGLI_SYSTEM_PROMPT = `你是一位通晓中国传统黄历文化的民俗专家。请根据提供的黄历信息，为用户解读今日的运势和注意事项。

解读要点：
1. 简要介绍今日的整体运势
2. 根据宜忌给出具体建议
3. 提醒需要注意的事项
4. 语言通俗易懂，富有生活气息
5. 保持积极向上的基调`;

export async function POST(req: NextRequest) {
  const clientIP = getClientIP(req);
  const identifier = `huangli:${clientIP}`;

  try {
    const { prompt, date } = await req.json();

    // 第一步：纯计算（不触发AI，不限流）
    let huangliData = null;
    if (date) {
      huangliData = calculateHuangli(new Date(date));
    }

    // 纯查询请求，直接返回结果（不限流）
    if (!prompt) {
      return Response.json({ huangli: huangliData });
    }

    // 第二步：AI解读（需要限流）
    const rateLimitResult = checkRateLimit(identifier, RATE_LIMIT_OPTIONS);

    if (!rateLimitResult.allowed) {
      return createRateLimitErrorResponse(rateLimitResult);
    }

    trackActiveRequest(identifier, true);

    const provider = getGlobalAIProvider();
    const stream = await provider.streamCompletion(prompt, {
      systemPrompt: HUANGLI_SYSTEM_PROMPT,
    });

    return new Response(stream, {
      headers: createRateLimitHeaders(
        rateLimitResult.remaining,
        rateLimitResult.resetTime,
        RATE_LIMIT_OPTIONS.maxRequests
      ),
    });
  } catch (error) {
    console.error("Huangli API error:", error);
    return Response.json({ error: "API Error" }, { status: 500 });
  } finally {
    trackActiveRequest(identifier, false);
  }
}
