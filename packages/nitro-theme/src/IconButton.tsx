/**
 * The Flash `iconbutton`: a button whose whole face is one fixed-size bitmap per render state,
 * with no caption and no children. The client only ever defines two of them - the ubuntu skin's
 * 22x22 "+" (`habbo_skin_button_plus_3`, `plus_button_skin_3`) and "-"
 * (`habbo_skin_button_minus_3`) - both cut from `habbo_skin_ubuntu_png` and both `scale="fixed"`
 * in their layout, so the art is never stretched.
 */
import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, RefAttributes } from 'react';

import { Box } from './Box';
import { useThemeVariant } from './hooks';
import { BackgroundLayer } from './layer';
import { ThemeImage } from './ThemeImage';
import { expandSides, ThemeProps, ThemeWithStatesVariant } from './utils';

export type IconButtonVariant = ThemeWithStatesVariant;

export interface IconButtonProps extends ThemeProps<IconButtonVariant> {
    disabled?: boolean;
    selected?: boolean;
}

export const IconButton: ForwardRefExoticComponent<IconButtonProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, IconButtonProps>(
    ({
        // There is no style 0 to fall back on, so the "+" is the default rather than `useThemeVariant`'s.
        variant, defaultVariant = '3', tooltip, tooltipDelay, layout, tintColor, textStyle, textColor, visible, disabled, selected,
        onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
    }, ref) => {
        const { config, handlers, resolvedLayer, resolvedOverlay, resolvedTint } = useThemeVariant<IconButtonVariant>({
            cascadeKey: 'iconButton', variant, defaultVariant, tooltip, tooltipDelay, tintColor, textStyle, textColor, disabled, selected,
            onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
        });

        // The skin is a single sprite with nothing layered over it, so the sprite is the button.
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
            </Box>
        );
    },
);

IconButton.displayName = 'IconButton';
