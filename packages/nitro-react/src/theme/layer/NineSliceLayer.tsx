import { Rectangle, Texture } from 'pixi.js';
import { useMemo } from 'react';

import { BoxLayout } from '../Box';
import { BackgroundLayerDom, boxLayoutToStyle } from '../dom';
import { usePixiSilhouetteTexture, usePixiTexture, useSilhouetteImageUrl } from '../hooks';
import { FillLayout, getRenderMode, THEME_URLS } from '../utils';
import { BackgroundLayerConfig } from './BackgroundLayer';

export type NineSliceRepeatAxis = 'x' | 'y';

export interface NineSliceBorderWidth {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
}

export interface NineSliceLayerProps {
    textureKey: string | undefined;
    leftWidth: number;
    topHeight: number;
    rightWidth: number;
    bottomHeight: number;
    tintColor?: string;
    layout?: BoxLayout;
    repeat?: NineSliceRepeatAxis;
}

const cropTexture = (base: Texture, x: number, y: number, w: number, h: number): Texture => new Texture({ source: base.source, frame: new Rectangle(x, y, Math.max(1, w), Math.max(1, h)) });

const TiledNineSlicePixi = ({ texture, leftWidth, topHeight, rightWidth, bottomHeight, repeat, tintColor }: { texture: Texture; leftWidth: number; topHeight: number; rightWidth: number; bottomHeight: number; repeat: NineSliceRepeatAxis; tintColor?: string }) => {
    const { width, height } = texture;

    const pieces = useMemo(() => {
        if (repeat === 'y') {
            return {
                start: cropTexture(texture, 0, 0, width, topHeight),
                fill: cropTexture(texture, 0, topHeight, width, height - topHeight - bottomHeight),
                end: cropTexture(texture, 0, height - bottomHeight, width, bottomHeight),
            };
        }

        return {
            start: cropTexture(texture, 0, 0, leftWidth, height),
            fill: cropTexture(texture, leftWidth, 0, width - leftWidth - rightWidth, height),
            end: cropTexture(texture, width - rightWidth, 0, rightWidth, height),
        };
    }, [ texture, width, height, leftWidth, topHeight, rightWidth, bottomHeight, repeat ]);

    if (repeat === 'y') {
        return (
            <pixiContainer layout={{ flexDirection: 'column', width: '100%', height: '100%' }}>
                <pixiSprite
                    texture={pieces.start}
                    tint={tintColor}
                    eventMode="none"
                    layout={{ width: '100%', height: topHeight, flexShrink: 0 }}
                />
                <pixiTilingSprite
                    texture={pieces.fill}
                    tint={tintColor}
                    eventMode="none"
                    layout={{ width: '100%', flex: 1 }}
                />
                <pixiSprite
                    texture={pieces.end}
                    tint={tintColor}
                    eventMode="none"
                    layout={{ width: '100%', height: bottomHeight, flexShrink: 0 }}
                />
            </pixiContainer>
        );
    }

    return (
        <pixiContainer layout={{ flexDirection: 'row', width: '100%', height: '100%' }}>
            <pixiSprite
                texture={pieces.start}
                tint={tintColor}
                eventMode="none"
                layout={{ height: '100%', width: leftWidth, flexShrink: 0 }}
            />
            <pixiTilingSprite
                texture={pieces.fill}
                tint={tintColor}
                eventMode="none"
                layout={{ height: '100%', flex: 1 }}
            />
            <pixiSprite
                texture={pieces.end}
                tint={tintColor}
                eventMode="none"
                layout={{ height: '100%', width: rightWidth, flexShrink: 0 }}
            />
        </pixiContainer>
    );
};

const NineSliceLayerPixi = ({ textureKey, leftWidth, topHeight, rightWidth, bottomHeight, tintColor, layout, repeat }: NineSliceLayerProps) => {
    const texture = usePixiTexture(textureKey);

    if (!texture) return null;

    if (repeat) {
        return (
            <pixiContainer layout={layout ?? FillLayout}>
                <TiledNineSlicePixi
                    texture={texture}
                    leftWidth={leftWidth}
                    topHeight={topHeight}
                    rightWidth={rightWidth}
                    bottomHeight={bottomHeight}
                    repeat={repeat}
                    tintColor={tintColor}
                />
            </pixiContainer>
        );
    }

    return (
        <pixiNineSliceSprite
            texture={texture}
            leftWidth={leftWidth}
            topHeight={topHeight}
            rightWidth={rightWidth}
            bottomHeight={bottomHeight}
            tint={tintColor}
            eventMode="none"
            layout={layout ?? FillLayout}
        />
    );
};

const NineSliceLayerDom = ({ textureKey, leftWidth, topHeight, rightWidth, bottomHeight, tintColor, layout, repeat }: NineSliceLayerProps) => {
    if (!textureKey) return null;

    return (
        <BackgroundLayerDom
            layer={{ kind: 'nineSlice', textureKey, leftWidth, topHeight, rightWidth, bottomHeight, repeat }}
            tintColor={tintColor}
            style={layout ? boxLayoutToStyle(layout) : undefined}
        />
    );
};

