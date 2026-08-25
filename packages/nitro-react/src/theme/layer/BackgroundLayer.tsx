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

    if (getRenderMode() === 'dom') {
        // `tile` layers position themselves from their own `left`/`top`/`bottom`/`width` inset
        // fields (set by `Tiled(...)`), the same way the Pixi switch below does below in its own
        // `case 'tile'` - the `layout` prop passed to this component is for the other layer kinds,
        // which fill it directly, and is not consulted here. Skipping this mirrors the bug that
        // let a caller like `ScrollbarSliderBarVertical`'s overlay (which never passes a `layout`
        // prop for its `Tiled(...)` overlay) fall back to `FILL_STYLE` and cover its entire parent
        // box edge-to-edge instead of the intended inset strip.
        const domStyle = layer.kind === 'tile'
            ? boxLayoutToStyle({ position: 'absolute', left: layer.left ?? 0, top: layer.top ?? 0, bottom: layer.bottom ?? 0, width: layer.width ?? 0 })
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
                layout={{
                    position: 'absolute',
                    left: layer.left ?? 0,
                    top: layer.top ?? 0,
                    bottom: layer.bottom ?? 0,
                    width: layer.width ?? 0,
                }}
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
