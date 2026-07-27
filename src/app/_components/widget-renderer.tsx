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

interface WidgetRendererProps {
  widget: UIWidget;
  onSuggestionClick?: (suggestion: string) => void;
}

export function WidgetRenderer({ widget, onSuggestionClick }: WidgetRendererProps) {
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
      return null;
  }
}
