import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, RefAttributes } from 'react';

import { Box } from './Box';
import { useThemeVariant } from './hooks';
import { BackgroundLayer } from './layer';
import { ThemeProps } from './utils';
import { CLOSE_BUTTON_VARIANTS, CloseButtonVariant } from './variants/closeButton';

export type CloseButtonProps = ThemeProps<CloseButtonVariant>;

export const CloseButton: ForwardRefExoticComponent<CloseButtonProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, CloseButtonProps>(
    ({
        variant, defaultVariant, layout, tintColor, textStyle, textColor, visible,
        onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
    }, ref) => {
        const { config, handlers, resolvedLayer, resolvedOverlay, resolvedTint } = useThemeVariant({
            cascadeKey: 'closeButton', variants: CLOSE_BUTTON_VARIANTS, variant, defaultVariant, tintColor, textStyle, textColor, stopsPropagation: true, onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
        });

        return (
            <Box
                ref={ref}
                visible={visible}
                layout={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    ...config.layout,
                    ...layout,
                }}
                cursor="pointer"
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
