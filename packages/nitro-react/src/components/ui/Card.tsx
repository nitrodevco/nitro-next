import { FC, ReactNode, HTMLAttributes } from 'react';
import { cn } from '../../theme/utils/classNameUtils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: 'default' | 'elevated' | 'outlined';
}

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const Card: FC<CardProps> = ({
  children,
  variant = 'default',
  className,
  ...props
}) => {
  const variantClasses = {
    default: 'bg-[var(--color-windowBg)] border border-[var(--color-border)]',
    elevated: 'bg-[var(--color-windowBg)] shadow-[var(--shadow-lg)]',
    outlined: 'bg-[var(--color-background)] border-2 border-[var(--color-border)]',
  };

  return (
    <div
      className={cn(
        'rounded-md overflow-hidden',
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader: FC<CardHeaderProps> = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(
        'px-4 py-3 border-b border-[var(--color-border)]',
        'bg-gradient-to-b from-[var(--color-windowHeader)] to-[var(--color-secondary)]',
        'text-white font-bold',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardBody: FC<CardBodyProps> = ({ children, className, ...props }) => {
  return (
    <div
      className={cn('p-4', className)}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardFooter: FC<CardFooterProps> = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(
        'px-4 py-3 border-t border-[var(--color-border)]',
        'bg-[var(--color-muted)] flex gap-2 justify-end',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
