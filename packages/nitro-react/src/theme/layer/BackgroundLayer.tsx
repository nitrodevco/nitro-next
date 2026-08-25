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
        | { kind: 'tile'; textureKey: string }
        | { kind: 'composite'; pieces: CompositePiece[] };

export const BackgroundLayer = ({ layer, tintColor, layout }: {
    layer: BackgroundLayerConfig | undefined;
    tintColor?: string;
    layout?: BoxLayout;
}) => {
    if (!layer) return null;

    if (getRenderMode() === 'dom') {
        return (
            <BackgroundLayerDom
                layer={layer}
                tintColor={tintColor}
                style={layout ? boxLayoutToStyle(layout) : undefined}
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
                layout={layout}
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
