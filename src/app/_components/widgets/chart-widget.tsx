'use client';

import { BarChart3 } from 'lucide-react';
import { ChartWidgetSchema } from '@/shared/schemas/widget-schema';
import { z } from 'zod';

type ChartWidgetProps = z.infer<typeof ChartWidgetSchema>;

export function ChartWidget({ title, chartType, labels, datasets, unit }: ChartWidgetProps) {
  const allValues = datasets.flatMap((d) => d.data);
  const maxValue = Math.max(...allValues);

  return (
    <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-800 flex items-center gap-2 bg-slate-900/50">
        <BarChart3 className="w-4 h-4 text-slate-400" />
        <h3 className="text-sm font-semibold text-slate-200">{title}</h3>
      </div>

      <div className="p-5">
        {/* Legend */}
        <div className="flex items-center gap-4 mb-4">
          {datasets.map((ds, idx) => (
            <div key={idx} className="flex items-center gap-1.5">
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: ds.color || '#6366f1' }}
              />
              <span className="text-[10px] text-slate-400">{ds.label}</span>
            </div>
          ))}
        </div>

        {/* Chart Area */}
        <div className="relative h-40 flex items-end gap-1">
          {labels.map((label, labelIdx) => (
            <div key={labelIdx} className="flex-1 flex flex-col items-center gap-1">
              {/* Bars / Points */}
              <div className="w-full flex items-end justify-center gap-0.5" style={{ height: '120px' }}>
                {datasets.map((ds, dsIdx) => {
                  const value = ds.data[labelIdx] ?? 0;
                  const height = maxValue > 0 ? (value / maxValue) * 100 : 0;

                  if (chartType === 'line' || chartType === 'area') {
                    return (
                      <div
                        key={dsIdx}
                        className="w-2 h-2 rounded-full relative z-10"
                        style={{
                          backgroundColor: ds.color || '#6366f1',
                          marginBottom: `${height}%`,
                        }}
                        title={`${ds.label}: ${value}${unit ? ` ${unit}` : ''}`}
                      />
                    );
                  }

                  return (
                    <div
                      key={dsIdx}
                      className="w-full max-w-[16px] rounded-t-sm transition-all duration-300 hover:opacity-80"
                      style={{
                        backgroundColor: ds.color || '#6366f1',
                        height: `${height}%`,
                      }}
                      title={`${ds.label}: ${value}${unit ? ` ${unit}` : ''}`}
                    />
                  );
                })}
              </div>

              {/* Label */}
              <span className="text-[9px] text-slate-500 mt-1 whitespace-nowrap">{label}</span>
            </div>
          ))}
        </div>

        {/* Line chart connector */}
        {chartType === 'line' && (
          <svg className="absolute inset-0 pointer-events-none" style={{ width: '100%', height: '100%' }}>
            {/* Simplified line rendering would go here */}
          </svg>
        )}
      </div>
    </div>
  );
}
