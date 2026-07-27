'use client';

import { Table as TableIcon } from 'lucide-react';
import { DataTableWidgetSchema } from '@/shared/schemas/widget-schema';
import { z } from 'zod';

type DataTableProps = z.infer<typeof DataTableWidgetSchema>;

export function DataTableWidget({ title, headers, rows, footer }: DataTableProps) {
  return (
    <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-800/60 flex items-center gap-2 bg-slate-900/50">
        <TableIcon className="w-4 h-4 text-slate-400" />
        <h3 className="text-sm font-semibold text-slate-200">{title}</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-950/60 text-slate-400 font-medium uppercase tracking-wider border-b border-slate-800">
            <tr>
              {headers.map((header, idx) => (
                <th key={idx} className="px-5 py-3">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/40">
            {rows.map((row, rowIdx) => (
              <tr
                key={rowIdx}
                className={`hover:bg-slate-800/40 transition-colors duration-150 ${
                  rowIdx % 2 === 1 ? 'bg-slate-900/30' : ''
                }`}
              >
                {row.map((cell, cellIdx) => (
                  <td key={cellIdx} className="px-5 py-3 whitespace-nowrap">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {footer && (
        <div className="px-5 py-3 border-t border-slate-800/60 bg-slate-900/50 text-center">
          <p className="text-xs text-slate-500 italic">{footer}</p>
        </div>
      )}
    </div>
  );
}
