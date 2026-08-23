import type { CSSProperties } from 'react';

import { THEME_URLS } from '#base/theme-core';

import type { BackgroundLayerConfig } from '../layer';

export interface BackgroundLayerDomProps {
    layer: BackgroundLayerConfig | undefined;
    tintColor?: string;
    /** Positioning/sizing override for the rendered layer div - defaults to absolute-fill,
     *  matching every Pixi leaf layer's own `layout ?? FillLayout` default. */
    style?: CSSProperties;
}

const FILL_STYLE: CSSProperties = { position: 'absolute', inset: 0 };

/**
 * DOM counterpart to `theme-pixi/layer/BackgroundLayer.tsx`, switching on the exact same
 * `BackgroundLayerConfig.kind` discriminant to emit CSS instead of Pixi sprites:
 * - `nineSlice` -> `border-image` (the same technique the deleted legacy `theme/` DOM package
 *   used), which naturally reproduces the stretched-corners/tiled-edges 9-slice shape.
 * - `stretch`/`sprite` -> `background-image` sized to fill (both kinds already render
 *   identically on the Pixi side today - see `SpriteLayer.tsx`, which every `BackgroundLayer`
 *   call for either kind defaults to `FillLayout` for - so this mirrors that, not a new choice).
 * - `tile` -> `background-image` with `repeat`, matching `TilingSprite`'s natural-size tiling.
 * - `composite` -> one absolutely-positioned child div per piece, sized exactly like
 *   `CompositePieceSprite.tsx`'s own `layout` (`top`/`left`/`right`/`bottom`/`width`/`height`).
 *
 * Tint is a CSS approximation, not pixel-perfect: a `mix-blend-mode: multiply` overlay masked
 * to the layer's own shape via `mask-image` (plain kinds) or `-webkit-mask-box-image-*`
 * (nine-slice, so the mask follows the stretched border shape rather than the raw source
 * image's rectangle). Degrades to untinted, not broken, wherever unsupported.
 */
export const BackgroundLayerDom = ({ layer, tintColor, style }: BackgroundLayerDomProps) => {
    if (!layer) return null;

    const box = style ?? FILL_STYLE;

    switch (layer.kind) {
        case 'nineSlice': {
            const url = THEME_URLS[layer.textureKey];

            if (!url) return null;

            const slice = `${layer.topHeight} ${layer.rightWidth} ${layer.bottomHeight} ${layer.leftWidth} fill`;
            const width = `${layer.topHeight}px ${layer.rightWidth}px ${layer.bottomHeight}px ${layer.leftWidth}px`;

            return (
                <div style={{
                    ...box,
                    borderStyle: 'solid',
                    borderColor: 'transparent',
                    borderWidth: width,
                    borderImageSource: `url(${url})`,
                    borderImageSlice: slice,
                    borderImageWidth: width,
                    borderImageRepeat: 'stretch',
                    imageRendering: 'pixelated',
                }}
                >
                    {tintColor && (
                        <div style={{
                            position: 'absolute', inset: 0,
                            backgroundColor: tintColor,
                            mixBlendMode: 'multiply',
                            WebkitMaskBoxImageSource: `url(${url})`,
                            WebkitMaskBoxImageSlice: slice,
                            WebkitMaskBoxImageWidth: width,
                            WebkitMaskBoxImageRepeat: 'stretch',
                        }}
                        />
                    )}
                </div>
            );
        }

        case 'stretch':
        case 'sprite': {
            const url = THEME_URLS[layer.textureKey];

            if (!url) return null;

            return (
                <div style={{
                    ...box,
                    backgroundImage: `url(${url})`,
                    backgroundSize: '100% 100%',
                    backgroundRepeat: 'no-repeat',
                    imageRendering: 'pixelated',
                }}
                >
                    {tintColor && (
                        <div style={{
                            position: 'absolute', inset: 0,
                            backgroundColor: tintColor,
                            mixBlendMode: 'multiply',
                            WebkitMaskImage: `url(${url})`,
                            maskImage: `url(${url})`,
                            WebkitMaskSize: '100% 100%',
                            maskSize: '100% 100%',
                        }}
                        />
                    )}
                </div>
            );
        }

        case 'tile': {
            const url = THEME_URLS[layer.textureKey];

            if (!url) return null;

            return (
                <div style={{
                    ...box,
                    backgroundImage: `url(${url})`,
                    backgroundRepeat: 'repeat',
                    imageRendering: 'pixelated',
                }}
                >
                    {tintColor && (
                        <div style={{
                            position: 'absolute', inset: 0,
                            backgroundColor: tintColor,
                            mixBlendMode: 'multiply',
                            WebkitMaskImage: `url(${url})`,
                            maskImage: `url(${url})`,
                            WebkitMaskRepeat: 'repeat',
                            maskRepeat: 'repeat',
                        }}
                        />
                    )}
                </div>
            );
        }

        case 'composite':
            return (
                <div style={box}>
                    {layer.pieces.map((piece, i) => {
                        const url = THEME_URLS[piece.textureKey];

                        if (!url) return null;

                        const pieceBox: CSSProperties = {
                            position: 'absolute',
                            top: piece.top, left: piece.left, right: piece.right, bottom: piece.bottom,
                            width: piece.width, height: piece.height,
                        };

                        return (
                            <div
                                key={i}
                                style={pieceBox}
                            >
                                <div style={{
                                    position: 'absolute', inset: 0,
                                    backgroundImage: `url(${url})`,
                                    backgroundSize: '100% 100%',
                                    backgroundRepeat: 'no-repeat',
                                    imageRendering: 'pixelated',
                                }}
                                />
                                {tintColor && (
                                    <div style={{
                                        position: 'absolute', inset: 0,
                                        backgroundColor: tintColor,
                                        mixBlendMode: 'multiply',
                                        WebkitMaskImage: `url(${url})`,
                                        maskImage: `url(${url})`,
                                        WebkitMaskSize: '100% 100%',
                                        maskSize: '100% 100%',
                                    }}
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>
            );

        default:
            return null;
    }
};
