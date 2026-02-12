"use client";

import { useState } from "react";
import { Sparkles, Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AIInterpretation } from "@/components/features/ai-interpretation";
import { useAIStream } from "@/lib/ai/hooks";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/features/date-picker";
import { QimenPan } from "@/components/features/qimen/qimen-pan";
import { DivinationTypeSelector, DivinationType } from "@/components/features/qimen/divination-type-selector";
import { QimenResult } from "@/lib/calculations/qimen";

type StartMethod = "time" | "number" | "random";

export default function QimenPage() {
  const [startMethod, setStartMethod] = useState<StartMethod>("time");
  const [category, setCategory] = useState<DivinationType>("general");
  const [question, setQuestion] = useState("");
  const [number, setNumber] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [qimenData, setQimenData] = useState<QimenResult | null>(null);
  const [showPan, setShowPan] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const { stream, isLoading, isStreaming, text, error, reset } = useAIStream();

  // 第一步：起局（纯计算，不限流）
  const handleCalculate = async () => {
    setIsCalculating(true);
    reset();
    setShowPan(false);
    setQimenData(null);

    try {
      const response = await fetch("/api/qimen", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: selectedDate.toISOString(),
          method: "chaibu",
          category,
          // 不传 prompt，表示只起局不解读
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.qimen) {
          setQimenData(data.qimen);
          setShowPan(true);
        }
      }
    } catch (err) {
      console.error("Failed to calculate Qimen:", err);
    } finally {
      setIsCalculating(false);
    }
  };

  // 第二步：AI解读（单独触发，限流）
  const handleInterpret = async () => {
    if (!qimenData) return;

    reset();
    let prompt = "";
    const categoryMap: Record<DivinationType, string> = {
      career: "事业",
      love: "感情",
      wealth: "求财",
      health: "健康",
      lost: "寻物",
      general: "综合",
    };

    switch (startMethod) {
      case "time":
        prompt = `请以当前时间起奇门遁甲局，解读以下${categoryMap[category]}问题：${question || "近期运势"}`;
        break;
      case "number":
        prompt = `请用数字${number}起奇门遁甲局，解读以下${categoryMap[category]}问题：${question || "近期运势"}`;
        break;
      case "random":
        prompt = `请随机起奇门遁甲局，解读以下${categoryMap[category]}问题：${question || "近期运势"}`;
        break;
    }

    await stream(prompt, { endpoint: "/api/qimen" });
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-foreground">奇门遁甲</h1>
        <p className="text-muted-foreground">自动起局排盘，AI解读吉凶格局</p>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 space-y-6">
        {/* Category Selection */}
        <DivinationTypeSelector selected={category} onSelect={setCategory} />

        {/* Start Method */}
        <div className="space-y-2">
          <Label>起局方式</Label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: "time" as const, label: "时间起局", icon: Clock },
              { id: "number" as const, label: "数字起局", icon: Calendar },
              { id: "random" as const, label: "随机起局", icon: Sparkles },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setStartMethod(id)}
                className={`flex flex-col items-center gap-2 py-4 rounded-lg border transition-all ${
                  startMethod === id
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card border-border hover:border-primary/50"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Number Input for number divination */}
        {startMethod === "number" && (
          <div className="space-y-2">
            <Label>数字（1-1000）</Label>
            <input
              type="number"
              min="1"
              max="1000"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              placeholder="输入一个数字"
              className="w-full px-4 py-2 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        )}

        {/* Date Input for time divination */}
        {startMethod === "time" && (
          <div className="space-y-2">
            <Label>选择时间</Label>
            <DatePicker
              date={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              placeholder="选择日期"
            />
          </div>
        )}

        {/* Question */}
        <div className="space-y-2">
          <Label>占测事项（可选）</Label>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="例如：问事业、感情、出行..."
            rows={3}
            className="w-full px-4 py-2 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
          />
        </div>

        {/* 起局按钮 */}
        <Button
          onClick={handleCalculate}
          disabled={isCalculating || (startMethod === "number" && !number)}
          className="w-full bg-primary hover:bg-primary/90"
        >
          {isCalculating ? "起局中..." : "开始起局"}
        </Button>
      </div>

      {/* Qimen Pan Display - 起局结果 */}
      {showPan && (
        <div className="space-y-6">
          <QimenPan qimen={qimenData} />

          {/* AI解读按钮 - 单独触发 */}
          <Button
            onClick={handleInterpret}
            disabled={isLoading || isStreaming}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            {isLoading || isStreaming ? "解读中..." : "AI解读奇门盘"}
          </Button>
        </div>
      )}

      {/* AI解读结果 */}
      <AIInterpretation
        content={text}
        isLoading={isLoading}
        isStreaming={isStreaming}
        error={error}
        title="奇门解读"
      />
    </div>
  );
}
