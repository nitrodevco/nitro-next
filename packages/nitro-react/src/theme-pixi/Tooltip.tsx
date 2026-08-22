import './utils/pixiElements';

import type { Container as PixiContainer } from 'pixi.js';
import { forwardRef, type ForwardRefExoticComponent, type ReactNode, type RefAttributes } from 'react';

import { VariantCascadeProvider } from '#base/theme-core';

import { Box } from './Box';
import { BackgroundLayer, NineSlice } from './layer';
import { Text } from './Text';
import { useResolvedVariant, wrapTextChildren } from './utils';
import { ThemeProps, ThemeVariant, ThemeVariants } from './variant';

type TooltipVariant = ThemeVariant;

const TOOLTIP_VARIANTS: ThemeVariants<TooltipVariant> = {
    //default
    '0': {
        layer: NineSlice('tooltip-0-default-src', 6, 6, 6, 6),
        layout: { minWidth: 20, minHeight: 22, paddingLeft: 6, paddingRight: 6 }
    }
}

export interface TooltipProps extends ThemeProps<TooltipVariant> {
    children?: ReactNode;
}

export const Tooltip: ForwardRefExoticComponent<TooltipProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, TooltipProps>(
    ({ variant, defaultVariant, tintColor, textColor, layout, children }, ref) => {
        const { resolvedVariant, ownCascade } = useResolvedVariant('tooltip', variant, defaultVariant);
        const config = TOOLTIP_VARIANTS[resolvedVariant] ?? TOOLTIP_VARIANTS['0'];
        const resolvedLayer = config.layer;
        const resolvedOverlay = config.overlay;
        const resolvedTint = tintColor || config.tintColor;
        const resolvedTextColor = textColor || config.textColor;

        return (
            <Box ref={ref} layout={{ ...config.layout, ...layout }}>
                {resolvedLayer && <BackgroundLayer layer={resolvedLayer} />}
                {resolvedOverlay && <BackgroundLayer layer={resolvedOverlay} />}
                <VariantCascadeProvider map={ownCascade}>
                    {typeof children === 'string'
                        ? <Text text={children} textStyle="text-style-u-tool-tip" />
                        : wrapTextChildren(children)}
                </VariantCascadeProvider>
            </Box>
        );
    }
);

Tooltip.displayName = 'Tooltip';
