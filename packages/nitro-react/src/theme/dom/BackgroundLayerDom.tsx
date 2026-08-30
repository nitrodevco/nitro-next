import { CSSProperties } from 'react';

import { useThemeImageUrl } from '../hooks/useThemeImageUrl';
import { BackgroundLayerConfig, CompositeLayerPieceProps } from '../layer';
import { SpriteFrame } from '../utils/spriteFrame';
import { getThemeSprite, ThemeSliceEffect, themeSpriteFillStyle, themeSpriteNativeStyle } from '../utils/themeSprites';

export interface BackgroundLayerDomProps {
    layer: BackgroundLayerConfig | undefined;
    tintColor?: string;
    style?: CSSProperties;
}

const FILL_STYLE: CSSProperties = { position: 'absolute', inset: 0 };
const PLAIN: ThemeSliceEffect = { kind: 'plain' };

/**
 * The background CSS that shows one theme sprite in a box. Untinted sprites are drawn straight
 * out of the shared atlas image (`background-position`/`-size` pick the rect - no per-sprite
 * image at all); a tinted one, or any sprite while the atlas hasn't loaded, uses its own
 * standalone image (sliced and recoloured once per key + colour, see `useThemeImageUrl`).
 *
 * `frame` selects a sub-frame (an icon out of the icon sheet) at its native size; without it
 * the sprite fills the box.
 */
const useSpriteBackground = (textureKey: string | undefined, tintColor: string | undefined, frame?: SpriteFrame): CSSProperties | undefined => {
    const sprite = getThemeSprite(textureKey);
    const effect: ThemeSliceEffect = tintColor ? { kind: 'tint', color: tintColor } : PLAIN;
    const sliceUrl = useThemeImageUrl(sprite && !tintColor ? undefined : textureKey, effect);

    if (sprite && !tintColor) return frame ? themeSpriteNativeStyle(sprite, frame) : themeSpriteFillStyle(sprite);
    if (!sliceUrl) return undefined;

    return frame
        ? { backgroundImage: `url(${sliceUrl})`, backgroundPosition: `-${frame.x}px -${frame.y}px`, backgroundRepeat: 'no-repeat' }
        : { backgroundImage: `url(${sliceUrl})`, backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat' };
};

const CompositePieceDom = ({ piece, tintColor }: { piece: CompositeLayerPieceProps; tintColor?: string }) => {
    const background = useSpriteBackground(piece.textureKey, tintColor);

    if (!background) return null;

    // Same start-inset pinning as `CompositeLayer.tsx`'s sprite: an axis with neither inset set
    // must not drift to the flex static position - unless the piece asks to be centred.
    const left = piece.left ?? (piece.right === undefined && !piece.alignSelf ? 0 : undefined);
    const top = piece.top ?? (piece.bottom === undefined && !piece.alignSelf ? 0 : undefined);

    return (
        <div style={{
            position: 'absolute',
            top, left, right: piece.right, bottom: piece.bottom,
            width: piece.width, height: piece.height,
            alignSelf: piece.alignSelf,
            ...background,
            imageRendering: 'pixelated',
        }}
        />
    );
};

/**
 * DOM counterpart to `theme/layer/BackgroundLayer.tsx`, switching on the same
 * `BackgroundLayerConfig.kind` discriminant to emit CSS instead of Pixi sprites:
 * - `nineSlice` -> `border-image`, which reproduces the stretched-corners/tiled-edges shape.
 *   `border-image` can only take a whole image, so this is one of the two kinds that use a
 *   standalone slice of the atlas (cached per key + tint) rather than the atlas itself.
 * - `sprite` -> `background-image` out of the atlas, filling the box (or a `frame` at its
 *   native size).
 * - `tile` -> `background-image` with `repeat` on both axes (`TilingSprite`'s behaviour: it
 *   tiles along whichever axis the box exceeds the texture); `background-repeat` can't repeat
 *   a sub-rect of a sheet either, so this is the other standalone-slice kind.
 * - `composite` -> one absolutely-positioned child div per piece, each out of the atlas.
 *
 * Tint recolours the art itself (multiply + alpha clip, done once per key + colour on the
 * atlas slice) rather than overlaying a blend-mode div, so it matches Pixi's sprite `tint`.
 */
export const BackgroundLayerDom = ({ layer, tintColor, style }: BackgroundLayerDomProps) => {
    const box = style ?? FILL_STYLE;
    const standaloneKey = layer && (layer.kind === 'nineSlice' || layer.kind === 'tile') ? layer.textureKey : undefined;
    const standaloneUrl = useThemeImageUrl(standaloneKey, tintColor ? { kind: 'tint', color: tintColor } : PLAIN);
    const spriteBackground = useSpriteBackground(layer?.kind === 'sprite' ? layer.textureKey : undefined, tintColor, layer?.kind === 'sprite' ? layer.frame : undefined);

    if (!layer) return null;

    switch (layer.kind) {
        case 'nineSlice': {
            if (!standaloneUrl) return null;

            const slice = `${layer.topHeight} ${layer.rightWidth} ${layer.bottomHeight} ${layer.leftWidth} fill`;
            // `border-image-width` (and the layout `border-width` reserved for it) defaults to
            // matching the slice per side; a `borderWidth` override trims a side to 0 without
            // drawing it - see `NineSliceBorderWidth`.
            const top = layer.borderWidth?.top ?? layer.topHeight;
            const right = layer.borderWidth?.right ?? layer.rightWidth;
            const bottom = layer.borderWidth?.bottom ?? layer.bottomHeight;
            const left = layer.borderWidth?.left ?? layer.leftWidth;
            const width = `${top}px ${right}px ${bottom}px ${left}px`;
            // Shorthand order is horizontal then vertical - see `NineSliceRepeatAxis`.
            const repeat = `${layer.repeat === 'x' ? 'repeat' : 'stretch'} ${layer.repeat === 'y' ? 'repeat' : 'stretch'}`;

            return (
                <div style={{
                    ...box,
                    borderStyle: 'solid',
                    borderColor: 'transparent',
                    borderWidth: width,
                    borderImageSource: `url(${standaloneUrl})`,
                    borderImageSlice: slice,
                    borderImageWidth: width,
                    borderImageRepeat: repeat,
                    imageRendering: 'pixelated',
                }}
                />
            );
        }

        case 'sprite': {
            if (!spriteBackground) return null;

            return <div style={{ ...box, ...spriteBackground, imageRendering: 'pixelated' }} />;
        }

        case 'tile': {
            if (!standaloneUrl) return null;

            return (
                <div style={{
                    ...box,
                    backgroundImage: `url(${standaloneUrl})`,
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
