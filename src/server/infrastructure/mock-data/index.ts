import { UIWidget } from '@/shared/schemas/widget-schema';

export const MOCK_ANALYTICS: UIWidget[] = [
  {
    type: 'ANALYTICS_CARD',
    title: 'Total Revenue',
    metric: '$142,500',
    trend: 'up',
    description: 'Up 23.5% from last month. Primary source from Premium subscriptions.',
    icon: 'DollarSign',
  },
  {
    type: 'ANALYTICS_CARD',
    title: 'Active Users',
    metric: '12,847',
    trend: 'up',
    description: 'Active users increased significantly after the new feature launch.',
    icon: 'Users',
  },
  {
    type: 'ANALYTICS_CARD',
    title: 'Conversion Rate',
    metric: '3.24%',
    trend: 'down',
    description: 'Down 0.8% from last week. Landing page optimization needed.',
    icon: 'Target',
  },
  {
    type: 'ANALYTICS_CARD',
    title: 'Server Uptime',
    metric: '99.97%',
    trend: 'neutral',
    description: 'Stable for the last 30 days. Zero downtime incidents.',
    icon: 'Server',
  },
  {
    type: 'ANALYTICS_CARD',
    title: 'Avg Response Time',
    metric: '142ms',
    trend: 'up',
    description: 'Performance improved 15% after database query optimization.',
    icon: 'Zap',
  },
];

export const MOCK_ACTIONS: UIWidget[] = [
  {
    type: 'ACTION_CONFIRMATION',
    actionName: 'Deploy to Production',
    payloadSummary: 'Deploy v2.4.1 to production server (AWS ap-southeast-1). Estimated downtime: ~30 seconds.',
    confirmText: 'Deploy Now',
    actionId: 'act_deploy_prod_' + Date.now(),
    severity: 'high',
  },
  {
    type: 'ACTION_CONFIRMATION',
    actionName: 'Reset User Password',
    payloadSummary: 'Reset password for user admin@company.io. Reset link will be sent via email.',
    confirmText: 'Send Reset Link',
    actionId: 'act_reset_pw_' + Date.now(),
    severity: 'medium',
  },
  {
    type: 'ACTION_CONFIRMATION',
    actionName: 'Purge CDN Cache',
    payloadSummary: 'Purge all cache on Cloudflare CDN. Estimated propagation: 2-5 minutes.',
    confirmText: 'Purge Cache',
    actionId: 'act_purge_' + Date.now(),
    severity: 'low',
  },
];

export const MOCK_TABLES: UIWidget[] = [
  {
    type: 'DATA_TABLE',
    title: 'Top 5 Token Performance',
    headers: ['Token', 'Price', '24h Change', 'Volume', 'Market Cap'],
    rows: [
      ['SOL', '$148.32', '+5.2%', '$2.1B', '$68.4B'],
      ['ETH', '$3,421.80', '+2.8%', '$1.8B', '$411.2B'],
      ['BTC', '$67,234.50', '+1.4%', '$2.8B', '$1.32T'],
      ['JUP', '$1.24', '+12.3%', '$890M', '$1.7B'],
      ['RENDER', '$8.91', '-3.2%', '$340M', '$3.4B'],
    ],
    footer: 'Real-time data from CoinGecko API',
  },
  {
    type: 'DATA_TABLE',
    title: 'Micro-Services Status',
    headers: ['Service', 'Status', 'CPU', 'Memory', 'Uptime'],
    rows: [
      ['api-gateway', 'Running', '12%', '256MB', '14d 6h'],
      ['auth-service', 'Running', '8%', '128MB', '14d 6h'],
      ['payment-service', 'Warning', '78%', '1.2GB', '2d 3h'],
      ['notification-svc', 'Running', '5%', '64MB', '14d 6h'],
      ['analytics-engine', 'Running', '34%', '512MB', '7d 12h'],
    ],
  },
];