interface NineSliceBlendOverlayProps {
    textureKey: string | undefined;
    leftWidth: number;
    topHeight: number;
    rightWidth: number;
    bottomHeight: number;
    blend: number | undefined;
    layout?: BoxLayout;
}

/**
 * Draws a solid-white silhouette of the SAME nine-slice texture (see
 * `usePixiSilhouetteTexture`'s docblock) on top of the base layer at `alpha: blend`, stretched
 * through the identical `leftWidth`/`topHeight`/`rightWidth`/`bottomHeight` slicing as the base
 * layer - so it lightens exactly the base's own opaque pixels, respecting rounded/cut corners,
 * without needing a mask at all.
 *
 * This used to mask a plain white `Graphics` fill by an invisible (`renderable: false`)
 * `NineSliceSprite`. Pixi's built-in alpha-masking (`AlphaMask`) only applies when the mask
 * object is a plain `Sprite` (`AlphaMask.test`/`.init` check `instanceof Sprite` and otherwise
 * fall back to geometry-based stencil masking - see pixi.js's `rendering/mask/alpha/AlphaMask`),
 * so a `NineSliceSprite` mask silently fell through to `StencilMask`, whose `push()` renders the
 * mask's geometry into the stencil buffer via `collectRenderables` - which still respects
 * `renderable: false` and skips it entirely, leaving the stencil buffer empty and the masked
 * `Graphics` invisible everywhere. `blend` therefore had zero visible effect in Pixi (verified
 * pixel-identical with/without it), matching DOM's separate bug of not attempting it at all.
 */
const NineSliceBlendOverlayPixi = ({ textureKey, leftWidth, topHeight, rightWidth, bottomHeight, blend, layout }: NineSliceBlendOverlayProps) => {
    const silhouette = usePixiSilhouetteTexture(textureKey, '#ffffff');

    if (!silhouette || !blend || blend <= 0) return null;

    return (
        <pixiNineSliceSprite
            texture={silhouette}
            leftWidth={leftWidth}
            topHeight={topHeight}
            rightWidth={rightWidth}
            bottomHeight={bottomHeight}
            alpha={blend}
            eventMode="none"
            layout={layout ?? FillLayout}
        />
    );
};

/**
 * DOM counterpart to `NineSliceBlendOverlayPixi` above - Pixi masks a translucent white fill by
 * the border texture's own nine-slice-rendered alpha shape (so the wash follows rounded/cut
 * corners instead of blanketing the whole rectangular box); DOM has no standard nine-slice mask
 * primitive, so it recolors the SAME source texture to a solid white silhouette (preserving that
 * exact alpha shape - see `useSilhouetteImageUrl`'s docblock on why the existing multiply-based
 * `useTintedImageUrl` can't do this) and renders that silhouette through the identical
 * `border-image` technique `BackgroundLayerDom`'s `nineSlice` case uses, at `opacity: blend`.
 * This was previously unconditionally skipped in DOM (`getRenderMode() === 'dom'` bailed out
 * before ever reaching here), which made every `blend`-using `Border` variant render at its
 * flat, unlit base color in DOM - noticeably darker than Pixi's actual (lightened) result.
 */
const NineSliceBlendOverlayDom = ({ textureKey, leftWidth, topHeight, rightWidth, bottomHeight, blend, layout }: NineSliceBlendOverlayProps) => {
    const baseUrl = textureKey ? THEME_URLS[textureKey] : undefined;
    const silhouetteUrl = useSilhouetteImageUrl(baseUrl, '#ffffff');

    if (!silhouetteUrl || !blend || blend <= 0) return null;

    const slice = `${topHeight} ${rightWidth} ${bottomHeight} ${leftWidth} fill`;
    const width = `${topHeight}px ${rightWidth}px ${bottomHeight}px ${leftWidth}px`;

    return (
        <div style={{
            ...(layout ? boxLayoutToStyle(layout) : { position: 'absolute', inset: 0 }),
            opacity: blend,
            pointerEvents: 'none',
            borderStyle: 'solid',
            borderColor: 'transparent',
            borderWidth: width,
            borderImageSource: `url(${silhouetteUrl})`,
            borderImageSlice: slice,
            borderImageWidth: width,
            imageRendering: 'pixelated',
        }}
        />
    );
};

const NineSliceBlendOverlay = (props: NineSliceBlendOverlayProps) => getRenderMode() === 'dom'
    ? <NineSliceBlendOverlayDom {...props} />
    : <NineSliceBlendOverlayPixi {...props} />;

const NineSlice = (textureKey: string, leftWidth: number, topHeight: number, rightWidth: number, bottomHeight: number, borderWidth?: NineSliceBorderWidth, repeat?: NineSliceRepeatAxis): BackgroundLayerConfig => (
    { kind: 'nineSlice', textureKey, leftWidth, topHeight, rightWidth, bottomHeight, borderWidth, repeat }
);

const NineSliceLayer = (props: NineSliceLayerProps) => getRenderMode() === 'dom'
    ? <NineSliceLayerDom {...props} />
    : <NineSliceLayerPixi {...props} />;

export { NineSlice, NineSliceBlendOverlay, NineSliceLayer };
