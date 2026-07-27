'use client';

import { useState } from 'react';
import { trpc } from './_trpc/client';
import { WidgetRenderer } from './_components/widget-renderer';
import { PromptInput } from './_components/prompt-input';
import { LoadingSkeleton } from './_components/loading-skeleton';
import { Sparkles, X } from 'lucide-react';
import { UIWidget } from '@/shared/schemas/widget-schema';
import { motion, AnimatePresence } from 'framer-motion';

interface WidgetEntry {
  id: string;
  widget: UIWidget;
}

let widgetIdCounter = 0;

export default function DashboardPage() {
  const [activeWidgets, setActiveWidgets] = useState<WidgetEntry[]>([]);

  const processIntent = trpc.intent.process.useMutation({
    onSuccess: (data) => {
      const entry: WidgetEntry = {
        id: `widget-${++widgetIdCounter}-${Date.now()}`,
        widget: data.widget,
      };
      setActiveWidgets((prev) => [entry, ...prev]);
    },
  });

  const handleSubmit = (prompt: string) => {
    processIntent.mutate({ prompt });
  };

  const handleSuggestionClick = (suggestion: string) => {
    processIntent.mutate({ prompt: suggestion });
  };

  const handleDismiss = (id: string) => {
    setActiveWidgets((prev) => prev.filter((w) => w.id !== id));
  };

  return (
    <main className="min-h-screen flex flex-col items-center p-6 max-w-5xl mx-auto">
      {/* Header */}
      <header className="w-full text-center my-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            AI Native Interface
          </div>
          <h1 className="text-3xl font-extrabold text-white">Intent-Driven Dashboard</h1>
          <p className="text-slate-400 text-sm mt-2">
            Type any instruction and the UI will render itself automatically.
          </p>
        </motion.div>
      </header>

      {/* Error State */}
      <AnimatePresence>
        {processIntent.isError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="w-full max-w-md mb-6 p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl text-sm text-rose-400 text-center"
          >
            Failed to process instruction. Please try again.
          </motion.div>
        )}
      </AnimatePresence>

      {/* Widget Display Area */}
      <section className="w-full flex-1 py-8">
        <AnimatePresence mode="popLayout">
          {processIntent.isPending && activeWidgets.length === 0 && (
            <motion.div
              key="loading-initial"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-16"
            >
              <LoadingSkeleton />
            </motion.div>
          )}

          {activeWidgets.length === 0 && !processIntent.isPending && (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center justify-center py-16"
            >
              <WidgetRenderer
                widget={{
                  type: 'EMPTY_STATE',
                  message: "Hi! I'm the AI UI Engine. Type any instruction and I'll design the perfect interface for you.",
                  suggestions: [
                    'Show monthly revenue summary',
                    'Create a crypto comparison table',
                    'Schedule a deployment tomorrow',
                    'Show server status',
                    'Build a user onboarding flow',
                    'Analyze app performance',
                  ],
                }}
                onSuggestionClick={handleSuggestionClick}
              />
            </motion.div>
          )}

          {activeWidgets.map((entry, idx) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="flex justify-center mb-6 relative group"
            >
              <WidgetRenderer
                widget={entry.widget}
                onSuggestionClick={handleSuggestionClick}
              />
              <button
                onClick={() => handleDismiss(entry.id)}
                aria-label="Dismiss widget"
                className="absolute -top-2 -right-2 w-6 h-6 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
              >
                <X className="w-3 h-3 text-slate-400" />
              </button>
            </motion.div>
          ))}

          {processIntent.isPending && activeWidgets.length > 0 && (
            <motion.div
              key="loading-next"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center mb-6"
            >
              <LoadingSkeleton />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Floating Prompt Bar */}
      <div className="sticky bottom-0 w-full flex justify-center py-4 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent">
        <PromptInput
          onSubmit={handleSubmit}
          isLoading={processIntent.isPending}
        />
      </div>
    </main>
  );
}
