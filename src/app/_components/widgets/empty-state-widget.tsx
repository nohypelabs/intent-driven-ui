'use client';

import { MessageSquare, Sparkles } from 'lucide-react';
import { EmptyStateWidgetSchema } from '@/shared/schemas/widget-schema';
import { z } from 'zod';

type EmptyStateProps = z.infer<typeof EmptyStateWidgetSchema> & {
  onSuggestionClick?: (suggestion: string) => void;
};

export function EmptyStateWidget({ message, suggestions, onSuggestionClick }: EmptyStateProps) {
  return (
    <div className="w-full max-w-md p-6 bg-slate-900/80 border border-slate-800/60 rounded-2xl shadow-xl backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-3">
        <div className="p-2 bg-indigo-500/10 rounded-lg">
          <MessageSquare className="w-4 h-4 text-indigo-400" />
        </div>
        <span className="text-xs font-semibold text-slate-300">AI Assistant</span>
      </div>

      <p className="text-sm text-slate-400 leading-relaxed mb-4">{message}</p>

      {suggestions && suggestions.length > 0 && (
        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <Sparkles className="w-3 h-3 text-indigo-400" aria-hidden="true" />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Try these commands
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {suggestions.map((s, idx) => (
              <button
                key={idx}
                onClick={() => onSuggestionClick?.(s)}
                className="text-xs px-3 py-1.5 bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white rounded-full border border-slate-700 hover:border-indigo-500/50 transition-all duration-200 text-left"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
