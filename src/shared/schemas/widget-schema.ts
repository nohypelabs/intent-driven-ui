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
  title: z.string().describe('Judul ringkas metrik, maksimal 5 kata'),
  metric: z.string().describe('Nilai utama metrik, contoh: "+34.2%", "1,250 USDT"'),
  trend: z.enum(['up', 'down', 'neutral']).describe('Arah tren metrik'),
  description: z.string().describe('Penjelasan konteks singkat metrik'),
  icon: z.string().optional().describe('Nama ikon Lucide, contoh: "DollarSign", "Users"'),
});

export const ActionConfirmationWidgetSchema = z.object({
  type: z.literal('ACTION_CONFIRMATION'),
  actionName: z.string().describe('Nama aksi utama yang perlu dikonfirmasi'),
  payloadSummary: z.string().describe('Ringkasan rincian parameter aksi'),
  confirmText: z.string().describe('Label tombol konfirmasi'),
  actionId: z.string().describe('ID unik aksi, format: act_xxx'),
  severity: z.enum(['low', 'medium', 'high']).optional().describe('Tingkat kepentingan aksi'),
});

export const DataTableWidgetSchema = z.object({
  type: z.literal('DATA_TABLE'),
  title: z.string().describe('Judul tabel data'),
  headers: z.array(z.string()).describe('Daftar nama kolom tabel'),
  rows: z.array(z.array(z.string())).describe('Array 2D berisi isi baris data'),
  footer: z.string().optional().describe('Catatan kaki tabel'),
});

export const ListCardWidgetSchema = z.object({
  type: z.literal('LIST_CARD'),
  title: z.string().describe('Judul daftar'),
  items: z.array(z.object({
    label: z.string().describe('Nama item'),
    value: z.string().describe('Nilai/deskripsi item'),
    status: z.enum(['active', 'inactive', 'pending', 'completed', 'error']).optional().describe('Status item'),
    badge: z.string().optional().describe('Badge label, contoh: "NEW", "URGENT"'),
  })).describe('Daftar item'),
  maxVisible: z.number().optional().describe('Jumlah item maksimal yang ditampilkan'),
});

export const ChartWidgetSchema = z.object({
  type: z.literal('CHART_WIDGET'),
  title: z.string().describe('Judul chart'),
  chartType: z.enum(['bar', 'line', 'area']).describe('Jenis chart'),
  labels: z.array(z.string()).describe('Label sumbu X'),
  datasets: z.array(z.object({
    label: z.string().describe('Nama dataset'),
    data: z.array(z.number()).describe('Nilai data'),
    color: z.string().optional().describe('Warna dataset, contoh: "#6366f1"'),
  })).describe('Dataset chart'),
  unit: z.string().optional().describe('Satuan nilai, contoh: "USD", "%"'),
});

export const CalendarWidgetSchema = z.object({
  type: z.literal('CALENDAR_WIDGET'),
  title: z.string().describe('Judul kalender/jadwal'),
  events: z.array(z.object({
    date: z.string().describe('Tanggal event, format: YYYY-MM-DD'),
    title: z.string().describe('Judul event'),
    time: z.string().optional().describe('Waktu event, contoh: "14:00 - 15:30"'),
    type: z.enum(['meeting', 'deadline', 'reminder', 'task']).optional().describe('Tipe event'),
  })).describe('Daftar event'),
  currentMonth: z.string().describe('Bulan saat ini, contoh: "2026-07"'),
});

export const StepFlowWidgetSchema = z.object({
  type: z.literal('STEP_FLOW_WIDGET'),
  title: z.string().describe('Judul alur proses'),
  steps: z.array(z.object({
    label: z.string().describe('Nama langkah'),
    description: z.string().optional().describe('Deskripsi langkah'),
    status: z.enum(['completed', 'current', 'pending', 'error']).describe('Status langkah'),
  })).describe('Daftar langkah'),
  currentStep: z.number().describe('Index langkah aktif (0-based)'),
});

export const EmptyStateWidgetSchema = z.object({
  type: z.literal('EMPTY_STATE'),
  message: z.string().describe('Pesan ramah bahwa instruksi tidak memerlukan UI khusus'),
  suggestions: z.array(z.string()).optional().describe('Saran perintah yang bisa dicoba'),
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
