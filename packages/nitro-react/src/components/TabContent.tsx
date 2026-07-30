import { forwardRef, type HTMLAttributes } from 'react';

import { cn, cva, type VariantProps } from '#base/utils';

const tabContentVariantsConfig = {
    variant: {
        // default
        '0': '[border-image-source:var(--border-0-default-src)] [border-image-slice:6_6_6_6_fill] [border-image-width:6px_6px_6px_6px] [border-image-repeat:stretch]',
        // black
        '1': '[border-image-source:var(--border-1-default-src)] [border-image-slice:6_6_6_6_fill] [border-image-width:6px_6px_6px_6px] [border-image-repeat:stretch]',
        // white
        '2': '[border-image-source:var(--border-2-default-src)] [border-image-slice:6_6_6_6_fill] [border-image-width:6px_6px_6px_6px] [border-image-repeat:stretch]',
        // default
        '3': '[border-image-source:var(--tabcontent-3-default-src)] [border-image-slice:15_0_0_0_fill] [border-image-width:15px_0px_0px_0px] [border-image-repeat:stretch] pt-1.5 px-1',
    },
} as const;

const tabContentVariants = cva(
    'flex flex-1 min-h-0 flex-col -mt-0.5 z-10 overflow-hidden',
    {
        variants: tabContentVariantsConfig,
        defaultVariants: {
            variant: '0',
        },
    }
);

type TabContentVariantProps = VariantProps<typeof tabContentVariantsConfig>;

interface TabContentProps extends HTMLAttributes<HTMLDivElement>, TabContentVariantProps {
    className?: string;
}

export const TabContent = forwardRef<HTMLDivElement, TabContentProps>(
    ({ className, variant, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(tabContentVariants({ variant }), className)}
            {...props}
        />
    )
);

TabContent.displayName = 'TabContent';
