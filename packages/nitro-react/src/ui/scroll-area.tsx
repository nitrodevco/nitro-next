import { type HTMLAttributes } from 'react';

import { cn } from '#base/lib/utils';

interface ScrollAreaProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
}

export const ScrollArea = ({ className, children, ...props }: ScrollAreaProps) => (
    <div
        className={cn('overflow-auto', className)}
        {...props}
    >
        {children}
    </div>
);
