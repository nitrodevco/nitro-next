import { BoxLayout } from '../Box';
import { deriveHsvLayerColor, SpriteFrame } from '../utils';
import { CompositeLayer, CompositeLayerPieceProps } from './CompositeLayer';
import { insetLayout, LayerInsets, LayerNodeProps } from './layerLayout';
import { NineSliceLayer, NineSliceRepeatAxis } from './NineSliceLayer';
import { SpriteLayer } from './SpriteLayer';
import { TileLayer } from './TileLayer';

/** One layer of a theme variant's art, as the window manager bundle's `theme-variants.json` describes it. */
export type BackgroundLayerConfig
    = | { kind: 'nineSlice'; textureKey: string; leftWidth: number; topHeight: number; rightWidth: number; bottomHeight: number; repeat?: NineSliceRepeatAxis }
        | { kind: 'sprite'; textureKey: string; frame?: SpriteFrame }
        | ({ kind: 'tile'; textureKey: string } & LayerInsets)
        | { kind: 'composite'; pieces: CompositeLayerPieceProps[] }
        /** A recolourable skin (`colorizeMethod="hsv_layer"`): one nine-slice sheet per shade, stacked in order, each tinted with the client's derived colour for its shade. */
        | { kind: 'hsvNineSlice'; layers: { textureKey: string; shade: number }[]; leftWidth: number; topHeight: number; rightWidth: number; bottomHeight: number };

/**
 * Draws one layer. `layout` sizes the layer kinds that fill a box (nine-slice, sprite, a tile
 * with no insets); a tile placed by insets (a scrollbar lift's grip) and a composite's pieces
 * place themselves inside the component's box instead. The node props reach the drawn object of
 * a single-node layer (`isSingleNodeLayer`).
 */
export const BackgroundLayer = ({ layer, tintColor, layout, ref, alpha, visible }: {
    layer: BackgroundLayerConfig | undefined;
    tintColor?: string;
    layout?: BoxLayout;
} & LayerNodeProps) => {
    if (!layer) return null;

    switch (layer.kind) {
        case 'hsvNineSlice': return (
            // Each shade layer is an ordinary nine-slice with its own derived tint.
            <>
                {layer.layers.map(shadeLayer => (
                    <NineSliceLayer
                        key={shadeLayer.textureKey}
                        textureKey={shadeLayer.textureKey}
                        leftWidth={layer.leftWidth}
                        topHeight={layer.topHeight}
                        rightWidth={layer.rightWidth}
                        bottomHeight={layer.bottomHeight}
                        tintColor={deriveHsvLayerColor(tintColor, shadeLayer.shade)}
                        layout={layout}
                    />
                ))}
            </>
        );
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
                ref={ref}
                alpha={alpha}
                visible={visible}
            />
        );
        case 'tile': {
            // A tile with no insets (a header's full-bleed background) fills the box; one with
            // insets is a strip at them - an axis it gives no size stretches between its edges.
            const { left, top, right, bottom, width, height } = layer;
            const placed = [ left, top, right, bottom, width, height ].some(value => value !== undefined);

            return (
                <TileLayer
                    textureKey={layer.textureKey}
                    tintColor={tintColor}
                    ref={ref}
                    alpha={alpha}
                    visible={visible}
                    layout={placed
                        ? insetLayout({
                                left: left ?? 0,
                                top: top ?? 0,
                                right: (width === undefined) ? (right ?? 0) : undefined,
                                bottom: (height === undefined) ? (bottom ?? 0) : undefined,
                                width,
                                height,
                            })
                        : layout}
                />
            );
        }
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
                ref={ref}
                alpha={alpha}
                visible={visible}
            />
        );
        default: return null;
    }
};
