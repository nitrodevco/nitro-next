import { type ButtonHTMLAttributes, forwardRef } from 'react';

import { cn, cva } from '#base/utils';

const buttonVariants = cva(
    'flex items-center pointer-events-auto cursor-pointer',
    {
        variants: {
            variant: {
                infostand: '[border-image-source:var(--infostand-button-bg)] [border-image-slice:3_3_3_3_fill] [border-image-width:3px] text-white font-goldfish hover:[border-image-source:var(--infostand-button-hover-bg)] active:[border-image-source:var(--infostand-button-active-bg)]',
            },
            size: {
                sm: 'text-[9px] h-6.25 p-2'
            },
        },
        defaultVariants: {
            variant: 'infostand',
            size: 'sm',
        },
    }
);

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'infostand';
    size?: 'sm';
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