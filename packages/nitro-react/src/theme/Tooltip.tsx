import { forwardRef, type HTMLAttributes } from 'react';

import { cn, cva, useCascadedVariant, VariantCascadeProvider, type VariantProps } from './utils';
import { VARIANT_CASCADE_CONFIG } from './VariantConfig';

const tooltipVariantsConfig = {
    variant: {
        // default
        // habbo_window_layout_tooltip: 20x22 minimum, 6px side margins, u_tool_tip text (white)
        '0': '[border-image-source:var(--tooltip-0-default-src)] [border-image-slice:6_6_6_6_fill] [border-image-width:6px_6px_6px_6px] nine-slice-border min-w-5 min-h-5.5 pl-1.5 pt-0 pr-1.5 pb-0 text-style-u-tool-tip',
    },
} as const;

const tooltipVariants = cva(
    '',
    {
        variants: tooltipVariantsConfig,
        defaultVariants: {
            variant: '0',
        },
    }
);

type TooltipVariantProps = VariantProps<typeof tooltipVariantsConfig>;

interface TooltipProps extends HTMLAttributes<HTMLDivElement>, TooltipVariantProps {
    className?: string;
    defaultVariant?: string;
}

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
    ({ className, variant, defaultVariant, children, ...props }, ref) => {
        const cascadedVariant = useCascadedVariant('tooltip');
        const resolvedVariant = (variant ?? cascadedVariant ?? defaultVariant ?? '0') as never;
        const ownCascade = VARIANT_CASCADE_CONFIG['tooltip']?.[resolvedVariant];
        return (
            <div
                ref={ref}
                className={cn(tooltipVariants({ variant: resolvedVariant }), className)}
                {...props}
            >
                <VariantCascadeProvider map={ownCascade}>{children}</VariantCascadeProvider>
            </div>
        );
    }
);

Tooltip.displayName = 'Tooltip';