export const MOCK_LISTS: UIWidget[] = [
  {
    type: 'LIST_CARD',
    title: 'Sprint Backlog',
    items: [
      { label: 'Implement Intent Parser', value: 'tRPC + Zod schema', status: 'completed', badge: 'DONE' },
      { label: 'Widget Component Library', value: '8 widget types', status: 'active', badge: 'IN PROGRESS' },
      { label: 'Loading Skeleton & Animations', value: 'Framer Motion', status: 'pending' },
      { label: 'Demo Video Recording', value: 'Script + Recording', status: 'pending', badge: 'NEXT' },
      { label: 'Bug: Chart render issue', value: 'Safari compatibility', status: 'error', badge: 'BUG' },
    ],
  },
  {
    type: 'LIST_CARD',
    title: 'System Health Check',
    items: [
      { label: 'API Gateway', value: 'Latency: 45ms', status: 'active' },
      { label: 'Database (PostgreSQL)', value: 'Connection pool: 8/20', status: 'active' },
      { label: 'Redis Cache', value: 'Hit rate: 94.2%', status: 'active' },
      { label: 'CDN Edge Nodes', value: '3/3 healthy', status: 'completed' },
      { label: 'SSL Certificate', value: 'Expires in 45 days', status: 'pending', badge: 'RENEW SOON' },
    ],
  },
];

export const MOCK_CHARTS: UIWidget[] = [
  {
    type: 'CHART_WIDGET',
    title: 'Monthly Revenue (2026)',
    chartType: 'bar',
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Revenue',
        data: [85, 92, 110, 98, 125, 134, 142],
        color: '#6366f1',
      },
      {
        label: 'Expenses',
        data: [65, 70, 72, 68, 80, 85, 82],
        color: '#f43f5e',
      },
    ],
    unit: 'K',
  },
  {
    type: 'CHART_WIDGET',
    title: 'User Growth Trend',
    chartType: 'line',
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'New Users',
        data: [320, 450, 580, 720],
        color: '#10b981',
      },
    ],
  },
];

export const MOCK_CALENDARS: UIWidget[] = [
  {
    type: 'CALENDAR_WIDGET',
    title: 'July 2026 Schedule',
    currentMonth: '2026-07',
    events: [
      { date: '2026-07-25', title: 'Hackathon Kickoff', time: '10:00 - 11:00', type: 'meeting' },
      { date: '2026-07-26', title: 'Build Day 1', time: '09:00 - 18:00', type: 'task' },
      { date: '2026-07-30', title: 'Internal Demo', time: '14:00 - 15:00', type: 'meeting' },
      { date: '2026-07-31', title: 'Submission Deadline', time: '23:59', type: 'deadline' },
      { date: '2026-08-01', title: 'Review Period Starts', type: 'reminder' },
    ],
  },
];

export const MOCK_STEP_FLOWS: UIWidget[] = [
  {
    type: 'STEP_FLOW_WIDGET',
    title: 'Deployment Pipeline',
    steps: [
      { label: 'Code Push', description: 'Push to main branch', status: 'completed' },
      { label: 'CI/CD Build', description: 'Automated build & test', status: 'completed' },
      { label: 'Staging Deploy', description: 'Deploy to staging server', status: 'current' },
      { label: 'QA Review', description: 'Quality assurance check', status: 'pending' },
      { label: 'Production Deploy', description: 'Deploy to production', status: 'pending' },
    ],
    currentStep: 2,
  },
  {
    type: 'STEP_FLOW_WIDGET',
    title: 'User Onboarding',
    steps: [
      { label: 'Registration', description: 'Create new account', status: 'completed' },
      { label: 'Email Verification', description: 'Check email inbox', status: 'completed' },
      { label: 'Complete Profile', description: 'Upload photo & info', status: 'current' },
      { label: 'Choose Plan', description: 'Select subscription plan', status: 'pending' },
    ],
    currentStep: 2,
  },
];

export const MOCK_EMPTY: UIWidget = {
  type: 'EMPTY_STATE',
  message: "Hi! I'm the AI UI Engine. Type any instruction and I'll design the perfect interface for you.",
  suggestions: [
    'Show monthly revenue summary',
    'Create a crypto comparison table',
    'Schedule a deployment tomorrow',
    'Show server status',
    'Build a user onboarding flow',
    'Analyze app performance',
  ],
};

export const ALL_MOCK_DATA: UIWidget[] = [
  ...MOCK_ANALYTICS,
  ...MOCK_ACTIONS,
  ...MOCK_TABLES,
  ...MOCK_LISTS,
  ...MOCK_CHARTS,
  ...MOCK_CALENDARS,
  ...MOCK_STEP_FLOWS,
];
