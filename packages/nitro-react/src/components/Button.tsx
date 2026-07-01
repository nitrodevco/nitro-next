import { type ButtonHTMLAttributes, forwardRef } from 'react';

import { cn, cva } from '#base/utils';

const buttonVariants = cva(
    'inline-flex items-center justify-center gap-1.5 rounded-sm text-sm font-semibold transition-all duration-100 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none',
    {
        variants: {
            variant: {
                primary: 'bg-habbo-gold text-habbo-bg border border-habbo-gold-dark shadow-[inset_0_1px_0_rgba(255,255,255,0.3),inset_0_-1px_0_rgba(0,0,0,0.3)] hover:bg-habbo-gold-light active:shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)]',
                secondary: 'bg-habbo-panel-mid text-habbo-text border border-habbo-border shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] hover:bg-habbo-panel-hover active:shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)]',
                ghost: 'bg-transparent text-habbo-text-muted hover:bg-habbo-panel-mid hover:text-habbo-text',
                danger: 'bg-habbo-danger text-white border border-red-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] hover:bg-red-500 active:shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)]',
                link: 'bg-transparent text-habbo-gold underline-offset-2 hover:underline p-0 h-auto',
            },
            size: {
                sm: 'h-6 px-2 text-xs',
                md: 'h-7 px-3 text-sm',
                lg: 'h-9 px-5 text-base',
                icon: 'h-7 w-7 p-0',
            },
        },
        defaultVariants: {
            variant: 'secondary',
            size: 'md',
        },
    }
);

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'link';
    size?: 'sm' | 'md' | 'lg' | 'icon';
    className?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, ...props }, ref) => (
        <button
            ref={ref}
            className={cn(buttonVariants({ variant, size }), className)}
            {...props}
        />
    )
);
Button.displayName = 'Button';