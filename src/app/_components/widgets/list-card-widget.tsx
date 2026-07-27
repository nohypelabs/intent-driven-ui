'use client';

import { List } from 'lucide-react';
import { ListCardWidgetSchema } from '@/shared/schemas/widget-schema';
import { z } from 'zod';

type ListCardProps = z.infer<typeof ListCardWidgetSchema>;

const statusDots = {
  active: 'bg-emerald-400',
  inactive: 'bg-slate-400',
  pending: 'bg-amber-400',
  completed: 'bg-indigo-400',
  error: 'bg-rose-400',
};

export function ListCardWidget({ title, items, maxVisible }: ListCardProps) {
  const visibleItems = maxVisible ? items.slice(0, maxVisible) : items;

  return (
    <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-800 flex items-center gap-2 bg-slate-900/50">
        <List className="w-4 h-4 text-slate-400" />
        <h3 className="text-sm font-semibold text-slate-200">{title}</h3>
        <span className="ml-auto text-[10px] text-slate-500">{items.length} items</span>
      </div>

      <div className="divide-y divide-slate-800/60">
        {visibleItems.map((item, idx) => (
          <div key={idx} className="px-5 py-3.5 hover:bg-slate-800/40 transition-colors duration-150">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {item.status && (
                  <div className={`w-1.5 h-1.5 rounded-full ${statusDots[item.status]}`} />
                )}
                <span className="text-xs font-medium text-slate-200">{item.label}</span>
              </div>
              {item.badge && (
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  {item.badge}
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5 ml-3.5">{item.value}</p>
          </div>
        ))}
      </div>

      {maxVisible && items.length > maxVisible && (
        <div className="px-5 py-2.5 border-t border-slate-800 bg-slate-900/50 text-center">
          <span className="text-[10px] text-slate-500">+{items.length - maxVisible} lainnya</span>
        </div>
      )}
    </div>
  );
}
