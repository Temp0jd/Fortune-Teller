'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, MessageCircle } from 'lucide-react';
import { useConversationStore } from '@/lib/conversation/store';

interface FollowUpQuestionProps {
  feature: string;
  featureName: string;
  context: Record<string, unknown>;
  onAsk: (question: string, history: Array<{ role: string; content: string }>) => Promise<void>;
  disabled?: boolean;
  isLoading?: boolean;
}

export function FollowUpQuestion({
  feature,
  featureName,
  context,
  onAsk,
  disabled,
  isLoading,
}: FollowUpQuestionProps) {
  const [question, setQuestion] = useState('');
  const [showInput, setShowInput] = useState(false);

  const conversation = useConversationStore((state) => state.getCurrentConversation());
  const messages = conversation?.messages || [];

  const hasHistory = messages.length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || disabled || isLoading) return;

    const history = messages.slice(-6).map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));

    await onAsk(question.trim(), history);
    setQuestion('');
  };

  // 快捷问题
  const quickQuestions = [
    '能详细解释一下吗？',
    '这对我的工作有什么影响？',
    '感情方面呢？',
    '有什么需要注意的吗？',
  ];

  if (!showInput && !hasHistory) {
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <MessageCircle className="w-4 h-4" />
          <span>还有疑问？可以继续追问</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {quickQuestions.map((q) => (
            <button
              key={q}
              onClick={() => {
                setQuestion(q);
                setShowInput(true);
              }}
              className="px-3 py-1.5 text-xs bg-white border border-cyan-100 rounded-full text-slate-600 hover:bg-cyan-50 hover:border-cyan-200 transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowInput(true)}
          className="w-full border-cyan-200 text-cyan-700 hover:bg-cyan-50"
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          我要追问
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* 历史对话显示 */}
      {messages.length > 0 && (
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {messages.slice(-4).map((msg, index) => (
            <div
              key={msg.id}
              className={`p-3 rounded-lg text-sm ${
                msg.role === 'user'
                  ? 'bg-cyan-50 text-slate-700 ml-4'
                  : 'bg-white border border-cyan-100 text-slate-600 mr-4'
              }`}
            >
              <p className="text-xs text-slate-400 mb-1">
                {msg.role === 'user' ? '你' : featureName}
              </p>
              <p className="line-clamp-3">{msg.content}</p>
            </div>
          ))}
        </div>
      )}

      {/* 输入框 */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="输入你的问题..."
          disabled={disabled || isLoading}
          className="flex-1"
        />
        <Button
          type="submit"
          disabled={!question.trim() || disabled || isLoading}
          size="icon"
          className="bg-cyan-600 hover:bg-cyan-500"
        >
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </div>
  );
}
