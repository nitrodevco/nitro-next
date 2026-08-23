import './utils/pixiElements';

import type { Container as PixiContainer, FederatedPointerEvent } from 'pixi.js';
import { forwardRef, type ForwardRefExoticComponent, type PointerEventHandler, type RefAttributes } from 'react';

import { getRenderMode, THEME_URLS } from '#base/theme-core';

import { Box, type BoxLayout } from './Box';
import { BackgroundLayer } from './layer';
import { usePixiTexture } from './utils/usePixiTexture';
import { useResolvedVariant } from './utils/useResolvedVariant';

interface ScalerVariant {
    textureKey: string;
    /** '0'/'1'/'2' share one shine overlay texture; '3'/'4'/'100' have none. */
    overlayTextureKey?: string;
    /** theme/Scaler.tsx's `scalerOffsetVariantsConfig`: only '0' and '3' position the
     *  scaler at the bottom-right corner (with `z-20`) - '1'/'2'/'4'/'100' define no
     *  offset class at all in DOM, leaving them unpositioned (top-left of whatever
     *  ancestor establishes the positioning context). Preserved as-is rather than
     *  "fixed", since it's real (if likely unintentional) DOM behavior. */
    offset: boolean;
}

/** Only '100' (DOM's fully-empty, no-visual, no-offset variant) has no texture. */
const SCALER_VARIANTS: Partial<Record<string, ScalerVariant>> = {
    0: { textureKey: 'scaler-0-default-src', overlayTextureKey: 'scaler-0-default-shine-src', offset: true },
    1: { textureKey: 'scaler-0-default-src', overlayTextureKey: 'scaler-0-default-shine-src', offset: false },
    2: { textureKey: 'scaler-0-default-src', overlayTextureKey: 'scaler-0-default-shine-src', offset: false },
    3: { textureKey: 'scaler-src', offset: true },
    4: { textureKey: 'scaler-src', offset: false },
};

export type ScalerDirection = 'x' | 'y' | 'all' | 'none';

export interface ScalerProps {
    variant?: string;
    defaultVariant?: string;
    layout?: BoxLayout;
    direction?: ScalerDirection;
    onPointerDown?: (event: FederatedPointerEvent) => void;
}

const CURSOR_BY_DIRECTION: Record<ScalerDirection, string> = {
    x: 'ew-resize',
    y: 'ns-resize',
    all: 'nwse-resize',
    none: 'default',
};

export const Scaler: ForwardRefExoticComponent<ScalerProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, ScalerProps>(
    ({ variant, defaultVariant, layout, direction = 'all', onPointerDown }, ref) => {
        const { resolvedVariant } = useResolvedVariant('scaler', variant, defaultVariant);
        const config = SCALER_VARIANTS[resolvedVariant];
        const isDom = getRenderMode() === 'dom';
        const texture = usePixiTexture(isDom ? undefined : config?.textureKey);
        const domUrl = isDom && config?.textureKey ? THEME_URLS[config.textureKey] : undefined;

        // theme/Scaler.tsx still renders variant '100' (fully empty/inert) and
        // direction 'none' (just without cursor/touch-action classes) - this port hides
        // both instead, since an invisible, non-interactive resize handle has no
        // observable difference from not rendering it at all.
        if (!config || (isDom ? !domUrl : !texture) || direction === 'none') return null;

        return (
            <Box
                ref={ref}
                zIndex={config.offset ? 20 : undefined}
                layout={{
                    position: 'absolute',
                    ...(config.offset && { right: 0, bottom: 0 }),
                    ...(!isDom && { width: texture!.width, height: texture!.height }),
                    ...layout,
                }}
            >
                {isDom
                    ? (
                            <img
                                src={domUrl}
                                style={{ display: 'block', cursor: CURSOR_BY_DIRECTION[direction], imageRendering: 'pixelated' }}
                                onPointerDown={onPointerDown as unknown as PointerEventHandler}
                            />
                        )
                    : (
                            <pixiSprite
                                texture={texture}
                                width={texture!.width}
                                height={texture!.height}
                                eventMode="static"
                                cursor={CURSOR_BY_DIRECTION[direction]}
                                layout={{}}
                                onPointerDown={onPointerDown}
                            />
                        )}
                {config.overlayTextureKey && <BackgroundLayer layer={{ kind: 'sprite', textureKey: config.overlayTextureKey }} />}
            </Box>
        );
    },
);

Scaler.displayName = 'Scaler';
