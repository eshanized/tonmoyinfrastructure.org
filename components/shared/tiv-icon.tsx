import {
  Code2,
  Terminal,
  Boxes,
  Globe,
  Server,
  Cloud,
  Network,
  Radio,
  Cable,
  Waypoints,
  Waves,
  BrainCircuit,
  Cpu,
  FlaskConical,
  Microscope,
  BookOpen,
  ShieldCheck,
  Lock,
  FileText,
  Scale,
  TrendingUp,
  GitBranch,
  Briefcase,
  Users,
  Mail,
  MessageSquare,
  ArrowUpRight,
  ArrowRight,
  Truck,
  Plane,
  Package,
  Database,
  Building2,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const iconMap: Record<string, LucideIcon> = {
  code: Code2,
  terminal: Terminal,
  boxes: Boxes,
  globe: Globe,
  server: Server,
  cloud: Cloud,
  network: Network,
  router: Radio,
  radio: Radio,
  cable: Cable,
  waypoints: Waypoints,
  waves: Waves,
  brain: BrainCircuit,
  cpu: Cpu,
  flask: FlaskConical,
  microscope: Microscope,
  book: BookOpen,
  shield: ShieldCheck,
  lock: Lock,
  file: FileText,
  scale: Scale,
  chart: TrendingUp,
  git: GitBranch,
  briefcase: Briefcase,
  users: Users,
  mail: Mail,
  message: MessageSquare,
  arrowUpRight: ArrowUpRight,
  arrowRight: ArrowRight,
  truck: Truck,
  plane: Plane,
  package: Package,
  database: Database,
  building: Building2,
};

export function TivIcon({
  name,
  className,
  size = 20,
  ...props
}: {
  name: string;
  className?: string;
  size?: number;
  [key: string]: unknown;
}) {
  const Icon = iconMap[name] || Code2;
  return (
    <Icon
      className={cn(className)}
      size={size}
      aria-hidden="true"
      {...props}
    />
  );
}

export function getProjectTypeIcon(type: string): string {
  const map: Record<string, string> = {
    software: 'code',
    infrastructure: 'server',
    network: 'network',
    research: 'flask',
  };
  return map[type] || 'code';
}

export function getResearchAreaIcon(icon: string): string {
  const map: Record<string, string> = {
    brain: 'brain',
    network: 'network',
    fiber: 'waves',
    server: 'server',
    cpu: 'cpu',
    code: 'code',
  };
  return map[icon] || 'flask';
}
