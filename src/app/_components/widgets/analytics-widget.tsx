'use client';

import { TrendingUp, TrendingDown, Minus, Activity } from 'lucide-react';
import { AnalyticsWidgetSchema } from '@/shared/schemas/widget-schema';
import { z } from 'zod';

type AnalyticsCardProps = z.infer<typeof AnalyticsWidgetSchema>;

export function AnalyticsCardWidget({
  title,
  metric,
  trend,
  description,
}: AnalyticsCardProps) {
  return (
    <div className="w-full max-w-md p-5 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl hover:border-slate-700 transition-all duration-200">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          {title}
        </span>
        <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg">
          <Activity className="w-4 h-4" />
        </div>
      </div>

      <div className="my-4 flex items-baseline justify-between">
        <h2 className="text-3xl font-extrabold text-white tracking-tight">
          {metric}
        </h2>

        <div
          className={`flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full border ${
            trend === 'up'
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
              : trend === 'down'
              ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
              : 'bg-slate-500/10 text-slate-400 border-slate-500/20'
          }`}
        >
          {trend === 'up' && <TrendingUp className="w-3.5 h-3.5" />}
          {trend === 'down' && <TrendingDown className="w-3.5 h-3.5" />}
          {trend === 'neutral' && <Minus className="w-3.5 h-3.5" />}
          <span className="capitalize">{trend}</span>
        </div>
      </div>

      <p className="text-xs text-slate-400 leading-relaxed">{description}</p>
    </div>
  );
}
