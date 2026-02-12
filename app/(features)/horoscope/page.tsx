"use client";

import { useState } from "react";
import { Sparkles, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AIInterpretation } from "@/components/features/ai-interpretation";
import { useAIStream } from "@/lib/ai/hooks";
import { ZODIAC_SIGNS, generateHoroscopePrompt, HOROSCOPE_SYSTEM_PROMPT } from "@/lib/prompts/horoscope";
import { motion } from "framer-motion";

type Period = "daily" | "weekly" | "monthly";

export default function HoroscopePage() {
  const [selectedSign, setSelectedSign] = useState<string | null>(null);
  const [period, setPeriod] = useState<Period>("daily");
  const [fortune, setFortune] = useState<any>(null);

  const { stream, isLoading, isStreaming, text, error, reset } = useAIStream({
    onComplete: (fullText) => {
      setFortune({
        text: fullText,
        period,
        date: new Date(),
      });
    },
  });

  const handleSelectSign = (signName: string) => {
    setSelectedSign(signName);
    reset();
    setFortune(null);
  };

  const handleGetFortune = async () => {
    if (!selectedSign) return;

    reset();
    const prompt = generateHoroscopePrompt(selectedSign, period, new Date());
    await stream(prompt, {
      systemPrompt: HOROSCOPE_SYSTEM_PROMPT,
      endpoint: "/api/horoscope",
    });
  };

  const handleBack = () => {
    setSelectedSign(null);
    reset();
    setFortune(null);
  };

  // If no sign selected, show zodiac grid
  if (!selectedSign) {
    return (
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">星座运势</h1>
          <p className="text-muted-foreground">选择你的星座，查看AI运势解读</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {ZODIAC_SIGNS.map((sign, index) => (
            <motion.button
              key={sign.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => handleSelectSign(sign.name)}
              className="
                group p-6 rounded-2xl
                bg-card border border-border
                hover:border-primary/30 hover:shadow-lg
                transition-all duration-300
                text-center
              "
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                {sign.icon}
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-1">{sign.name}</h3>
              <p className="text-sm text-muted-foreground">{sign.date}</p>
              <div className="mt-3 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <span className="px-2 py-1 rounded-full bg-muted">{sign.element}</span>
                <span className="px-2 py-1 rounded-full bg-muted">{sign.planet}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    );
  }

  // Show fortune view
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={handleBack} className="text-muted-foreground hover:text-foreground">
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">{selectedSign}运势</h1>
          <p className="text-sm text-muted-foreground">
            {ZODIAC_SIGNS.find((s) => s.name === selectedSign)?.date}
          </p>
        </div>
      </div>

      {/* Period Selector */}
      <div className="flex gap-2 p-1 rounded-xl bg-muted border border-border w-fit">
        {(["daily", "weekly", "monthly"] as Period[]).map((p) => (
          <button
            key={p}
            onClick={() => {
              setPeriod(p);
              reset();
              setFortune(null);
            }}
            className={`
              px-4 py-2 rounded-lg text-sm font-medium transition-all
              ${
                period === p
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }
            `}
          >
            {p === "daily" ? "今日" : p === "weekly" ? "本周" : "本月"}
          </button>
        ))}
      </div>

      {/* Get Fortune Button */}
      {!text && !isLoading && (
        <div className="text-center py-12">
          <Button
            onClick={handleGetFortune}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            查看运势解读
          </Button>
        </div>
      )}

      {/* AI Interpretation */}
      <AIInterpretation
        content={text}
        isLoading={isLoading}
        isStreaming={isStreaming}
        error={error}
        onRegenerate={handleGetFortune}
        title="AI 运势解读"
      />
    </div>
  );
}
