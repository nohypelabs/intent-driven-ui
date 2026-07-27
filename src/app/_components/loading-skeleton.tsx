'use client';

export function LoadingSkeleton() {
  return (
    <div className="w-full max-w-md p-5 bg-slate-900/80 border border-slate-800/60 rounded-2xl shadow-xl space-y-4 animate-pulse backdrop-blur-sm">
      {/* Header skeleton */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/60">
        <div className="h-3 w-24 bg-slate-800 rounded" />
        <div className="h-8 w-8 bg-slate-800 rounded-lg" />
      </div>

      {/* Metric skeleton */}
      <div className="flex items-baseline justify-between">
        <div className="h-9 w-32 bg-slate-800 rounded" />
        <div className="h-6 w-16 bg-slate-800 rounded-full" />
      </div>

      {/* Description skeleton */}
      <div className="space-y-1.5">
        <div className="h-2.5 w-full bg-slate-800 rounded" />
        <div className="h-2.5 w-3/4 bg-slate-800 rounded" />
      </div>

      {/* Action skeleton */}
      <div className="pt-3 border-t border-slate-800/60">
        <div className="h-10 w-full bg-slate-800 rounded-xl" />
      </div>
    </div>
  );
}
