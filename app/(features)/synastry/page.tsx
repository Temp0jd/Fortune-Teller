"use client";

import { useState } from "react";
import { Heart, Sparkles, User, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AIInterpretation } from "@/components/features/ai-interpretation";
import { useAIStream } from "@/lib/ai/hooks";
import { DatePicker } from "@/components/features/date-picker";
import { Label } from "@/components/ui/label";
import {
  RelationshipTypeSelector,
  RelationshipType,
} from "@/components/features/synastry/relationship-type-selector";
import { SynastryResult } from "@/components/features/synastry/synastry-result";

type SynastryType = "zodiac" | "bazi" | "combined";

interface SynastryData {
  zodiac?: {
    sign1: string;
    sign2: string;
    element1: string;
    element2: string;
    score: number;
    analysis: string;
  };
  bazi?: {
    bazi1: string;
    bazi2: string;
    zodiac1: string;
    zodiac2: string;
    score: number;
    analysis: string;
  };
  overallScore: number;
}

export default function SynastryPage() {
  const [date1, setDate1] = useState<Date>();
  const [date2, setDate2] = useState<Date>();
  const [type, setType] = useState<SynastryType>("combined");
  const [relationshipType, setRelationshipType] = useState<RelationshipType>("romance");
  const [synastryData, setSynastryData] = useState<SynastryData | null>(null);
  const [generatedPrompt, setGeneratedPrompt] = useState<string>("");
  const [showResults, setShowResults] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);

  const { stream, isLoading, isStreaming, text, error, reset } = useAIStream();

  // 第一步：计算合盘（纯计算，不限流）
  const handleCalculate = async () => {
    if (!date1 || !date2) return;

    setIsCalculating(true);
    reset();
    setSynastryData(null);
    setGeneratedPrompt("");

    try {
      const response = await fetch("/api/synastry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date1: date1.toISOString(),
          date2: date2.toISOString(),
          type,
          relationshipType,
          // 不传 prompt，表示只计算不合盘不解读
        }),
      });

      if (!response.ok) {
        throw new Error("Calculation failed");
      }

      const result = await response.json();

      if (result.success) {
        setSynastryData(result.data);
        setGeneratedPrompt(result.prompt);
        setShowResults(true);
      }
    } catch (err) {
      console.error("Synastry calculation error:", err);
    } finally {
      setIsCalculating(false);
    }
  };

  // 第二步：AI解读（单独触发，限流）
  const handleInterpret = async () => {
    if (!generatedPrompt) return;

    reset();
    await stream(generatedPrompt, { endpoint: "/api/synastry" });
  };

  const handleReset = () => {
    setShowResults(false);
    setSynastryData(null);
    setGeneratedPrompt("");
    reset();
  };

  // Show results view
  if (showResults) {
    return (
      <div className="space-y-6 max-w-3xl mx-auto">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleReset}
            className="text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">合盘分析结果</h1>
            <p className="text-sm text-muted-foreground">
              {type === "zodiac"
                ? "星座合盘"
                : type === "bazi"
                ? "八字合婚"
                : "综合合盘"}
            </p>
          </div>
        </div>

        {synastryData && (
          <SynastryResult
            zodiacData={synastryData.zodiac || null}
            baziData={synastryData.bazi || null}
            overallScore={synastryData.overallScore}
          />
        )}

        {/* AI解读按钮 - 单独触发 */}
        {!text && !isLoading && (
          <Button
            onClick={handleInterpret}
            disabled={isLoading || isStreaming}
            className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            AI深度解读
          </Button>
        )}

        <AIInterpretation
          content={text}
          isLoading={isLoading}
          isStreaming={isStreaming}
          error={error}
          title="AI 深度解读"
          onRegenerate={handleInterpret}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-foreground">合盘预测</h1>
        <p className="text-muted-foreground">双人星座/八字合盘，AI分析配对指数</p>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 space-y-6">
        {/* Analysis Type */}
        <div className="space-y-2">
          <Label>合盘类型</Label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: "zodiac" as const, label: "星座合盘" },
              { id: "bazi" as const, label: "八字合婚" },
              { id: "combined" as const, label: "综合合盘" },
            ].map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setType(id)}
                className={`py-3 rounded-lg border transition-all ${
                  type === id
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card border-border hover:border-primary/50"
                }`}
              >
                <span className="text-sm font-medium">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Relationship Type Selector */}
        <RelationshipTypeSelector
          selected={relationshipType}
          onSelect={setRelationshipType}
        />

        {/* Person 1 */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-primary" />
            <Label>第一人生日</Label>
          </div>
          <DatePicker
            date={date1}
            onSelect={setDate1}
            placeholder="选择出生日期"
          />
        </div>

        {/* Person 2 */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-primary" />
            <Label>第二人生日</Label>
          </div>
          <DatePicker
            date={date2}
            onSelect={setDate2}
            placeholder="选择出生日期"
          />
        </div>

        {/* 分析合盘按钮 */}
        <Button
          onClick={handleCalculate}
          disabled={!date1 || !date2 || isCalculating}
          className="w-full bg-primary hover:bg-primary/90"
        >
          {isCalculating ? "分析中..." : "分析合盘"}
        </Button>
      </div>
    </div>
  );
}
