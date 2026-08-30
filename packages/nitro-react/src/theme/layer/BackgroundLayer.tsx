import { BoxLayout } from '../Box';
import { BackgroundLayerDom, boxLayoutToStyle } from '../dom';
import { getRenderMode, SpriteFrame, spriteLayoutFromFrame } from '../utils';
import { CompositeLayer, CompositeLayerPieceProps } from './CompositeLayer';
import { NineSliceBorderWidth, NineSliceLayer, NineSliceRepeatAxis } from './NineSliceLayer';
import { SpriteLayer } from './SpriteLayer';
import { TileLayer } from './TileLayer';

export type BackgroundLayerConfig
    = | { kind: 'nineSlice'; textureKey: string; leftWidth: number; topHeight: number; rightWidth: number; bottomHeight: number; borderWidth?: NineSliceBorderWidth; repeat?: NineSliceRepeatAxis }
        | { kind: 'sprite'; textureKey: string; frame?: SpriteFrame }
        | { kind: 'tile'; textureKey: string; left?: number; top?: number; bottom?: number; width?: number }
        | { kind: 'composite'; pieces: CompositeLayerPieceProps[] };

export const BackgroundLayer = ({ layer, tintColor, layout }: {
    layer: BackgroundLayerConfig | undefined;
    tintColor?: string;
    layout?: BoxLayout;
}) => {
    if (!layer) return null;

    // A `tile` layer with an explicit `width` (set by `Tiled(...)`, e.g. `ScrollbarSliderBarVertical`'s
    // grip overlay) positions itself from its own `left`/`top`/`bottom`/`width` inset fields as a
    // fixed-width strip, on both backends - the `layout` prop passed to this component is for the
    // other layer kinds (and for a widthless tile), which fill it directly. A `tile` layer with no
    // `width` (e.g. `Header`'s full-bleed background/shine, built as a raw `{ kind: 'tile', textureKey }`
    // literal, not through `Tiled(...)`) means "fill the box" - forcing it through the same inset
    // math would default `width` to `0` and collapse it to nothing.
    //
    // The un-declared axis (`height`, here - `Tiled(...)` never takes one) is NOT safe to leave
    // for Yoga to infer from the opposing `top`/`bottom` insets on the Pixi side: `@pixi/layout`'s
    // `Layout.defaultStyle` defaults a leaf node's `height` to `"intrinsic"` (its texture's own
    // natural size) whenever it isn't explicitly set - there's no CSS-style "both offsets set,
    // height auto -> height = container - top - bottom" behavior for a `pixiTilingSprite`. DOM's
    // `position: absolute` genuinely does compute that from CSS alone, so this only ever silently
    // broke Pixi - the grip overlay collapsed to ~10px (the grd texture's own native height)
    // instead of spanning the thumb, tall thumbs included. Computing it explicitly here (from the
    // caller's own `layout.height`, when it's a plain number - the caller is the one component
    // that actually knows the real container size) sidesteps the Yoga default entirely, on both
    // backends, rather than depending on it.
    const containerHeight = typeof layout?.height === 'number' ? layout.height : undefined;
    const tileInsetLayout = layer.kind === 'tile' && layer.width !== undefined
        ? {
                position: 'absolute' as const,
                left: layer.left ?? 0,
                top: layer.top ?? 0,
                width: layer.width,
                ...(containerHeight !== undefined
                    ? { height: containerHeight - (layer.top ?? 0) - (layer.bottom ?? 0) }
                    : { bottom: layer.bottom ?? 0 }),
            }
        : undefined;

    if (getRenderMode() === 'dom') {
        // Bypasses `SpriteLayer.tsx`'s own `SpriteLayerDom` entirely (goes straight to the
        // shared `BackgroundLayerDom`, same as every other kind here) - `spriteLayoutFromFrame`
        // is the one piece of that component's logic this still needs: without it, a `frame`'d
        // sprite with no caller `layout` would fall through to `BackgroundLayerDom`'s own
        // stretch-to-fill default instead of sizing to its native crop dimensions.
        const spriteLayout = layer.kind === 'sprite' ? spriteLayoutFromFrame(layer.frame, layout) : undefined;
        const domStyle = layer.kind === 'tile'
            ? (tileInsetLayout ? boxLayoutToStyle(tileInsetLayout) : (layout ? boxLayoutToStyle(layout) : undefined))
            : layer.kind === 'sprite'
                ? (spriteLayout ? boxLayoutToStyle(spriteLayout) : undefined)
                : (layout ? boxLayoutToStyle(layout) : undefined);

        return (
            <BackgroundLayerDom
                layer={layer}
                tintColor={tintColor}
                style={domStyle}
            />
        );
    }

    switch (layer.kind) {
        case 'composite': return (
            <CompositeLayer
                pieces={layer.pieces}
                tintColor={tintColor}
            />
        );
        case 'sprite': return (
            <SpriteLayer
                textureKey={layer.textureKey}
                frame={layer.frame}
                tintColor={tintColor}
                layout={layout}
            />
        );
        case 'tile': return (
            <TileLayer
                textureKey={layer.textureKey}
                tintColor={tintColor}
                layout={tileInsetLayout ?? layout}
            />
        );
        case 'nineSlice': return (
            <NineSliceLayer
                textureKey={layer.textureKey}
                leftWidth={layer.leftWidth}
                topHeight={layer.topHeight}
                rightWidth={layer.rightWidth}
                bottomHeight={layer.bottomHeight}
                repeat={layer.repeat}
                tintColor={tintColor}
                layout={layout}
            />
        );
        default: return null;
    }
};
