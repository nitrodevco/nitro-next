import { FC, InputHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../theme/utils/classNameUtils';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: ReactNode;
  error?: string;
  helper?: string;
  variant?: 'default' | 'filled' | 'outlined';
  fullWidth?: boolean;
}

export const TextField: FC<TextFieldProps> = ({
  label,
  error,
  helper,
  variant = 'default',
  fullWidth = false,
  className,
  ...props
}) => {
  const variantClasses = {
    default: 'bg-white border border-[var(--color-border)] focus:border-[var(--color-ring)]',
    filled: 'bg-[var(--color-muted)] border-0 border-b-2 border-[var(--color-border)] focus:border-[var(--color-primary)]',
    outlined: 'bg-transparent border-2 border-[var(--color-border)] focus:border-[var(--color-primary)]',
  };

  return (
    <div className={cn(fullWidth && 'w-full')}>
      {label && (
        <label className="block text-sm font-medium text-[var(--color-foreground)] mb-1">
          {label}
        </label>
      )}
      <input
        className={cn(
          'px-3 py-2 text-sm rounded transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-0',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          variantClasses[variant],
          error && 'border-red-500 focus:ring-red-500',
          fullWidth && 'w-full',
          className
        )}
        {...props}
      />
      {error && (
        <span className="text-xs text-red-600 mt-1 block">{error}</span>
      )}
      {helper && !error && (
        <span className="text-xs text-[var(--color-mutedForeground)] mt-1 block">{helper}</span>
      )}
    </div>
  );
};
