import { FC, ButtonHTMLAttributes, ReactNode } from 'react';
import { useTheme } from '../../theme/hooks/useTheme';
import { cn } from '../../theme/utils/classNameUtils';

type ButtonVariant = 'primary' | 'secondary' | 'destructive' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  isLoading?: boolean;
  fullWidth?: boolean;
}

export const Button: FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  isLoading = false,
  fullWidth = false,
  className,
  disabled,
  ...props
}) => {
  const { theme } = useTheme();

  const baseClasses = 'relative inline-flex items-center justify-center font-medium transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variantClasses = {
    primary: `text-black font-bold py-2 px-4 border-2 border-gray-600 bg-gradient-to-b from-[var(--color-buttonPrimary)] to-[var(--color-buttonPrimaryActive)] hover:from-[var(--color-buttonPrimaryHover)] hover:to-[var(--color-buttonPrimaryActive)] active:from-[var(--color-buttonPrimaryActive)] active:to-[var(--color-buttonPrimaryActive)] shadow-md hover:shadow-lg`,
    secondary: `text-black font-bold py-2 px-4 border-2 border-gray-600 bg-gradient-to-b from-[var(--color-buttonSecondary)] to-[var(--color-buttonSecondaryActive)] hover:from-[var(--color-buttonSecondaryHover)] hover:to-[var(--color-buttonSecondaryActive)] active:from-[var(--color-buttonSecondaryActive)] active:to-[var(--color-buttonSecondaryActive)] shadow-md hover:shadow-lg`,
    destructive: `text-white font-bold py-2 px-4 border-2 border-red-800 bg-gradient-to-b from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 active:from-red-700 active:to-red-900 shadow-md hover:shadow-lg`,
    outline: `text-[var(--color-foreground)] py-2 px-4 border-2 border-[var(--color-border)] hover:bg-[var(--color-muted)] active:bg-gray-300`,
    ghost: `text-[var(--color-foreground)] py-1 px-2 hover:bg-[var(--color-muted)] active:bg-gray-300`,
  };

  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-2',
    lg: 'text-base px-4 py-3',
  };

  const classes = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    fullWidth && 'w-full',
    className
  );

  return (
    <button
      className={classes}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      {children}
    </button>
  );
};
