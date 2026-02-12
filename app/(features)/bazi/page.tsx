"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { AIInterpretation } from "@/components/features/ai-interpretation";
import { useAIStream } from "@/lib/ai/hooks";
import { DatePicker } from "@/components/features/date-picker";
import { Label } from "@/components/ui/label";
import { BaziChart } from "@/components/features/bazi/bazi-chart";
import { ShishenDisplay } from "@/components/features/bazi/shishen-display";
import { WuxingChart } from "@/components/features/bazi/wuxing-chart";
import { DayunDisplay } from "@/components/features/bazi/dayun-display";
import { BaziResult } from "@/lib/calculations/bazi";
import { calculateBaziShishen, ShishenInfo } from "@/lib/calculations/shishen";
import { WuxingAnalysis } from "@/lib/calculations/wuxing";
import { Dayun } from "@/lib/calculations/dayun";
import { Sparkles } from "lucide-react";

export default function BaziPage() {
  const [birthDate, setBirthDate] = useState<Date>();
  const [birthTime, setBirthTime] = useState("12:00");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [isEarlyZi, setIsEarlyZi] = useState<boolean>(true);
  const [baziData, setBaziData] = useState<BaziResult | null>(null);
  const [shishenData, setShishenData] = useState<{
    year: ShishenInfo;
    month: ShishenInfo;
    day: ShishenInfo;
    hour: ShishenInfo;
    dayMaster: string;
  } | null>(null);
  const [wuxingData, setWuxingData] = useState<WuxingAnalysis | null>(null);
  const [dayunData, setDayunData] = useState<Dayun[] | null>(null);
  const [showChart, setShowChart] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const { stream, isLoading, isStreaming, text, error, reset } = useAIStream();

  // Check if current time is in Zi hour (23:00-00:59)
  const isZiHour = useMemo(() => {
    if (!birthTime) return false;
    const hour = parseInt(birthTime.split(":")[0]);
    return hour >= 23 || hour < 1;
  }, [birthTime]);

  // 第一步：排盘（不触发AI，不限流）
  const handleCalculate = async () => {
    if (!birthDate) return;

    setIsCalculating(true);
    reset();
    setShowChart(false);
    setBaziData(null);
    setShishenData(null);
    setWuxingData(null);
    setDayunData(null);

    try {
      const response = await fetch("/api/bazi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          birthDate: birthDate.toISOString(),
          birthTime,
          gender,
          isEarlyZi,
          // 不传 prompt，表示只排盘不解读
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.bazi) {
          setBaziData(data.bazi);
          setShishenData(data.bazi.shishen);
          setWuxingData(data.bazi.wuxing);
          setDayunData(data.bazi.dayun);
          setShowChart(true);
        }
      }
    } catch (err) {
      console.error("Failed to calculate BaZi:", err);
    } finally {
      setIsCalculating(false);
    }
  };

  // 第二步：AI解读（单独触发，限流）
  const handleInterpret = async () => {
    if (!birthDate) return;

    reset();
    const ziHourInfo = isZiHour ? (isEarlyZi ? "（早子时）" : "（晚子时）") : "";
    const prompt = `请为${gender === "male" ? "男" : "女"}性，出生时间 ${birthDate.toLocaleDateString()} ${birthTime}${ziHourInfo} 进行八字分析。`;
    await stream(prompt, { endpoint: "/api/bazi" });
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-foreground">八字算命</h1>
        <p className="text-muted-foreground">输入出生时间，生成八字命盘</p>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 space-y-6">
        {/* Gender Selection */}
        <div className="space-y-2">
          <Label>性别</Label>
          <div className="flex gap-2">
            <button
              onClick={() => setGender("male")}
              className={`flex-1 py-3 rounded-lg border transition-all ${
                gender === "male"
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card border-border hover:border-primary/50"
              }`}
            >
              男
            </button>
            <button
              onClick={() => setGender("female")}
              className={`flex-1 py-3 rounded-lg border transition-all ${
                gender === "female"
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card border-border hover:border-primary/50"
              }`}
            >
              女
            </button>
          </div>
        </div>

        {/* Birth Date */}
        <div className="space-y-2">
          <Label>出生日期</Label>
          <DatePicker
            date={birthDate}
            onSelect={setBirthDate}
            placeholder="选择出生日期"
            fromYear={1900}
            toYear={2100}
          />
        </div>

        {/* Birth Time */}
        <div className="space-y-2">
          <Label>出生时间</Label>
          <input
            type="time"
            value={birthTime}
            onChange={(e) => setBirthTime(e.target.value)}
            className="w-full px-4 py-2 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* Early/Late Zi Hour Selection */}
        {isZiHour && (
          <div className="space-y-2">
            <Label>子时选择（23:00-00:59）</Label>
            <div className="flex gap-2">
              <button
                onClick={() => setIsEarlyZi(true)}
                className={`flex-1 py-3 rounded-lg border transition-all ${
                  isEarlyZi
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card border-border hover:border-primary/50"
                }`}
              >
                早子时（23:00-24:00）
              </button>
              <button
                onClick={() => setIsEarlyZi(false)}
                className={`flex-1 py-3 rounded-lg border transition-all ${
                  !isEarlyZi
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card border-border hover:border-primary/50"
                }`}
              >
                晚子时（00:00-01:00）
              </button>
            </div>
            <p className="text-xs text-muted-foreground">
              早子时算作当日，晚子时算作次日
            </p>
          </div>
        )}

        {/* 排盘按钮 */}
        <Button
          onClick={handleCalculate}
          disabled={!birthDate || isCalculating}
          className="w-full bg-primary hover:bg-primary/90"
        >
          {isCalculating ? "排盘中..." : "开始排盘"}
        </Button>
      </div>

      {/* BaZi Chart Display - 排盘结果 */}
      {showChart && (
        <div className="space-y-6">
          <BaziChart bazi={baziData} />
          <ShishenDisplay bazi={baziData} shishen={shishenData} />
          <WuxingChart wuxing={wuxingData} />
          <DayunDisplay dayun={dayunData} />

          {/* AI解读按钮 - 单独触发 */}
          <Button
            onClick={handleInterpret}
            disabled={isLoading || isStreaming}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            {isLoading || isStreaming ? "解读中..." : "AI解读命盘"}
          </Button>
        </div>
      )}

      {/* AI解读结果 */}
      <AIInterpretation
        content={text}
        isLoading={isLoading}
        isStreaming={isStreaming}
        error={error}
        title="八字分析"
      />
    </div>
  );
}
