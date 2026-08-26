import { BoxLayout } from '../Box';

export interface SpriteFrame {
    x: number;
    y: number;
    width: number;
    height: number;
}

/**
 * A `frame` defaults a sprite layer's own size to its native crop dimensions rather than
 * `Stretch`'s usual "fill whatever layout box the caller assigns" (which only makes sense for a
 * whole, uncropped texture) - a caller-supplied `layout` still wins for whichever fields it
 * sets. Shared between `SpriteLayer.tsx`'s own Pixi/DOM renderers and `BackgroundLayer.tsx`'s
 * DOM dispatch, which calls `BackgroundLayerDom` directly rather than through `SpriteLayer`.
 */
export const spriteLayoutFromFrame = (frame: SpriteFrame | undefined, layout: BoxLayout | undefined): BoxLayout | undefined =>
    frame ? { width: frame.width, height: frame.height, ...layout } : layout;
