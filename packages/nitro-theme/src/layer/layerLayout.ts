/**
 * How a skin layer is placed in its component's box: by an entity's insets (`insetLayout`), or -
 * for a layer drawn as one display object standing in for the whole component - with the
 * component's own ref, alpha and visibility (`LayerNodeProps`, `leafBoxLayout`).
 */
import { Container as PixiContainer } from 'pixi.js';
import { Ref } from 'react';

import { BoxLayout } from '../Box';
import type { BackgroundLayerConfig } from './BackgroundLayer';

export interface LayerInsets {
    left?: number;
    top?: number;
    right?: number;
    bottom?: number;
    width?: number;
    height?: number;
}

/**
 * What a layer drawn as a single display object takes when it stands in for its component's own
 * box (a `Border` with nothing inside it is just its skin): the component's ref, alpha and
 * visibility go on the drawn node instead of a container around it.
 */
export interface LayerNodeProps {
    ref?: Ref<PixiContainer>;
    alpha?: number;
    visible?: boolean;
}

/**
 * The absolute box of a skin piece placed by its insets, as `BitmapSkinRenderer` places an entity:
 * pinned to an edge, sized, or stretched between two edges.
 *
 * An axis pinned at both ends and given no size is `'auto'`, so Yoga sizes it from the two insets.
 * Left unset it would be `@pixi/layout`'s leaf default, `'intrinsic'` - the sprite's current drawn
 * size, written back as a fixed size on every update - and the piece would keep the size it first
 * drew at while its box grew or shrank around it.
 */
export const insetLayout = ({ left, top, right, bottom, width, height }: LayerInsets): BoxLayout => ({
    position: 'absolute',
    left,
    top,
    right,
    bottom,
    width: width ?? (((left !== undefined) && (right !== undefined)) ? 'auto' : undefined),
    height: height ?? (((top !== undefined) && (bottom !== undefined)) ? 'auto' : undefined),
});

/**
 * Whether a layer is drawn as exactly one display object filling its box - a nine-slice, a sprite
 * or a full-bleed tile - so it can be its component's box itself (`LayerNodeProps`) rather than
 * a child of one. A tile strip and a composite place pieces inside a box; hsv shades are several.
 */
export const isSingleNodeLayer = (layer: BackgroundLayerConfig | undefined): layer is BackgroundLayerConfig => {
    if (!layer) return false;

    if (layer.kind === 'nineSlice') return true;

    // A cut-out frame sizes the sprite by the frame, not by the box.
    if (layer.kind === 'sprite') return !layer.frame;

    return (layer.kind === 'tile') && [ layer.left, layer.top, layer.right, layer.bottom, layer.width, layer.height ].every(value => value === undefined);
};

/**
 * A component's box laid out by a leaf (a sprite, a nine-slice) rather than a container: the size
 * it does not state is `'auto'`, as a container's is, not the leaf default `'intrinsic'` - which
 * would size the box by its texture.
 */
export const leafBoxLayout = (layout: BoxLayout | undefined): BoxLayout => ({ ...layout, width: layout?.width ?? 'auto', height: layout?.height ?? 'auto' });
