import { BoxLayout } from "../Box";
import { BackgroundLayerConfig } from "./BackgroundLayerConfig";
import { CompositeLayer } from "./CompositeLayer";
import { NineSliceLayer } from "./NineSliceLayer";
import { SpriteLayer } from "./SpriteLayer";
import { TileLayer } from "./TileLayer";

export interface BackgroundLayerProps {
    layer: BackgroundLayerConfig | undefined;
    tintColor?: string;
    layout?: BoxLayout;
}

export const BackgroundLayer = ({ layer, tintColor, layout }: BackgroundLayerProps) => {
    if (!layer) return null;

    switch (layer.kind) {
        case 'composite': return <CompositeLayer pieces={layer.pieces} tintColor={tintColor} />;
        case 'stretch': return <SpriteLayer textureKey={layer.textureKey} tintColor={tintColor} layout={layout} />;
        case 'tile': return <TileLayer textureKey={layer.textureKey} tintColor={tintColor} layout={layout} />;
        case 'nineSlice': return <NineSliceLayer textureKey={layer.textureKey} leftWidth={layer.leftWidth} topHeight={layer.topHeight} rightWidth={layer.rightWidth} bottomHeight={layer.bottomHeight} tintColor={tintColor} layout={layout} />;
        case 'sprite': return <SpriteLayer textureKey={layer.textureKey} tintColor={tintColor} />;
    }

    return null;
};