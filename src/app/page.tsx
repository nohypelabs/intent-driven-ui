'use client';

import { useState } from 'react';
import { trpc } from './_trpc/client';
import { WidgetRenderer } from './_components/widget-renderer';
import { PromptInput } from './_components/prompt-input';
import { LoadingSkeleton } from './_components/loading-skeleton';
import { Sparkles } from 'lucide-react';
import { UIWidget } from '@/shared/schemas/widget-schema';
import { motion, AnimatePresence } from 'framer-motion';

export default function DashboardPage() {
  const [activeWidgets, setActiveWidgets] = useState<UIWidget[]>([]);

  const processIntent = trpc.intent.process.useMutation({
    onSuccess: (data) => {
      setActiveWidgets((prev) => [data.widget, ...prev]);
    },
  });

  const handleSubmit = (prompt: string) => {
    processIntent.mutate({ prompt });
  };

  const handleSuggestionClick = (suggestion: string) => {
    processIntent.mutate({ prompt: suggestion });
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

          {activeWidgets.map((widget, idx) => (
            <motion.div
              key={`${widget.type}-${idx}-${JSON.stringify(widget).slice(0, 50)}`}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="flex justify-center mb-6"
            >
              <WidgetRenderer
                widget={widget}
                onSuggestionClick={handleSuggestionClick}
              />
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
