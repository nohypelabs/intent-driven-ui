'use client';

import { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';

interface PromptInputProps {
  onSubmit: (prompt: string) => void;
  isLoading: boolean;
  disabled?: boolean;
}

export function PromptInput({ onSubmit, isLoading, disabled }: PromptInputProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || disabled) return;
    onSubmit(input);
    setInput('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl bg-slate-900 border border-slate-800 focus-within:border-indigo-500 rounded-2xl p-2 flex items-center gap-2 shadow-2xl transition-all duration-200"
    >
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type an instruction to trigger UI (e.g. 'Analyze server performance')..."
        disabled={isLoading || disabled}
        className="flex-1 bg-transparent border-none outline-none text-sm px-3 py-2 text-slate-100 placeholder:text-slate-500 disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={!input.trim() || isLoading || disabled}
        className="p-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white rounded-xl transition-all duration-200 active:scale-[0.98]"
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Send className="w-4 h-4" />
        )}
      </button>
    </form>
  );
}
