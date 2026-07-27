'use client';

import { useState } from 'react';
import { AlertCircle, CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';
import { ActionConfirmationWidgetSchema } from '@/shared/schemas/widget-schema';
import { z } from 'zod';

type ActionCardProps = z.infer<typeof ActionConfirmationWidgetSchema> & {
  onConfirm?: (actionId: string) => Promise<void> | void;
};

export function ActionCardWidget({
  actionName,
  payloadSummary,
  confirmText,
  actionId,
  severity,
  onConfirm,
}: ActionCardProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleExecute = async () => {
    setStatus('loading');
    try {
      if (onConfirm) await onConfirm(actionId);
      setStatus('success');
    } catch {
      setStatus('idle');
    }
  };

  const severityColors = {
    low: 'border-slate-500/30',
    medium: 'border-amber-500/30',
    high: 'border-rose-500/30',
  };

  return (
    <div className={`w-full max-w-md p-5 bg-slate-900 border ${severityColors[severity ?? 'medium']} rounded-2xl shadow-xl relative overflow-hidden`}>
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

      <div className="flex items-start gap-3">
        <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg mt-0.5">
          <AlertCircle className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-semibold text-slate-100 text-base">
            {actionName}
          </h3>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            {payloadSummary}
          </p>
        </div>
      </div>

      <div className="mt-5 pt-3 border-t border-slate-800 flex justify-end">
        {status === 'success' ? (
          <div className="flex items-center gap-2 text-xs font-medium text-emerald-400 bg-emerald-500/10 px-3 py-2 rounded-xl border border-emerald-500/20 w-full justify-center">
            <CheckCircle2 className="w-4 h-4" />
            Action Executed Successfully
          </div>
        ) : (
          <button
            onClick={handleExecute}
            disabled={status === 'loading'}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold transition-all duration-200 active:scale-[0.98] disabled:opacity-50"
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                {confirmText}
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
