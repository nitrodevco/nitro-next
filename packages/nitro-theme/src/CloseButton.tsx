import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, RefAttributes } from 'react';

import { Box } from './Box';
import { useThemeVariant } from './hooks';
import { BackgroundLayer } from './layer';
import { ThemeImage } from './ThemeImage';
import { expandSides, ThemeProps, ThemeWithStatesVariant } from './utils';

export type CloseButtonVariant = ThemeWithStatesVariant;

export type CloseButtonProps = ThemeProps<CloseButtonVariant>;

/**
 * Flash's `CloseButtonController` (`closebutton`): the state's skin, stopping the press so the
 * header it sits in is not dragged by it.
 */
export const CloseButton: ForwardRefExoticComponent<CloseButtonProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, CloseButtonProps>(
    ({
        variant, defaultVariant, tooltip, tooltipDelay, layout, tintColor, textStyle, textColor, visible,
        onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
    }, ref) => {
        const { config, handlers, resolvedLayer, resolvedOverlay, resolvedTint } = useThemeVariant<CloseButtonVariant>({
            cascadeKey: 'closeButton', variant, defaultVariant, tooltip, tooltipDelay, tintColor, textStyle, textColor, stopsPropagation: true, onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
        });

        // A plain sprite skin with nothing layered over it is the sprite itself - one node, no Box.
        if (resolvedLayer?.kind === 'sprite' && !resolvedOverlay) {
            return (
                <ThemeImage
                    ref={ref}
                    textureKey={resolvedLayer.textureKey}
                    frame={resolvedLayer.frame}
                    tint={resolvedTint}
                    stretch
                    visible={visible}
                    {...handlers}
                    layout={{ ...expandSides(config.layout), ...expandSides(layout) }}
                />
            );
        }

        return (
            <Box
                ref={ref}
                visible={visible}
                layout={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    ...expandSides(config.layout),
                    ...expandSides(layout),
                }}
                {...handlers}
            >
                {resolvedLayer && (
                    <BackgroundLayer
                        layer={resolvedLayer}
                        tintColor={resolvedTint}
                    />
                )}
                {resolvedOverlay && <BackgroundLayer layer={resolvedOverlay} />}
            </Box>
        );
    },
);

CloseButton.displayName = 'CloseButton';
