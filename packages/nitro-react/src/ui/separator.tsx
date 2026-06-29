import { cn } from '#base/lib/utils';

interface SeparatorProps {
    orientation?: 'horizontal' | 'vertical';
    className?: string;
}

export const Separator = ({ orientation = 'horizontal', className }: SeparatorProps) => (
    <div
        role="separator"
        className={cn(
            'bg-habbo-border-light/50 shrink-0',
            orientation === 'horizontal' ? 'h-px w-full my-1' : 'w-px h-full mx-1',
            className
        )}
    />
);
