import { z } from 'zod';

export const WidgetTypeEnum = z.enum([
  'ANALYTICS_CARD',
  'ACTION_CONFIRMATION',
  'DATA_TABLE',
  'LIST_CARD',
  'CHART_WIDGET',
  'CALENDAR_WIDGET',
  'STEP_FLOW_WIDGET',
  'EMPTY_STATE',
]);

export const AnalyticsWidgetSchema = z.object({
  type: z.literal('ANALYTICS_CARD'),
  title: z.string().describe('Brief metric title, max 5 words'),
  metric: z.string().describe('Main metric value, e.g.: "+34.2%", "1,250 USDT"'),
  trend: z.enum(['up', 'down', 'neutral']).describe('Metric trend direction'),
  description: z.string().describe('Brief contextual explanation of the metric'),
  icon: z.string().optional().describe('Lucide icon name, e.g.: "DollarSign", "Users"'),
});

export const ActionConfirmationWidgetSchema = z.object({
  type: z.literal('ACTION_CONFIRMATION'),
  actionName: z.string().describe('Main action name that needs confirmation'),
  payloadSummary: z.string().describe('Summary of action parameters'),
  confirmText: z.string().describe('Confirmation button label'),
  actionId: z.string().describe('Unique action ID, format: act_xxx'),
  severity: z.enum(['low', 'medium', 'high']).optional().describe('Action importance level'),
});

export const DataTableWidgetSchema = z.object({
  type: z.literal('DATA_TABLE'),
  title: z.string().describe('Data table title'),
  headers: z.array(z.string()).describe('List of column names'),
  rows: z.array(z.array(z.string())).describe('2D array of row data'),
  footer: z.string().optional().describe('Table footer note'),
});

export const ListCardWidgetSchema = z.object({
  type: z.literal('LIST_CARD'),
  title: z.string().describe('List title'),
  items: z.array(z.object({
    label: z.string().describe('Item name'),
    value: z.string().describe('Item value/description'),
    status: z.enum(['active', 'inactive', 'pending', 'completed', 'error']).optional().describe('Item status'),
    badge: z.string().optional().describe('Badge label, e.g.: "NEW", "URGENT"'),
  })).describe('List of items'),
  maxVisible: z.number().optional().describe('Maximum number of items to display'),
});

export const ChartWidgetSchema = z.object({
  type: z.literal('CHART_WIDGET'),
  title: z.string().describe('Chart title'),
  chartType: z.enum(['bar', 'line', 'area']).describe('Chart type'),
  labels: z.array(z.string()).describe('X-axis labels'),
  datasets: z.array(z.object({
    label: z.string().describe('Dataset name'),
    data: z.array(z.number()).describe('Data values'),
    color: z.string().optional().describe('Dataset color, e.g.: "#6366f1"'),
  })).describe('Chart datasets'),
  unit: z.string().optional().describe('Value unit, e.g.: "USD", "%"'),
});

export const CalendarWidgetSchema = z.object({
  type: z.literal('CALENDAR_WIDGET'),
  title: z.string().describe('Calendar/schedule title'),
  events: z.array(z.object({
    date: z.string().describe('Event date, format: YYYY-MM-DD'),
    title: z.string().describe('Event title'),
    time: z.string().optional().describe('Event time, e.g.: "14:00 - 15:30"'),
    type: z.enum(['meeting', 'deadline', 'reminder', 'task']).optional().describe('Event type'),
  })).describe('List of events'),
  currentMonth: z.string().describe('Current month, e.g.: "2026-07"'),
});

export const StepFlowWidgetSchema = z.object({
  type: z.literal('STEP_FLOW_WIDGET'),
  title: z.string().describe('Process flow title'),
  steps: z.array(z.object({
    label: z.string().describe('Step name'),
    description: z.string().optional().describe('Step description'),
    status: z.enum(['completed', 'current', 'pending', 'error']).describe('Step status'),
  })).describe('List of steps'),
});

export const EmptyStateWidgetSchema = z.object({
  type: z.literal('EMPTY_STATE'),
  message: z.string().describe('Friendly message when instruction does not require a specific UI'),
  suggestions: z.array(z.string()).optional().describe('Suggested commands to try'),
});

export const UIWidgetSchema = z.discriminatedUnion('type', [
  AnalyticsWidgetSchema,
  ActionConfirmationWidgetSchema,
  DataTableWidgetSchema,
  ListCardWidgetSchema,
  ChartWidgetSchema,
  CalendarWidgetSchema,
  StepFlowWidgetSchema,
  EmptyStateWidgetSchema,
]);

export type UIWidget = z.infer<typeof UIWidgetSchema>;
export type WidgetType = z.infer<typeof WidgetTypeEnum>;
