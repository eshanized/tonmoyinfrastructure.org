import { cn } from '@/lib/utils';
import { Info, AlertTriangle, CheckCircle } from 'lucide-react';

interface CalloutProps {
  type?: 'info' | 'warning' | 'success';
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const styles = {
  info: {
    border: 'border-blue-500/30',
    bg: 'bg-blue-500/5',
    icon: 'text-blue-500',
    Icon: Info,
  },
  warning: {
    border: 'border-amber-500/30',
    bg: 'bg-amber-500/5',
    icon: 'text-amber-500',
    Icon: AlertTriangle,
  },
  success: {
    border: 'border-green-500/30',
    bg: 'bg-green-500/5',
    icon: 'text-green-500',
    Icon: CheckCircle,
  },
};

export function Callout({
  type = 'info',
  title,
  children,
  className,
}: CalloutProps) {
  const s = styles[type];
  const Icon = s.Icon;

  return (
    <div
      className={cn(
        'flex gap-3 border p-4',
        s.border,
        s.bg,
        className
      )}
    >
      <Icon className={cn('h-5 w-5 flex-shrink-0', s.icon)} />
      <div>
        {title && <p className="mb-1 font-medium text-sm">{title}</p>}
        <div className="text-sm text-muted-foreground">{children}</div>
      </div>
    </div>
  );
}
