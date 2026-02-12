'use client';

import { useState, useEffect, useRef } from 'react';
import { Sparkles, RefreshCw, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

interface AIInterpretationProps {
  content: string;
  isLoading?: boolean;
  isStreaming?: boolean;
  error?: Error | null;
  onRegenerate?: () => void;
  title?: string;
}

export function AIInterpretation({
  content,
  isLoading = false,
  isStreaming = false,
  error,
  onRegenerate,
  title = 'AI 解读',
}: AIInterpretationProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!content) return;
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (error) {
    return (
      <div className="glass-card border-red-500/30 rounded-2xl p-6">
        <div className="flex items-center gap-2 text-red-400 mb-2">
          <Sparkles className="w-5 h-5" />
          <span className="font-semibold">解读出错</span>
        </div>
        <p className="text-red-400/80 text-sm mb-4">{error.message}</p>
        {onRegenerate && (
          <Button
            onClick={onRegenerate}
            variant="outline"
            size="sm"
            className="border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            重试
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-purple-500/20">
            <Sparkles className="w-4 h-4 text-purple-400" />
          </div>
          <span className="font-semibold text-slate-200">{title}</span>
          {isStreaming && (
            <span className="ml-2 flex items-center gap-1 text-xs text-purple-400">
              <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" />
              生成中
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {content && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="text-slate-400 hover:text-slate-200 hover:bg-white/10"
            >
              {copied ? (
                <Check className="w-4 h-4 text-emerald-400" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          )}
          {onRegenerate && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onRegenerate}
              disabled={isLoading || isStreaming}
              className="text-slate-400 hover:text-slate-200 hover:bg-white/10"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {isLoading && !content ? (
          <div className="space-y-3">
            <Skeleton className="h-4 bg-white/10 w-3/4" />
            <Skeleton className="h-4 bg-white/10 w-full" />
            <Skeleton className="h-4 bg-white/10 w-5/6" />
            <Skeleton className="h-4 bg-white/10 w-2/3" />
          </div>
        ) : content ? (
          <div className="prose prose-invert max-w-none">
            <div className="text-slate-300 leading-relaxed whitespace-pre-wrap">
              {content}
              {isStreaming && (
                <span className="inline-block w-2 h-5 ml-1 bg-purple-400 animate-pulse" />
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-slate-500">
            <Sparkles className="w-8 h-8 mx-auto mb-3 opacity-50" />
            <p>点击开始获取 AI 解读</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Typewriter effect hook
export function useTypewriter(text: string, speed: number = 30) {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    setDisplayText('');
    setIsComplete(false);
    indexRef.current = 0;

    const timer = setInterval(() => {
      if (indexRef.current < text.length) {
        setDisplayText(text.slice(0, indexRef.current + 1));
        indexRef.current++;
      } else {
        setIsComplete(true);
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return { displayText, isComplete };
}
