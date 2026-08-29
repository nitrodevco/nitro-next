import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';

import { Box } from './Box';
import { BubblePointer } from './BubblePointer';
import { VariantCascadeProvider } from './cascade';
import { useThemeVariant } from './hooks';
import { BackgroundLayer } from './layer';
import { ThemeProps, wrapTextChildren } from './utils';
import { BUBBLE_VARIANTS, BubbleVariant, PointerDirection } from './variants/bubble';

const POINTER_FLEX_DIRECTION: Record<PointerDirection, 'row' | 'row-reverse' | 'column' | 'column-reverse'> = {
    down: 'column',
    up: 'column-reverse',
    left: 'row-reverse',
    right: 'row',
};

export interface BubbleProps extends ThemeProps<BubbleVariant> {
    usePointer?: boolean;
    pointer?: PointerDirection;
    children?: ReactNode;
}

export const Bubble: ForwardRefExoticComponent<BubbleProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, BubbleProps>(
    ({ variant, defaultVariant, layout, tintColor, textStyle, textColor, visible, usePointer = true, pointer = 'down', children, onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap }, ref) => {
        const { ownCascade, config, handlers, resolvedLayer, resolvedTint, resolvedTextStyle, resolvedTextColor } = useThemeVariant<BubbleVariant>({
            cascadeKey: 'bubble', variants: BUBBLE_VARIANTS, variant, defaultVariant, tintColor, textStyle, textColor, onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
        });

        return (
            <Box
                layout={{ flexDirection: POINTER_FLEX_DIRECTION[pointer], alignItems: 'center' }}
                {...handlers}
            >
                <Box
                    ref={ref}
                    visible={visible}
                    layout={{ ...config.layout, ...layout }}
                >
                    <BackgroundLayer
                        layer={resolvedLayer}
                        tintColor={resolvedTint}
                    />
                    <VariantCascadeProvider map={ownCascade}>
                        {wrapTextChildren(children, { textStyle: resolvedTextStyle, textColor: resolvedTextColor })}
                    </VariantCascadeProvider>
                </Box>
                <VariantCascadeProvider map={ownCascade}>
                    {usePointer && (
                        <BubblePointer
                            direction={pointer}
                            tintColor={resolvedTint}
                        />
                    )}
                </VariantCascadeProvider>
            </Box>
        );
    },
);

Bubble.displayName = 'Bubble';
