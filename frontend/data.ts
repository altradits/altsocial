import { WorkflowStep, PricingPackage } from './types';

export const workflowData: WorkflowStep[] = [
  {
    id: 'compose',
    stepNumber: '01',
    title: 'Capture the Moment',
    description: 'Write one core message or upload a photo. Do not worry about platform rules. Just share your authentic thought to inspire, educate, or entertain.',
    iconName: 'PenTool',
    highlights: [
      'Unified smart composer',
      'Drag-and-drop media uploads',
      'Drafts sync across devices',
      'Distraction-free writing mode'
    ]
  },
  {
    id: 'tailor',
    stepNumber: '02',
    title: 'Precision Tailoring',
    description: 'Altradits automatically adapts your post for each platform. Professional for LinkedIn, punchy for Twitter, visual for Instagram.',
    iconName: 'Wand2',
    highlights: [
      'Platform-specific character limits',
      'Auto-formatting for LinkedIn',
      'Smart hashtag suggestions',
      'Image cropping & optimization'
    ]
  },
  {
    id: 'schedule',
    stepNumber: '03',
    title: 'Set It & Forget It',
    description: 'Schedule your tailored posts across all accounts with a single click. Our visual calendar keeps your strategy running smoothly.',
    iconName: 'CalendarClock',
    highlights: [
      'Visual drag-and-drop calendar',
      'Best time to post predictions',
      'Queue management',
      'Timezone-aware scheduling'
    ]
  },
  {
    id: 'live',
    stepNumber: '04',
    title: 'Live Life Beyond the Desk',
    description: 'Close your laptop. Altradits publishes precisely on time while you concentrate on doing what makes you happy.',
    iconName: 'Coffee',
    highlights: [
      'Automated publishing',
      'Unified analytics dashboard',
      'Engagement tracking',
      'Weekly performance reports'
    ]
  }
];

export const pricingData: PricingPackage[] = [
  {
    id: 'creator',
    name: 'Creator',
    price: '$19',
    interval: '/month',
    description: 'Perfect for individuals building their personal brand across networks.',
    features: [
      '1 Workspace',
      'Up to 5 Social Profiles',
      'Unlimited Scheduled Posts',
      'Smart AI Tailoring',
      'Basic Analytics'
    ]
  },
  {
    id: 'pro',
    name: 'Professional',
    price: '$49',
    interval: '/month',
    description: 'For dedicated creators and founders who need precision and scale.',
    isPopular: true,
    features: [
      '3 Workspaces',
      'Up to 15 Social Profiles',
      'Unlimited Scheduled Posts',
      'Advanced AI Tailoring',
      'Deep Analytics & Reports',
      'Priority Support'
    ]
  },
  {
    id: 'agency',
    name: 'Agency',
    price: '$129',
    interval: '/month',
    description: 'For teams managing multiple brands and client accounts.',
    features: [
      'Unlimited Workspaces',
      'Unlimited Social Profiles',
      'Team Collaboration (5 seats)',
      'Approval Workflows',
      'White-label Reports',
      'Dedicated Success Manager'
    ]
  }
];