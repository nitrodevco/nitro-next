import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, RefAttributes } from 'react';

import { Box } from './Box';
import { usePixiTexture, useThemeVariant } from './hooks';
import { BackgroundLayer, Stretch } from './layer';
import { ThemeImage } from './ThemeImage';
import { expandSides, ThemeProps, ThemeVariant, ThemeVariants } from './utils';

export type ScalerVariant = ThemeVariant;

/**
 * Over the content area (20), because `_FRAME_SCALER` is the last child of every frame's
 * window layout - the content's own background drew over the corner otherwise.
 */
const SCALER_Z_INDEX = 30;

const CURSOR_BY_DIRECTION: Record<ScalerDirection, string> = {
    x: 'ew-resize',
    y: 'ns-resize',
    all: 'nwse-resize',
    none: 'default',
};

/*
 * The layout is where the frame's window layout puts `_FRAME_SCALER`, as insets from the frame's
 * own edges: `habbo_window_layout_frame` has it at (25, 25) 15x15 of 40x40 and `_3` at (41, 40)
 * 20x20 of 64x64. Each is tagged `_COLORIZE`, so the piece takes the window's colour, which
 * `Frame` hands down; `habbo_skin_scaler`'s `shine` is the one piece left out of it
 * (`colorize="false"`), so it is an untinted overlay.
 *
 * Written out per style rather than built by a helper: `theme_skin.py` reads these tables for the
 * texture key each layer names, and a helper's parameter hides it.
 */
const SCALER_VARIANTS: ThemeVariants<ScalerVariant> = {
    0: {
        layer: Stretch('scaler-0-default-src'),
        overlay: Stretch('scaler-0-default-shine-src'),
        layout: { position: 'absolute', right: 0, bottom: 0, width: 15, height: 15 },
    },
    1: {
        layer: Stretch('scaler-0-default-src'),
        overlay: Stretch('scaler-0-default-shine-src'),
        layout: { position: 'absolute', right: 0, bottom: 0, width: 15, height: 15 },
    },
    2: {
        layer: Stretch('scaler-0-default-src'),
        overlay: Stretch('scaler-0-default-shine-src'),
        layout: { position: 'absolute', right: 0, bottom: 0, width: 15, height: 15 },
    },
    3: {
        layer: Stretch('scaler-3-default-src'),
        layout: { position: 'absolute', right: 3, bottom: 4, width: 20, height: 20 },
    },
    /*
     * Style 4 is `habbo_skin_scaler_3` as well, so it draws style 3's piece - and so does a style 7
     * frame, which cascades to this style: Flash has no scaler row of its own for 7, only a taller
     * frame template (`habbo_window_layout_frame_7`) that sits the same piece 13 up from its
     * bottom instead of 4.
     */
    4: {
        layer: Stretch('scaler-3-default-src'),
        layout: { position: 'absolute', right: 3, bottom: 4, width: 20, height: 20 },
    },
    // `renderer="null"`: a scaler with no art, as big as its layout makes it
    100: {
        zIndex: 20,
    },
};

export type ScalerDirection = 'x' | 'y' | 'all' | 'none';

export interface ScalerProps extends ThemeProps<ScalerVariant> {
    direction?: ScalerDirection;
}

export const Scaler: ForwardRefExoticComponent<ScalerProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, ScalerProps>(
    ({
        variant, defaultVariant, tooltip, tooltipDelay, layout, tintColor, textStyle, textColor, visible, direction = 'all',
        onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
    }, ref) => {
        const { config, handlers, resolvedLayer, resolvedOverlay, resolvedTint } = useThemeVariant({
            cascadeKey: 'scaler', variants: SCALER_VARIANTS, variant, defaultVariant, tooltip, tooltipDelay, tintColor, textStyle, textColor,
            onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
        });

        // The skin's own size: Flash's scaler is as big as its bitmap unless its layout says otherwise.
        const skinTexture = usePixiTexture((resolvedLayer?.kind === 'sprite') ? resolvedLayer.textureKey : undefined);

        if (!config || direction === 'none') return null;

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
                    zIndex={config.zIndex ?? SCALER_Z_INDEX}
                    {...handlers}
                    cursor={CURSOR_BY_DIRECTION[direction]}
                    layout={{ position: 'absolute', ...config.layout, ...layout }}
                />
            );
        }

        // A skin with its shine laid over it: sized to the skin bitmap, which both layers stretch to.
        return (
            <Box
                ref={ref}
                visible={visible}
                zIndex={config.zIndex ?? SCALER_Z_INDEX}
                layout={{
                    position: 'absolute',
                    width: skinTexture?.width,
                    height: skinTexture?.height,
                    ...expandSides(config.layout),
                    ...expandSides(layout),
                }}
                {...handlers}
                cursor={CURSOR_BY_DIRECTION[direction]}
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

Scaler.displayName = 'Scaler';
