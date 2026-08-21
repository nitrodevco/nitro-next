import './pixiElements';

import type { NineSliceSprite } from 'pixi.js';
import { useState } from 'react';

import type { BoxLayout } from '../Box';
import { usePixiTexture } from './usePixiTexture';

/**
 * Shared rendering primitives for the "base layer + optional overlay layer" pattern used
 * throughout theme/**: a variant's background art is a single nine-slice border, a single
 * stretched sprite, a repeating tile, or (for the handful of variants DOM builds from many
 * discrete positioned background images - Border 101/102/103/106/107, Button/ContainerButton
 * 100-103, Frame 100) a composite of several sprites. Every ported component (Border, Button,
 * Frame, Header, Scaler, ...) picks whichever of these its resolved variant needs instead of
 * each re-implementing its own texture-to-sprite plumbing.
 */

/**
 * `width`/`height: '100%'` look redundant next to four `0` insets - CSS would stretch from
 * the insets alone. @pixi/layout doesn't: any `ViewContainer` leaf (Sprite, Graphics,
 * TilingSprite - confirmed via reading its `Layout.defaultStyle.leaf` default and
 * `formatStyles.mjs`) defaults its yoga `width`/`height` to `'intrinsic'` (the object's own
 * pre-layout local bounds, e.g. a texture's native pixel size) whenever the `layout` style
 * doesn't itself carry a `width`/`height` key - and an explicit yoga width silently wins over
 * inset-driven stretch, the same as it would in CSS. Confirmed empirically: the four insets
 * alone leave a plain Sprite/Graphics at ~1px; adding explicit `width`/`height` here fixes it.
 * NineSliceSprite/TilingSprite (used by NineSliceLayer/TileLayer) aren't affected either way -
 * they're separately special-cased to always apply their computed size directly - so this is
 * safe to share across all three layers rather than only patching SpriteLayer.
 */
const FILL_LAYOUT: BoxLayout = { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%' };

export interface NineSliceLayerProps {
    textureKey: string | undefined;
    leftWidth: number;
    topHeight: number;
    rightWidth: number;
    bottomHeight: number;
    tint?: string;
    layout?: BoxLayout;
}

export const NineSliceLayer = ({ textureKey, leftWidth, topHeight, rightWidth, bottomHeight, tint, layout }: NineSliceLayerProps) => {
    const texture = usePixiTexture(textureKey);

    if (!texture) return null;

    return (
        <pixiNineSliceSprite
            texture={texture}
            leftWidth={leftWidth}
            topHeight={topHeight}
            rightWidth={rightWidth}
            bottomHeight={bottomHeight}
            tint={tint}
            eventMode="none"
            layout={layout ?? FILL_LAYOUT}
        />
    );
};

export interface SpriteLayerProps {
    textureKey: string | undefined;
    tint?: string;
    layout?: BoxLayout;
}

/** Stretch-fills its box, matching a DOM `bg-size-[100%_100%]` background sprite. */
export const SpriteLayer = ({ textureKey, tint, layout }: SpriteLayerProps) => {
    const texture = usePixiTexture(textureKey);

    if (!texture) return null;

    return <pixiSprite texture={texture} tint={tint} eventMode="none" layout={layout ?? FILL_LAYOUT} />;
};

export interface TileLayerProps {
    textureKey: string | undefined;
    tint?: string;
    layout?: BoxLayout;
}

/** Repeats its texture, matching a DOM `bg-repeat-x`/`bg-repeat` background sprite. */
export const TileLayer = ({ textureKey, tint, layout }: TileLayerProps) => {
    const texture = usePixiTexture(textureKey);

    if (!texture) return null;

    return <pixiTilingSprite texture={texture} tint={tint} eventMode="none" layout={layout ?? FILL_LAYOUT} />;
};

/**
 * One piece of a multi-image DOM background composite. `top`/`left`/`right`/`bottom` mirror
 * the DOM's `background-position` (an edge left unset means "not anchored to that edge" -
 * e.g. a top-center piece sets only `top`, stretching between `left`/`right` insets set by
 * its neighbors); `width`/`height` mirror `background-size` (a fixed px corner size, or
 * omitted so the piece stretches to fill the box implied by its position insets - the same
 * "absolute + opposing insets = stretch" behavior every other absolute-positioned layer in
 * this package already relies on).
 */
export interface CompositePiece {
    textureKey: string;
    top?: number;
    left?: number;
    right?: number;
    bottom?: number;
    width?: number;
    height?: number;
}

const CompositePieceSprite = ({ piece, tint }: { piece: CompositePiece, tint?: string }) => {
    const texture = usePixiTexture(piece.textureKey);

    if (!texture) return null;

    return (
        <pixiSprite
            texture={texture}
            tint={tint}
            eventMode="none"
            layout={{ position: 'absolute', top: piece.top, left: piece.left, right: piece.right, bottom: piece.bottom, width: piece.width, height: piece.height }}
        />
    );
};

export interface CompositeLayerProps {
    pieces: CompositePiece[];
    tint?: string;
}

export const CompositeLayer = ({ pieces, tint }: CompositeLayerProps) => (
    <>{pieces.map((piece, index) => <CompositePieceSprite key={index} piece={piece} tint={tint} />)}</>
);

export interface BlendOverlayProps {
    /** The same texture/geometry as the layer being blended, used only as a mask shape. */
    textureKey: string | undefined;
    leftWidth: number;
    topHeight: number;
    rightWidth: number;
    bottomHeight: number;
    /** 0-1 alpha of the white wash. Mirrors theme/utils/pixiTint.ts's `blend` mechanic
     *  (a white Graphics rect masked to the source texture's own alpha) as live Pixi display
     *  objects instead of a canvas-baked data URL - Pixi has no use for the DOM version's
     *  canvas round-trip, so this reproduces the same masked-overlay technique directly. */
    blend: number | undefined;
    layout?: BoxLayout;
}

/** White-wash tint overlay, shaped to a nine-slice texture's own alpha via masking. */
export const BlendOverlay = ({ textureKey, leftWidth, topHeight, rightWidth, bottomHeight, blend, layout }: BlendOverlayProps) => {
    const texture = usePixiTexture(textureKey);
    const [maskNode, setMaskNode] = useState<NineSliceSprite | null>(null);

    if (!texture || !blend || blend <= 0) return null;

    return (
        <>
            <pixiNineSliceSprite
                ref={setMaskNode}
                texture={texture}
                leftWidth={leftWidth}
                topHeight={topHeight}
                rightWidth={rightWidth}
                bottomHeight={bottomHeight}
                renderable={false}
                eventMode="none"
                layout={layout ?? FILL_LAYOUT}
            />
            {maskNode && (
                <pixiGraphics
                    mask={maskNode}
                    alpha={blend}
                    eventMode="none"
                    layout={layout ?? FILL_LAYOUT}
                    draw={g => { g.clear(); g.rect(0, 0, 1, 1).fill(0xFFFFFF); }}
                />
            )}
        </>
    );
};
