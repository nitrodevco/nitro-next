import { CSSProperties } from 'react';

import { useTintedImageUrl } from '../hooks';
import { BackgroundLayerConfig, CompositeLayerPieceProps } from '../layer';
import { THEME_URLS } from '../utils';

export interface BackgroundLayerDomProps {
    layer: BackgroundLayerConfig | undefined;
    tintColor?: string;
    style?: CSSProperties;
}

const FILL_STYLE: CSSProperties = { position: 'absolute', inset: 0 };

const CompositePieceDom = ({ piece, tintColor }: { piece: CompositeLayerPieceProps; tintColor?: string }) => {
    const url = THEME_URLS[piece.textureKey];
    const tintedUrl = useTintedImageUrl(tintColor ? url : undefined, tintColor);

    if (!url) return null;

    // Same start-inset pinning as `CompositePieceSprite.tsx`: an axis with neither inset set
    // must not drift to the flex static position now that generated layouts set
    // `justifyContent: 'center'` on boxes that hold centred ported children.
    const left = piece.left ?? (piece.right === undefined ? 0 : undefined);
    const top = piece.top ?? (piece.bottom === undefined ? 0 : undefined);

    return (
        <div style={{
            position: 'absolute',
            top, left, right: piece.right, bottom: piece.bottom,
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
 * - `tile` -> `background-image` with `repeat` (both axes), matching `TilingSprite`'s own
 *   behavior: it tiles the texture at its native size along whichever axis the assigned box
 *   exceeds that size, on both axes at once if both do - there's no single fixed tiling axis
 *   across callers (`Header`'s full-bleed background/shine tiles horizontally; `Scrollbar
 *   SliderBarVertical`'s grip tiles vertically; `ScrollbarSliderBarHorizontal`'s pressed overlay
 *   tiles horizontally). `repeat-repeat` mirrors that unconditionally - on whichever axis the
 *   box happens to match the texture's native size exactly, tiling there is a visual no-op
 *   (one repetition), so it's safe for every caller without needing to know which axis it is.
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

        case 'sprite': {
            if (!url) return null;

            // A `frame` crops a sub-region out of a shared spritesheet via `background-position`
            // - same technique `ThemeImage.tsx`'s `ImageDom` already uses - rather than stretching
            // the whole source image to fill the box, so `backgroundSize` is deliberately left
            // unset (defaults to the image's own native resolution) instead of `100% 100%`.
            return (
                <div style={{
                    ...box,
                    backgroundImage: `url(${url})`,
                    backgroundPosition: layer.frame ? `-${layer.frame.x}px -${layer.frame.y}px` : undefined,
                    backgroundSize: layer.frame ? undefined : '100% 100%',
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
