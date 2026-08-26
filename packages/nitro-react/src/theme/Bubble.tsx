import { forwardRef, type HTMLAttributes } from 'react';

import { BubblePointer } from './BubblePointer';
import { cn, cva, useCascadedVariant, useTintedVars, VariantCascadeProvider, type VariantProps } from './utils';
import { VARIANT_CASCADE_CONFIG } from './VariantConfig';

const bubbleVariantsConfig = {
    variant: {
        // default
        '0': '[border-image-source:var(--bubble-0-default-src)] [border-image-slice:5_5_6_5_fill] [border-image-width:5px_5px_6px_5px] nine-slice-border min-w-5.25 min-h-5.25 text-[#000000]',
        // habbo_skin_bubble_7 — nine-slice from habbo_skin_ubuntu_png, 7px corners, 8px bottom
        '7': '[border-image-source:var(--bubble-7-default-src)] [border-image-slice:7_7_8_7_fill] [border-image-width:7px_7px_8px_7px] nine-slice-border min-w-5.25 min-h-5.5 text-[#000000]',
    },
} as const;

const bubbleOverlayVariantsConfig = {
    variant: {
        // default
        '0': 'bg-(image:--bubble-0-default-spacer-src) bg-position-[right_0px_bottom_0px] bg-size-[1px_1px] bg-no-repeat pixel-art',
        // default
        '7': '',
    },
} as const;

const bubbleTintColors: Partial<Record<string, string>> = {

};

const bubbleTintableVars: Partial<Record<string, string[]>> = {
    '0': ['bubble-0-default-src'],
    '7': ['bubble-7-default-src'],
};

const bubbleVariants = cva('pointer-events-auto z-10', { variants: bubbleVariantsConfig, defaultVariants: { variant: '0' } });
const bubbleOverlayVariants = cva('', { variants: bubbleOverlayVariantsConfig, defaultVariants: { variant: '0' } });

type BubbleVariantProps = VariantProps<typeof bubbleVariantsConfig>;

interface BubbleProps extends HTMLAttributes<HTMLDivElement>, BubbleVariantProps {
    className?: string;
    tintColor?: string;
    defaultVariant?: string;
    usePointer?: boolean;
    pointer?: 'up' | 'down' | 'left' | 'right';
    pointerOffset?: number;
}

export const Bubble = forwardRef<HTMLDivElement, BubbleProps>(
    ({ className, variant, defaultVariant, tintColor, usePointer = true, pointer = 'down', pointerOffset = 0, style, children, ...props }, ref) => {
        const cascadedVariant = useCascadedVariant('bubble');
        const resolvedVariant = (variant ?? cascadedVariant ?? defaultVariant ?? '0') as never;
        const ownCascade = VARIANT_CASCADE_CONFIG['bubble']?.[resolvedVariant];
        const resolvedTint = tintColor || bubbleTintColors[resolvedVariant as string];
        const overlayClassName = bubbleOverlayVariants({ variant: resolvedVariant });
        const tintStyle = useTintedVars(bubbleTintableVars[resolvedVariant as string], resolvedTint);

        return (
            <div className={cn('flex items-center', (pointer === 'up' || pointer === 'down') && 'flex-col', pointer === 'up' && 'flex-col-reverse', pointer === 'left' && 'flex-row-reverse')}>
                <div
                    ref={ref}
                    className={cn(bubbleVariants({ variant: resolvedVariant }), overlayClassName && 'relative', className)}
                    style={{ ...style, ...tintStyle }}
                    {...props}
                >
                    {overlayClassName && <div aria-hidden className={cn('pointer-events-none absolute inset-0', overlayClassName)} />}
                    <VariantCascadeProvider map={ownCascade}>
                        {children}
                    </VariantCascadeProvider>
                </div>
                <VariantCascadeProvider map={ownCascade}>
                    {usePointer && <BubblePointer className="z-20" direction={pointer} tintColor={resolvedTint} />}
                </VariantCascadeProvider>
            </div>
        );
    }
);

Bubble.displayName = 'Bubble';
