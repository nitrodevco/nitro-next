import { CSSProperties } from 'react';

import { useTintedImageUrl } from '../hooks';
import { BackgroundLayerConfig, CompositePiece } from '../layer';
import { THEME_URLS } from '../utils';

export interface BackgroundLayerDomProps {
    layer: BackgroundLayerConfig | undefined;
    tintColor?: string;
    /** Positioning/sizing override for the rendered layer div - defaults to absolute-fill,
     *  matching every Pixi leaf layer's own `layout ?? FillLayout` default. */
    style?: CSSProperties;
}

const FILL_STYLE: CSSProperties = { position: 'absolute', inset: 0 };

/**
 * One `composite` piece, as its own component rather than inlined in the `.map()` below - a
 * dual-target `BackgroundLayerConfig` piece can have any number of pieces, and `useTintedImageUrl`
 * needs one unconditional hook call per piece, which only works if each piece is a real
 * component instance (its own consistent per-render hook call), not a hook called from inside
 * a loop within a single component.
 */
const CompositePieceDom = ({ piece, tintColor }: { piece: CompositePiece; tintColor?: string }) => {
    const url = THEME_URLS[piece.textureKey];
    const tintedUrl = useTintedImageUrl(tintColor ? url : undefined, tintColor);

    if (!url) return null;

    return (
        <div style={{
            position: 'absolute',
            top: piece.top, left: piece.left, right: piece.right, bottom: piece.bottom,
            width: piece.width, height: piece.height,
        }}
        >
            <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: `url(${tintedUrl ?? url})`,
                backgroundSize: '100% 100%',
                backgroundRepeat: 'no-repeat',
                imageRendering: 'pixelated',
            }}
            />
        </div>
    );
};

/**
 * DOM counterpart to `theme/layer/BackgroundLayer.tsx`, switching on the exact same
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
 * Tint recolors the actual source image (via `useTintedImageUrl` - draw to canvas, multiply
 * the tint color in, clip back to the source's own alpha shape) and uses the tinted result
 * directly as the `background-image`/`border-image-source`, rather than the mask+
 * `mix-blend-mode` overlay div this used to layer on top of the untinted art. `tintedUrl ?? url`
 * falls back to the untinted art immediately, swapping to the tinted version once the canvas
 * pass resolves (asynchronous - an `<img>`/canvas decode can't happen synchronously inline).
 */
export const BackgroundLayerDom = ({ layer, tintColor, style }: BackgroundLayerDomProps) => {
    const box = style ?? FILL_STYLE;

    const baseUrl = layer && layer.kind !== 'composite' ? THEME_URLS[layer.textureKey] : undefined;
    const tintedUrl = useTintedImageUrl(tintColor ? baseUrl : undefined, tintColor);
    const url = tintedUrl ?? baseUrl;

    if (!layer) return null;

    switch (layer.kind) {
        case 'nineSlice': {
            if (!url) return null;

            const slice = `${layer.topHeight} ${layer.rightWidth} ${layer.bottomHeight} ${layer.leftWidth} fill`;
            // `border-image-width` (and, since nothing else sets a `border-width` of its own,
            // the actual layout `border-width` reserved for it) defaults to matching the slice
            // per side - the same value used for both is correct for every nine-slice asset in
            // this theme except the couple (TabButton, TabContent variant 3) whose `borderWidth`
            // override trims a slice side to 0 without drawing it - see
            // `BackgroundLayerConfig.ts`'s `NineSliceBorderWidth` docblock.
            const top = layer.borderWidth?.top ?? layer.topHeight;
            const right = layer.borderWidth?.right ?? layer.rightWidth;
            const bottom = layer.borderWidth?.bottom ?? layer.bottomHeight;
            const left = layer.borderWidth?.left ?? layer.leftWidth;
            const width = `${top}px ${right}px ${bottom}px ${left}px`;
            // Shorthand order is horizontal then vertical - see `NineSliceRepeatAxis`'s docblock.
            const repeat = `${layer.repeat === 'x' ? 'repeat' : 'stretch'} ${layer.repeat === 'y' ? 'repeat' : 'stretch'}`;

            return (
                <div style={{
                    ...box,
                    borderStyle: 'solid',
                    borderColor: 'transparent',
                    borderWidth: width,
                    borderImageSource: `url(${url})`,
                    borderImageSlice: slice,
                    borderImageWidth: width,
                    borderImageRepeat: repeat,
                    imageRendering: 'pixelated',
                }}
                />
            );
        }

        case 'stretch':
        case 'sprite': {
            if (!url) return null;

            return (
                <div style={{
                    ...box,
                    backgroundImage: `url(${url})`,
                    backgroundSize: '100% 100%',
                    backgroundRepeat: 'no-repeat',
                    imageRendering: 'pixelated',
                }}
                />
            );
        }

        case 'tile': {
            if (!url) return null;

            return (
                <div style={{
                    ...box,
                    backgroundImage: `url(${url})`,
                    backgroundRepeat: 'repeat',
                    imageRendering: 'pixelated',
                }}
                />
            );
        }

        case 'composite':
            return (
                <div style={box}>
                    {layer.pieces.map((piece, i) => (
                        <CompositePieceDom
                            key={i}
                            piece={piece}
                            tintColor={tintColor}
                        />
                    ))}
                </div>
            );

        default:
            return null;
    }
};
