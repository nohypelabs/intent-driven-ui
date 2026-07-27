<div align="center">

# Intent-Driven UI

### AI-Native Dashboard Interface

**Type natural language. Get instant UI.**

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![tRPC](https://img.shields.io/badge/tRPC-11-398FFE?logo=tRPC)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green)

[Live Demo](https://intent-driven-ui.vercel.app) | [Report Bug](https://github.com/nohypelabs/intent-driven-ui/issues) | [Request Feature](https://github.com/nohypelabs/intent-driven-ui/issues)

</div>

---

## What is Intent-Driven UI?

Intent-Driven UI is an **AI-powered dashboard** that transforms natural language instructions into dynamic, interactive UI widgets in real time. Instead of navigating menus and clicking buttons, users simply describe what they want — and the interface assembles itself.

> "Show monthly revenue summary" → Analytics card with trend indicators
> "Schedule a deployment tomorrow" → Calendar widget with event dots
> "Compare user growth across regions" → Data table with hover states

Built with Next.js 16, tRPC, and Google Gemini, this project demonstrates the future of human-computer interaction: **intent-to-interface**.

---

## Key Features

### AI-Powered Widget Generation
- Natural language → structured UI widget via Google Gemini 2.0 Flash
- Zod schema validation ensures type-safe, consistent output
- Low temperature (0.2) for deterministic, reliable results

### 8 Widget Types

| Widget | Use Case | Example Prompt |
|--------|----------|----------------|
| **Analytics Card** | Metrics, KPIs, summaries | "Show monthly revenue summary" |
| **Action Confirmation** | Execute tasks, transactions | "Deploy to production" |
| **Data Table** | Structured data, comparisons | "Compare user growth by region" |
| **List Card** | Status lists, item overviews | "Show recent notifications" |
| **Chart Widget** | Visualizations, trends | "Plot daily active users this week" |
| **Calendar Widget** | Schedules, timelines | "Show deployment schedule" |
| **Step Flow Widget** | Pipelines, processes | "Show CI/CD pipeline status" |
| **Empty State** | Welcome, suggestions | Default greeting with quick prompts |

### Pure CSS Charts
- Bar, line, and area charts rendered with pure CSS
- No Chart.js, D3, or external charting libraries
- Responsive and performant

### Seamless Animations
- Framer Motion-powered enter/exit/layout transitions
- Stacked widget display with smooth stacking
- Loading skeleton while AI processes intent

### Clean Architecture
- Domain-Driven Design with clear separation of concerns
- Use case pattern for business logic
- Infrastructure layer for external integrations (AI, data)
- tRPC for end-to-end type safety

---

## Architecture

```
src/
├── app/                          # Next.js App Router
│   ├── api/trpc/[trpc]/          # tRPC HTTP handler
│   ├── _trpc/                    # Client-side tRPC setup
│   │   ├── client.ts             # Typed tRPC client
│   │   └── Provider.tsx          # QueryClient + httpBatchLink
│   ├── _components/
│   │   ├── widget-renderer.tsx   # Central widget dispatcher
│   │   ├── prompt-input.tsx      # Floating prompt bar
│   │   ├── loading-skeleton.tsx  # Pulse-animated placeholder
│   │   └── widgets/              # 8 widget components
│   ├── layout.tsx                # Root layout (dark theme)
│   └── page.tsx                  # Main dashboard
│
├── server/
│   ├── api/
│   │   ├── root.ts               # App router composition
│   │   ├── context.ts            # Request context
│   │   ├── trpc.ts               # tRPC initialization
│   │   └── routers/intent.ts     # Intent processing endpoint
│   ├── domain/
│   │   ├── entities/intent.ts    # Domain model
│   │   └── use-cases/            # Business logic
│   │       └── process-user-intent.ts
│   └── infrastructure/
│       ├── ai/
│       │   ├── llm-provider.ts   # Gemini integration
│       │   └── prompts.ts        # System prompt
│       └── mock-data/            # Reference data
│
└── shared/
    ├── lib/utils.ts              # cn() helper
    └── schemas/widget-schema.ts  # Zod schemas (discriminated union)
```

### Data Flow

```
User Input (Natural Language)
        │
        ▼
   tRPC Mutation ──────────────────────────────────────┐
        │                                               │
        ▼                                               │
   ProcessUserIntentUseCase                             │
        │                                               │
        ▼                                               │
   LLMProvider.parseIntentToWidget()                    │
        │                                               │
        ▼                                               │
   Google Gemini 2.0 Flash                              │
   (generateObject + UIWidgetSchema)                    │
        │                                               │
        ▼                                               │
   Structured JSON Widget ◄─────────────────────────────┘
        │
        ▼
   WidgetRenderer (switch on type)
        │
        ├── ANALYTICS_CARD     → AnalyticsCardWidget
        ├── ACTION_CONFIRMATION→ ActionCardWidget
        ├── DATA_TABLE         → DataTableWidget
        ├── LIST_CARD          → ListCardWidget
        ├── CHART_WIDGET       → ChartWidget
        ├── CALENDAR_WIDGET    → CalendarWidget
        ├── STEP_FLOW_WIDGET   → StepFlowWidget
        └── EMPTY_STATE        → EmptyStateWidget
```

---

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Framework** | Next.js 16 (App Router) | React framework with server components |
| **Language** | TypeScript 5 | Type safety across the stack |
| **RPC** | tRPC v11 | End-to-end typed API |
| **Data Fetching** | TanStack React Query v5 | Server state management |
| **AI/LLM** | Vercel AI SDK v7 | Structured output with `generateObject` |
| **LLM Provider** | Google Gemini 2.0 Flash | Fast, capable language model |
| **Schema** | Zod v4 | Runtime validation + type inference |
| **Styling** | Tailwind CSS v4 | Utility-first CSS |
| **Animations** | Framer Motion | Smooth enter/exit/layout transitions |
| **Icons** | Lucide React | Consistent icon set |
| **Serialization** | superjson | Enhanced JSON for tRPC |

---

## Getting Started

### Prerequisites

- **Node.js** 18+ (recommended: 20+)
- **pnpm** (recommended) or npm/yarn
- **Google AI Studio API Key** ([Get one here](https://aistudio.google.com/apikey))

### Installation

```bash
# Clone the repository
git clone https://github.com/nohypelabs/intent-driven-ui.git
cd intent-driven-ui

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env
# Edit .env and add your GOOGLE_GENERATIVE_AI_API_KEY

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

```env
# Required: Google AI Studio / Gemini API key
GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here

# Optional: Auto-set on Vercel deployments
VERCEL_URL=localhost:3000
```

---

## Widget System

### Schema-Driven Design

All widgets are defined using Zod schemas with a **discriminated union** on the `type` field. This ensures:

1. **Type safety** — TypeScript knows the exact shape of each widget
2. **Runtime validation** — Invalid widgets are caught before rendering
3. **AI constraint** — Gemini is forced to output valid widget JSON

```typescript
// From src/shared/schemas/widget-schema.ts
const UIWidgetSchema = z.discriminatedUnion('type', [
  AnalyticsWidgetSchema,           // 'ANALYTICS_CARD'
  ActionConfirmationWidgetSchema,  // 'ACTION_CONFIRMATION'
  DataTableWidgetSchema,           // 'DATA_TABLE'
  ListCardWidgetSchema,            // 'LIST_CARD'
  ChartWidgetSchema,               // 'CHART_WIDGET'
  CalendarWidgetSchema,            // 'CALENDAR_WIDGET'
  StepFlowWidgetSchema,            // 'STEP_FLOW_WIDGET'
  EmptyStateWidgetSchema,          // 'EMPTY_STATE'
]);
```

### Adding a New Widget Type

1. **Define the schema** in `src/shared/schemas/widget-schema.ts`:

```typescript
const MyNewWidgetSchema = z.object({
  type: z.literal('MY_NEW_WIDGET'),
  title: z.string(),
  // ... other fields
});
```

2. **Add to the discriminated union**:

```typescript
const UIWidgetSchema = z.discriminatedUnion('type', [
  // ... existing widgets
  MyNewWidgetSchema,
]);
```

3. **Create the component** in `src/app/_components/widgets/my-new-widget.tsx`:

```tsx
export function MyNewWidget({ title }: z.infer<typeof MyNewWidgetSchema>) {
  return <div>{title}</div>;
}
```

4. **Register in the dispatcher** (`src/app/_components/widget-renderer.tsx`):

```tsx
case 'MY_NEW_WIDGET':
  return <MyNewWidget {...widget} />;
```

5. **Update the system prompt** (`src/server/infrastructure/ai/prompts.ts`) to teach Gemini when to use this widget.

---

## Project Structure

### Clean Architecture Layers

| Layer | Directory | Responsibility |
|-------|-----------|---------------|
| **Interface** | `src/server/api/` | tRPC routers, context, HTTP handlers |
| **Domain** | `src/server/domain/` | Entities, use cases, business rules |
| **Infrastructure** | `src/server/infrastructure/` | AI providers, external services, mock data |
| **Presentation** | `src/app/_components/` | React widgets, UI components |
| **Shared** | `src/shared/` | Schemas, utilities, types |

### Key Design Patterns

- **Dependency Injection**: Use cases receive dependencies via constructor
- **Discriminated Unions**: Type-safe widget polymorphism
- **Server-Client Separation**: tRPC handles the boundary cleanly
- **Schema-First AI**: Zod schemas constrain LLM output

---

## API Reference

### tRPC Endpoints

#### `intent.process`

Processes a natural language prompt and returns a UI widget.

**Input:**
```typescript
{
  prompt: string;  // min 1 character
}
```

**Output:**
```typescript
{
  widget: UIWidget;  // discriminated union of 8 widget types
  message: string;   // success message
}
```

**Example:**
```typescript
const result = await trpc.intent.process.mutate({
  prompt: "Show monthly revenue summary"
});
// result.widget = { type: 'ANALYTICS_CARD', title: '...', metric: '...', ... }
```

---

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import repository on [vercel.com](https://vercel.com)
3. Add `GOOGLE_GENERATIVE_AI_API_KEY` in environment variables
4. Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/nohypelabs/intent-driven-ui)

### Manual Build

```bash
pnpm build
pnpm start
```

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style (ESLint + TypeScript strict)
- Add Zod schemas for any new widget types
- Update the system prompt when adding widget types
- Test with various natural language prompts

---

## Roadmap

- [ ] Database persistence (Prisma + PostgreSQL)
- [ ] User authentication & saved dashboards
- [ ] More widget types (maps, code blocks, media players)
- [ ] Multi-LLM support (OpenAI, Anthropic, local models)
- [ ] Widget composition (combine multiple widgets)
- [ ] Real-time data integration (WebSockets)
- [ ] Voice input support
- [ ] Mobile-responsive optimizations
- [ ] Widget export (PNG, PDF)
- [ ] Plugin system for custom widgets

---

## Acknowledgments

- [Vercel AI SDK](https://sdk.vercel.ai) — Structured output with LLMs
- [tRPC](https://trpc.io) — End-to-end type safety
- [Google Gemini](https://ai.google.dev) — Fast, capable language model
- [Framer Motion](https://www.framer.com/motion) — Production-ready animations
- [Tailwind CSS](https://tailwindcss.com) — Utility-first CSS framework

---

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Built with intent. Rendered by AI.**

[⬆ Back to Top](#intent-driven-ui)

</div>
