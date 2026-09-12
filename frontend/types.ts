export interface WorkflowStep {
  id: string;
  stepNumber: string;
  title: string;
  description: string;
  iconName: string;
  highlights: string[];
}

export interface PricingPackage {
  id: string;
  name: string;
  price: string;
  interval: string;
  description: string;
  features: string[];
  isPopular?: boolean;
}

export interface Post {
  id: string;
  text: string;
  platforms: string[];
  status: 'draft' | 'scheduled';
  createdAt: number;
  imageUrl?: string;
}