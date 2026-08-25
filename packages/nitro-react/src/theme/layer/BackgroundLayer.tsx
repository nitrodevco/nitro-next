import { BoxLayout } from '../Box';
import { BackgroundLayerDom, boxLayoutToStyle } from '../dom';
import { getRenderMode } from '../utils';
import { CompositeLayer, CompositePiece } from './CompositeLayer';
import { NineSliceBorderWidth, NineSliceLayer, NineSliceRepeatAxis } from './NineSliceLayer';
import { SpriteLayer } from './SpriteLayer';
import { TileLayer } from './TileLayer';

export type BackgroundLayerConfig
    = | { kind: 'nineSlice'; textureKey: string; leftWidth: number; topHeight: number; rightWidth: number; bottomHeight: number; borderWidth?: NineSliceBorderWidth; repeat?: NineSliceRepeatAxis }
        | { kind: 'sprite'; textureKey: string }
        | { kind: 'tile'; textureKey: string; left?: number; top?: number; bottom?: number; width?: number }
        | { kind: 'composite'; pieces: CompositePiece[] };

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
    const tileInsetLayout = layer.kind === 'tile' && layer.width !== undefined
        ? { position: 'absolute' as const, left: layer.left ?? 0, top: layer.top ?? 0, bottom: layer.bottom ?? 0, width: layer.width }
        : undefined;

    if (getRenderMode() === 'dom') {
        const domStyle = layer.kind === 'tile'
            ? (tileInsetLayout ? boxLayoutToStyle(tileInsetLayout) : (layout ? boxLayoutToStyle(layout) : undefined))
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
