import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';

import { Box } from './Box';
import { VariantCascadeProvider } from './cascade';
import { useThemeVariant } from './hooks';
import { BackgroundLayer } from './layer';
import { expandSides, ThemeProps, ThemeVariant, wrapTextChildren } from './utils';

export type TooltipVariant = ThemeVariant;

export interface TooltipProps extends ThemeProps<TooltipVariant> {
    children?: ReactNode;
}

/** Flash's `ToolTipController` (`tooltip`): the tooltip window's skin behind its caption - see `TooltipLayer`. */
export const Tooltip: ForwardRefExoticComponent<TooltipProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, TooltipProps>(
    ({ variant, defaultVariant, tooltip, tooltipDelay, layout, tintColor, textStyle, textColor, visible, children, onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap }, ref) => {
        const { ownCascade, config, handlers, resolvedLayer, resolvedOverlay, resolvedTint, resolvedTextStyle, resolvedTextColor } = useThemeVariant<TooltipVariant>({
            cascadeKey: 'tooltip', variant, defaultVariant, tooltip, tooltipDelay, tintColor, textStyle, textColor, onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
        });

        return (
            <Box
                ref={ref}
                visible={visible}
                layout={{ ...expandSides(config.layout), ...expandSides(layout) }}
                {...handlers}
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
