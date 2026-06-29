import { type InputHTMLAttributes, forwardRef } from 'react';

import { cn } from '#base/lib/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => (
        <input
            type={type}
            ref={ref}
            className={cn(
                'w-full h-7 px-2 rounded-sm text-sm',
                'bg-habbo-bg border border-habbo-border-light',
                'text-habbo-text placeholder:text-habbo-text-faint',
                'focus:border-habbo-highlight focus:ring-1 focus:ring-habbo-highlight/40',
                'transition-colors duration-100',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                className
            )}
            {...props}
        />
    )
);
Input.displayName = 'Input';
