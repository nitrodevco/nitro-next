import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';

import { Box } from './Box';
import { VariantCascadeProvider } from './cascade';
import { useThemeVariant } from './hooks';
import { BackgroundLayer, NineSlice } from './layer';
import { ThemeProps, ThemeVariant, ThemeVariants, wrapTextChildren } from './utils';

type TooltipVariant = ThemeVariant;

const TOOLTIP_VARIANTS: ThemeVariants<TooltipVariant> = {
    // default
    0: {
        layer: NineSlice('tooltip-0-default-src', 6, 6, 6, 6),
        layout: { minWidth: 20, minHeight: 22, paddingLeft: 6, paddingRight: 6 },
    },
};

export interface TooltipProps extends ThemeProps<TooltipVariant> {
    children?: ReactNode;
}

export const Tooltip: ForwardRefExoticComponent<TooltipProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, TooltipProps>(
    ({ variant, defaultVariant, layout, tintColor, textStyle, textColor, children }, ref) => {
        const { ownCascade, config, resolvedLayer, resolvedOverlay, resolvedTint, resolvedTextStyle, resolvedTextColor } = useThemeVariant({
            cascadeKey: 'tooltip', variants: TOOLTIP_VARIANTS, variant, defaultVariant, tintColor, textStyle, textColor,
        });

        return (
            <Box
                ref={ref}
                layout={{ ...config.layout, ...layout }}
            >
                {resolvedLayer && (
                    <BackgroundLayer
                        layer={resolvedLayer}
                        tintColor={resolvedTint}
                    />
                )}
                {resolvedOverlay && <BackgroundLayer layer={resolvedOverlay} />}
                <VariantCascadeProvider map={ownCascade}>
                    {wrapTextChildren(children, { textStyle: resolvedTextStyle, textColor: resolvedTextColor })}
                </VariantCascadeProvider>
            </Box>
        );
    },
);

Tooltip.displayName = 'Tooltip';
