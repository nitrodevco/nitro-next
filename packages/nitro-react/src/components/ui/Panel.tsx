import { FC, ReactNode, HTMLAttributes } from 'react';
import { cn } from '../../theme/utils/classNameUtils';

type PanelVariant = 'default' | 'primary' | 'secondary' | 'accent';

interface PanelProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: PanelVariant;
  padded?: boolean;
}

export const Panel: FC<PanelProps> = ({
  children,
  variant = 'default',
  padded = true,
  className,
  ...props
}) => {
  const variantClasses = {
    default: 'bg-[var(--color-background)] border border-[var(--color-border)]',
    primary: 'bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primaryForeground)] text-[var(--color-primaryForeground)]',
    secondary: 'bg-[var(--color-secondary)] text-[var(--color-secondaryForeground)]',
    accent: 'bg-[var(--color-accent)] text-[var(--color-accentForeground)]',
  };

  return (
    <div
      className={cn(
        'rounded-md',
        variantClasses[variant],
        padded && 'p-4',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
