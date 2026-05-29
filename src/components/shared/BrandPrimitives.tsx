import * as React from 'react';
import { cn } from '@/lib/utils';

interface BrandContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function BrandContainer({ children, className }: BrandContainerProps) {
  return <div className={cn('fm-container', className)}>{children}</div>;
}

interface SurfaceProps {
  children: React.ReactNode;
  className?: string;
  soft?: boolean;
}

export function Surface({ children, className, soft = false }: SurfaceProps) {
  return <article className={cn(soft ? 'fm-surface-soft' : 'fm-surface', className)}>{children}</article>;
}

interface SectionHeadingProps {
  kicker?: string;
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeading({ kicker, title, description, className }: SectionHeadingProps) {
  return (
    <header className={cn(className)}>
      {kicker ? <p className="fm-shell-muted text-sm uppercase tracking-[0.2em]">{kicker}</p> : null}
      <h2 className="fm-display mt-2 text-3xl font-bold text-white sm:text-4xl">{title}</h2>
      {description ? <p className="fm-shell-muted mt-3 max-w-3xl text-sm leading-7 sm:text-base">{description}</p> : null}
    </header>
  );
}

interface RiskPillProps {
  level: 'low' | 'medium' | 'high';
  label: string;
  className?: string;
}

export function RiskPill({ level, label, className }: RiskPillProps) {
  const styles = {
    low: 'fm-risk-low',
    medium: 'fm-risk-medium',
    high: 'fm-risk-high',
  };

  return <span className={cn('rounded-full px-3 py-1 text-xs font-semibold', styles[level], className)}>{label}</span>;
}
