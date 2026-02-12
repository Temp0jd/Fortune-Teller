"use client";

import { useState } from "react";
import { Sparkles, ChevronLeft, Shuffle, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AIInterpretation } from "@/components/features/ai-interpretation";
import { useAIStream } from "@/lib/ai/hooks";
import {
  TAROT_SPREADS,
  drawCards,
  generateTarotPrompt,
  TAROT_SYSTEM_PROMPT,
  TarotSpread,
} from "@/lib/prompts/tarot";
import { motion, AnimatePresence } from "framer-motion";

export default function TarotPage() {
  const [step, setStep] = useState<"select" | "question" | "shuffle" | "reveal" | "result">("select");
  const [selectedSpread, setSelectedSpread] = useState<TarotSpread | null>(null);
  const [question, setQuestion] = useState("");
  const [cards, setCards] = useState<{ name: string; isReversed: boolean; revealed: boolean }[]>([]);

  const { stream, isLoading, isStreaming, text, error, reset } = useAIStream();

  const handleSelectSpread = (spread: TarotSpread) => {
    setSelectedSpread(spread);
    setStep("question");
  };

  const handleStartShuffle = () => {
    setStep("shuffle");
    setTimeout(() => {
      const spread = TAROT_SPREADS.find((s) => s.id === selectedSpread)!;
      const drawnCards = drawCards(spread.cardCount).map((c) => ({
        ...c,
        revealed: false,
      }));
      setCards(drawnCards);
      setStep("reveal");
    }, 2000);
  };

  const handleRevealCard = (index: number) => {
    setCards((prev) =>
      prev.map((c, i) => (i === index ? { ...c, revealed: true } : c))
    );
  };

  const handleGetInterpretation = async () => {
    if (!selectedSpread) return;

    const cardData = cards.map((c, i) => ({
      name: c.name,
      isReversed: c.isReversed,
      position: i,
    }));

    const prompt = generateTarotPrompt(selectedSpread, cardData, question || undefined);
    await stream(prompt, {
      systemPrompt: TAROT_SYSTEM_PROMPT,
      endpoint: "/api/tarot",
    });
    setStep("result");
  };

  const handleReset = () => {
    setStep("select");
    setSelectedSpread(null);
    setQuestion("");
    setCards([]);
    reset();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        {step !== "select" && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleReset}
            className="text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
        )}
        <div>
          <h1 className="text-2xl font-bold text-foreground">塔罗牌占卜</h1>
          <p className="text-sm text-muted-foreground">
            {step === "select" && "选择牌阵开始占卜"}
            {step === "question" && "输入你的问题"}
            {step === "shuffle" && "正在洗牌..."}
            {step === "reveal" && "点击翻牌"}
            {step === "result" && "AI 解读"}
          </p>
        </div>
      </div>

      {/* Select Spread */}
      {step === "select" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {TAROT_SPREADS.map((spread) => (
            <motion.button
              key={spread.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelectSpread(spread.id)}
              className="
                p-6 rounded-2xl
                bg-card border border-border
                hover:border-primary/30 hover:shadow-lg
                transition-all duration-300
                text-left
              "
            >
              <div className="text-3xl mb-3">{spread.cardCount === 1 ? "🎴" : spread.cardCount === 3 ? "🎴🎴🎴" : "🔮"}</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{spread.name}</h3>
              <p className="text-sm text-muted-foreground">{spread.description}</p>
              <div className="mt-3 text-xs text-primary font-medium">{spread.cardCount} 张牌</div>
            </motion.button>
          ))}
        </div>
      )}

      {/* Question Input */}
      {step === "question" && (
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">你的问题（可选）</label>
            <Input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="例如：我最近的工作运势如何？"
              className="bg-card border-border text-foreground placeholder:text-muted-foreground"
            />
          </div>
          <Button
            onClick={handleStartShuffle}
            size="lg"
            className="w-full bg-primary hover:bg-primary/90"
          >
            <Shuffle className="w-5 h-5 mr-2" />
            开始洗牌
          </Button>
        </div>
      )}

      {/* Shuffling */}
      {step === "shuffle" && (
        <div className="text-center py-20">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="inline-block"
          >
            <Shuffle className="w-16 h-16 text-primary" />
          </motion.div>
          <p className="mt-4 text-muted-foreground">正在洗牌...</p>
        </div>
      )}

      {/* Reveal Cards */}
      {step === "reveal" && (
        <div className="space-y-6">
          <div
            className={`grid gap-4 ${
              cards.length === 1
                ? "grid-cols-1 max-w-xs mx-auto"
                : cards.length === 3
                ? "grid-cols-3"
                : "grid-cols-2 md:grid-cols-5"
            }`}
          >
            {cards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleRevealCard(index)}
                className={`
                  aspect-[2/3] rounded-xl cursor-pointer
                  flex items-center justify-center
                  ${
                    card.revealed
                      ? "bg-card border border-border"
                      : "bg-gradient-to-br from-primary to-primary/70 border border-primary/30"
                  }
                  hover:scale-105 transition-transform
                `}
              >
                {card.revealed ? (
                  <div className="text-center p-2">
                    <div className="text-sm text-muted-foreground mb-1">
                      {TAROT_SPREADS.find((s) => s.id === selectedSpread)?.positions[index]}
                    </div>
                    <div className="text-foreground font-medium">{card.name}</div>
                    <div className={`text-xs mt-1 ${card.isReversed ? "text-destructive" : "text-primary"}`}>
                      {card.isReversed ? "逆位" : "正位"}
                    </div>
                  </div>
                ) : (
                  <Eye className="w-8 h-8 text-primary-foreground/50" />
                )}
              </motion.div>
            ))}
          </div>

          {cards.every((c) => c.revealed) && (
            <Button
              onClick={handleGetInterpretation}
              size="lg"
              className="w-full bg-primary hover:bg-primary/90"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              获取 AI 解读
            </Button>
          )}
        </div>
      )}

      {/* Result */}
      {(step === "result" || text) && (
        <AIInterpretation
          content={text}
          isLoading={isLoading}
          isStreaming={isStreaming}
          error={error}
          onRegenerate={handleGetInterpretation}
          title="塔罗解读"
        />
      )}
    </div>
  );
}
