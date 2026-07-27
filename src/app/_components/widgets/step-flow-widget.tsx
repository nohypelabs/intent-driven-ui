'use client';

import { GitBranch, CheckCircle2, Circle, AlertCircle } from 'lucide-react';
import { StepFlowWidgetSchema } from '@/shared/schemas/widget-schema';
import { z } from 'zod';

type StepFlowProps = z.infer<typeof StepFlowWidgetSchema>;

const stepStatusStyles = {
  completed: { icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' },
  current: { icon: Circle, color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/30' },
  pending: { icon: Circle, color: 'text-slate-500', bg: 'bg-slate-800/50', border: 'border-slate-700' },
  error: { icon: AlertCircle, color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/30' },
};

export function StepFlowWidget({ title, steps }: StepFlowProps) {
  return (
    <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-800/60 flex items-center gap-2 bg-slate-900/50">
        <GitBranch className="w-4 h-4 text-slate-400" />
        <h3 className="text-sm font-semibold text-slate-200">{title}</h3>
      </div>

      <div className="p-5">
        <div className="relative">
          {steps.map((step, idx) => {
            const style = stepStatusStyles[step.status];
            const Icon = style.icon;
            const isLast = idx === steps.length - 1;

            return (
              <div key={idx} className="flex gap-3 relative">
                {/* Vertical Line */}
                {!isLast && (
                  <div className="absolute left-[11px] top-6 w-0.5 h-[calc(100%-24px)] bg-slate-800" />
                )}

                {/* Icon */}
                <div className={`relative z-10 w-6 h-6 rounded-full flex items-center justify-center ${style.bg} border ${style.border}`}>
                  <Icon className={`w-3.5 h-3.5 ${style.color}`} />
                </div>

                {/* Content */}
                <div className={`flex-1 ${isLast ? '' : 'pb-5'}`}>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-semibold ${step.status === 'pending' ? 'text-slate-500' : 'text-slate-200'}`}>
                      {step.label}
                    </span>
                    {step.status === 'current' && (
                      <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 animate-pulse">
                        ACTIVE
                      </span>
                    )}
                  </div>
                  {step.description && (
                    <p className="text-xs text-slate-500 mt-0.5">{step.description}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
