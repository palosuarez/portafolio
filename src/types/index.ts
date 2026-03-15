// ── TIPOS · pan_dev portfolio ──

export interface Project {
  id: string;
  title: string;
  description: string;
  stack: string[];
  links: {
    github?: string;
    demo?: string;
    case?: string;
  };
  impact?: string;
  featured?: boolean;
  status: 'live' | 'wip' | 'archived';
}

export interface Badge {
  id: string;
  name: string;
  issuer: string;
  date: string;
  category: 'ai' | 'frontend' | 'backend' | 'devops' | 'cloud';
  credlyUrl: string;
  inProgress?: boolean;
}

export interface Experience {
  period: string;
  role: string;
  company: string;
  stack: string[];
  highlights: string[];
  current?: boolean;
}
