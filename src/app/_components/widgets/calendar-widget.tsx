'use client';

import { Calendar } from 'lucide-react';
import { CalendarWidgetSchema } from '@/shared/schemas/widget-schema';
import { z } from 'zod';

type CalendarWidgetProps = z.infer<typeof CalendarWidgetSchema>;

const eventTypeStyles = {
  meeting: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
  deadline: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
  reminder: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  task: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
};

export function CalendarWidget({ title, events, currentMonth }: CalendarWidgetProps) {
  const [year, month] = currentMonth.split('-').map(Number);
  const daysInMonth = new Date(year, month, 0).getDate();
  const firstDayOfWeek = new Date(year, month - 1, 1).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const padding = Array.from({ length: firstDayOfWeek }, (_, i) => i);

  const getEventsForDay = (day: number) => {
    const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter((e) => e.date === dateStr);
  };

  const monthName = new Date(year, month - 1).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });

  return (
    <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-800 flex items-center gap-2 bg-slate-900/50">
        <Calendar className="w-4 h-4 text-slate-400" />
        <h3 className="text-sm font-semibold text-slate-200">{title}</h3>
        <span className="ml-auto text-[10px] text-slate-500">{monthName}</span>
      </div>

      <div className="p-5">
        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map((d) => (
            <div key={d} className="text-center text-[10px] font-medium text-slate-500 py-1">
              {d}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {padding.map((p) => (
            <div key={`pad-${p}`} className="h-8" />
          ))}
          {days.map((day) => {
            const dayEvents = getEventsForDay(day);
            const hasEvent = dayEvents.length > 0;
            const isToday = new Date().getDate() === day && new Date().getMonth() + 1 === month && new Date().getFullYear() === year;

            return (
              <div
                key={day}
                className={`h-8 flex items-center justify-center rounded-lg text-[11px] relative ${
                  isToday
                    ? 'bg-indigo-600 text-white font-bold'
                    : hasEvent
                    ? 'bg-slate-800 text-slate-200 font-medium'
                    : 'text-slate-400 hover:bg-slate-800/50'
                } transition-colors cursor-default`}
              >
                {day}
                {hasEvent && !isToday && (
                  <div className="absolute -bottom-0.5 w-1 h-1 rounded-full bg-indigo-400" />
                )}
              </div>
            );
          })}
        </div>

        {/* Events List */}
        {events.length > 0 && (
          <div className="mt-4 pt-3 border-t border-slate-800 space-y-2">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Upcoming</span>
            {events.slice(0, 4).map((event, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className={`px-1.5 py-0.5 rounded text-[9px] font-medium border ${eventTypeStyles[event.type ?? 'task']}`}>
                  {event.type ?? 'task'}
                </div>
                <span className="text-[11px] text-slate-300 flex-1">{event.title}</span>
                {event.time && <span className="text-[10px] text-slate-500">{event.time}</span>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
