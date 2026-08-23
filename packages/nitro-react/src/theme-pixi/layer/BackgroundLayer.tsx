import { getRenderMode } from '#base/theme-core';

import { BoxLayout } from '../Box';
import { BackgroundLayerDom } from '../dom/BackgroundLayerDom';
import { boxLayoutToStyle } from '../dom/boxStyle';
import { BackgroundLayerConfig } from './BackgroundLayerConfig';
import { CompositeLayer } from './CompositeLayer';
import { NineSliceLayer } from './NineSliceLayer';
import { SpriteLayer } from './SpriteLayer';
import { TileLayer } from './TileLayer';

export interface BackgroundLayerProps {
    layer: BackgroundLayerConfig | undefined;
    tintColor?: string;
    layout?: BoxLayout;
}

/**
 * Dual-target dispatcher: every caller (Border, Bubble, Header, Frame, TabContext,
 * TabContent, Droplist, ...) renders through this one component regardless of target, so none
 * of them need their own render-mode branch - `BackgroundLayerDom` (see theme-pixi/dom) mirrors
 * this same `layer.kind` switch in CSS.
 */
export const BackgroundLayer = ({ layer, tintColor, layout }: BackgroundLayerProps) => {
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
        case 'stretch': return (
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
                tintColor={tintColor}
                layout={layout}
            />
        );
        case 'sprite': return (
            <SpriteLayer
                textureKey={layer.textureKey}
                tintColor={tintColor}
            />
        );
    }

    return null;
};
