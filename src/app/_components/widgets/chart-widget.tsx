'use client';

import { BarChart3 } from 'lucide-react';
import { ChartWidgetSchema } from '@/shared/schemas/widget-schema';
import { z } from 'zod';

type ChartWidgetProps = z.infer<typeof ChartWidgetSchema>;

export function ChartWidget({ title, chartType, labels, datasets, unit }: ChartWidgetProps) {
  const allValues = datasets.flatMap((d) => d.data);
  const maxValue = Math.max(...allValues, 1);
  const chartHeight = 160;
  const chartWidth = 100;

  const getPoints = (data: number[]) => {
    return data.map((value, idx) => {
      const x = (idx / (data.length - 1 || 1)) * chartWidth;
      const y = chartHeight - (value / maxValue) * chartHeight;
      return { x, y, value };
    });
  };

  const buildLinePath = (data: number[]) => {
    const points = getPoints(data);
    if (points.length < 2) return '';
    return points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  };

  const buildAreaPath = (data: number[]) => {
    const points = getPoints(data);
    if (points.length < 2) return '';
    const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
    return `${linePath} L ${points[points.length - 1].x} ${chartHeight} L ${points[0].x} ${chartHeight} Z`;
  };

  return (
    <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
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
              <span className="text-xs text-slate-400">{ds.label}</span>
            </div>
          ))}
        </div>

        {chartType === 'bar' ? (
          /* Bar Chart */
          <div className="flex items-end gap-1.5" style={{ height: chartHeight }}>
            {labels.map((label, labelIdx) => (
              <div key={labelIdx} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex items-end justify-center gap-0.5" style={{ height: chartHeight }}>
                  {datasets.map((ds, dsIdx) => {
                    const value = ds.data[labelIdx] ?? 0;
                    const height = (value / maxValue) * 100;
                    return (
                      <div
                        key={dsIdx}
                        className="flex-1 max-w-[20px] rounded-t-sm transition-all duration-300 hover:opacity-80 cursor-default"
                        style={{
                          backgroundColor: ds.color || '#6366f1',
                          height: `${height}%`,
                        }}
                        title={`${ds.label}: ${value}${unit ? ` ${unit}` : ''}`}
                      />
                    );
                  })}
                </div>
                <span className="text-xs text-slate-500 mt-1 whitespace-nowrap">{label}</span>
              </div>
            ))}
          </div>
        ) : (
          /* Line / Area Chart */
          <div>
            <svg
              viewBox={`0 0 ${chartWidth} ${chartHeight + 20}`}
              className="w-full"
              style={{ height: chartHeight + 20 }}
              preserveAspectRatio="none"
            >
              {/* Grid lines */}
              {[0, 0.25, 0.5, 0.75, 1].map((ratio) => (
                <line
                  key={ratio}
                  x1="0"
                  y1={chartHeight - ratio * chartHeight}
                  x2={chartWidth}
                  y2={chartHeight - ratio * chartHeight}
                  stroke="#1e293b"
                  strokeWidth="0.3"
                />
              ))}

              {/* Y-axis labels */}
              {[0, 0.25, 0.5, 0.75, 1].map((ratio) => (
                <text
                  key={ratio}
                  x="0"
                  y={chartHeight - ratio * chartHeight - 1}
                  fill="#64748b"
                  fontSize="3"
                  textAnchor="start"
                >
                  {Math.round(ratio * maxValue)}
                </text>
              ))}

              {datasets.map((ds, dsIdx) => {
                const color = ds.color || '#6366f1';
                return (
                  <g key={dsIdx}>
                    {/* Area fill */}
                    {chartType === 'area' && (
                      <path
                        d={buildAreaPath(ds.data)}
                        fill={color}
                        fillOpacity="0.1"
                      />
                    )}

                    {/* Line */}
                    <path
                      d={buildLinePath(ds.data)}
                      fill="none"
                      stroke={color}
                      strokeWidth="0.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* Data points */}
                    {getPoints(ds.data).map((p, pIdx) => (
                      <circle
                        key={pIdx}
                        cx={p.x}
                        cy={p.y}
                        r="1.5"
                        fill={color}
                        stroke="#020617"
                        strokeWidth="0.5"
                        className="cursor-default"
                      >
                        <title>{`${ds.label}: ${p.value}${unit ? ` ${unit}` : ''}`}</title>
                      </circle>
                    ))}
                  </g>
                );
              })}
            </svg>

            {/* X-axis labels */}
            <div className="flex justify-between mt-1 px-1">
              {labels.map((label, idx) => (
                <span key={idx} className="text-xs text-slate-500 whitespace-nowrap">{label}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
