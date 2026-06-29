import { type HTMLAttributes } from 'react';

import { cn, cva } from '#base/lib/utils';

const badgeVariants = cva(
    'inline-flex items-center px-1.5 py-0.5 rounded text-xs font-semibold',
    {
        variants: {
            variant: {
                default: 'bg-habbo-panel-mid text-habbo-text-muted border border-habbo-border-light',
                gold:    'bg-habbo-gold text-habbo-bg',
                online:  'bg-habbo-online text-white',
                danger:  'bg-habbo-danger text-white',
            },
        },
        defaultVariants: { variant: 'default' },
    }
);

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    variant?: 'default' | 'gold' | 'online' | 'danger';
    className?: string;
}

export const Badge = ({ className, variant, ...props }: BadgeProps) => (
    <span className={badgeVariants({ variant, className })} {...props} />
);
