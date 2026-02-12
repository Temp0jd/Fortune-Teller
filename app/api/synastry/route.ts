import { NextRequest } from "next/server";
import { getGlobalAIProvider } from "@/lib/ai/factory";
import { calculateSynastry } from "@/lib/calculations";
import {
  SYNASTRY_SYSTEM_PROMPT,
  generateSynastryPrompt,
  RelationshipType,
} from "@/lib/prompts/synastry";
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
  const identifier = `synastry:${clientIP}`;

  try {
    const body = await req.json();
    const { date1, date2, type, relationshipType, hour1, hour2, prompt } = body;

    // 如果是AI解读请求（有prompt），需要限流
    if (prompt) {
      const rateLimitResult = checkRateLimit(identifier, RATE_LIMIT_OPTIONS);

      if (!rateLimitResult.allowed) {
        return createRateLimitErrorResponse(rateLimitResult);
      }

      trackActiveRequest(identifier, true);

      try {
        const provider = getGlobalAIProvider();
        const stream = await provider.streamCompletion(prompt, {
          systemPrompt: SYNASTRY_SYSTEM_PROMPT,
        });

        return new Response(stream, {
          headers: createRateLimitHeaders(
            rateLimitResult.remaining,
            rateLimitResult.resetTime,
            RATE_LIMIT_OPTIONS.maxRequests
          ),
        });
      } finally {
        trackActiveRequest(identifier, false);
      }
    }

    // Validate required fields
    if (!date1 || !date2 || !type) {
      return Response.json(
        { error: "Missing required fields: date1, date2, type" },
        { status: 400 }
      );
    }

    // Parse dates
    const birthDate1 = new Date(date1);
    const birthDate2 = new Date(date2);

    if (isNaN(birthDate1.getTime()) || isNaN(birthDate2.getTime())) {
      return Response.json({ error: "Invalid date format" }, { status: 400 });
    }

    // Calculate synastry
    const synastryResult = calculateSynastry(
      birthDate1,
      birthDate2,
      type,
      hour1,
      hour2
    );

    // Generate prompt with calculated data
    const generatedPrompt = generateSynastryPrompt(
      type,
      birthDate1,
      birthDate2,
      relationshipType as RelationshipType,
      synastryResult.zodiac
        ? {
            sign1: synastryResult.zodiac.sign1,
            sign2: synastryResult.zodiac.sign2,
            element1: synastryResult.zodiac.element1,
            element2: synastryResult.zodiac.element2,
            score: synastryResult.zodiac.score,
          }
        : undefined,
      synastryResult.bazi
        ? {
            bazi1: synastryResult.bazi.bazi1,
            bazi2: synastryResult.bazi.bazi2,
            zodiac1: synastryResult.bazi.zodiac1,
            zodiac2: synastryResult.bazi.zodiac2,
            score: synastryResult.bazi.score,
            tianganHe: synastryResult.bazi.tianganHe,
            dizhiHe: synastryResult.bazi.dizhiHe,
            dizhiSanhe: synastryResult.bazi.dizhiSanhe,
            dizhiChong: synastryResult.bazi.dizhiChong,
          }
        : undefined
    );

    // Return both the calculation result and the generated prompt (纯计算，不限流)
    return Response.json({
      success: true,
      data: synastryResult,
      prompt: generatedPrompt,
    });
  } catch (error) {
    console.error("Synastry API error:", error);
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
