import { type LabelHTMLAttributes, forwardRef } from 'react';

import { cn } from '#base/lib/utils';

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
    className?: string;
}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
    ({ className, ...props }, ref) => (
        <label
            ref={ref}
            className={cn(
                'text-xs font-semibold text-habbo-text-muted uppercase tracking-wide cursor-pointer',
                className
            )}
            {...props}
        />
    )
);
Label.displayName = 'Label';
