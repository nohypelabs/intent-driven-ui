'use client';

import { UIWidget } from '@/shared/schemas/widget-schema';
import { AnalyticsCardWidget } from './widgets/analytics-widget';
import { ActionCardWidget } from './widgets/action-card-widget';
import { DataTableWidget } from './widgets/data-table-widget';
import { ListCardWidget } from './widgets/list-card-widget';
import { ChartWidget } from './widgets/chart-widget';
import { CalendarWidget } from './widgets/calendar-widget';
import { StepFlowWidget } from './widgets/step-flow-widget';
import { EmptyStateWidget } from './widgets/empty-state-widget';
import { AlertCircle } from 'lucide-react';

interface WidgetRendererProps {
  widget: UIWidget;
  onSuggestionClick?: (suggestion: string) => void;
}

function WidgetErrorFallback({ type }: { type: string }) {
  return (
    <div className="w-full max-w-md p-5 bg-slate-900 border border-rose-500/30 rounded-2xl shadow-xl">
      <div className="flex items-center gap-2 text-rose-400">
        <AlertCircle className="w-4 h-4" />
        <span className="text-xs font-semibold">Failed to render {type} widget</span>
      </div>
    </div>
  );
}

export function WidgetRenderer({ widget, onSuggestionClick }: WidgetRendererProps) {
  try {
    switch (widget.type) {
      case 'ANALYTICS_CARD':
        return <AnalyticsCardWidget {...widget} />;

      case 'ACTION_CONFIRMATION':
        return (
          <ActionCardWidget
            {...widget}
            onConfirm={async (id) => {
              console.log('Action Confirmed:', id);
            }}
          />
        );

      case 'DATA_TABLE':
        return <DataTableWidget {...widget} />;

      case 'LIST_CARD':
        return <ListCardWidget {...widget} />;

      case 'CHART_WIDGET':
        return <ChartWidget {...widget} />;

      case 'CALENDAR_WIDGET':
        return <CalendarWidget {...widget} />;

      case 'STEP_FLOW_WIDGET':
        return <StepFlowWidget {...widget} />;

      case 'EMPTY_STATE':
        return (
          <EmptyStateWidget
            {...widget}
            onSuggestionClick={onSuggestionClick}
          />
        );

      default:
        return <WidgetErrorFallback type="unknown" />;
    }
  } catch {
    return <WidgetErrorFallback type={widget.type} />;
  }
}
