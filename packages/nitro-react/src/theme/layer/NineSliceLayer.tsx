import { Rectangle, Texture } from 'pixi.js';
import { useMemo } from 'react';

import { getRenderMode } from '#base/theme';

import { BoxLayout } from '../Box';
import { BackgroundLayerDom } from '../dom/BackgroundLayerDom';
import { boxLayoutToStyle } from '../dom/boxStyle';
import { FillLayout } from '../utils/FillLayout';
import { usePixiTexture } from '../hooks/usePixiTexture';
import { NineSliceRepeatAxis } from './BackgroundLayerConfig';

export interface NineSliceLayerProps {
    textureKey: string | undefined;
    leftWidth: number;
    topHeight: number;
    rightWidth: number;
    bottomHeight: number;
    tintColor?: string;
    layout?: BoxLayout;
    /** See `NineSliceRepeatAxis`'s docblock (BackgroundLayerConfig.ts) - only handles the
     *  3-slice case (this axis's caps, the other axis's width/height both 0), which is what
     *  both real callers (ScrollbarSliderBarVertical/Horizontal) pass. */
    repeat?: NineSliceRepeatAxis;
}

const cropTexture = (base: Texture, x: number, y: number, w: number, h: number): Texture => new Texture({ source: base.source, frame: new Rectangle(x, y, Math.max(1, w), Math.max(1, h)) });

/**
 * The tiling counterpart to the plain `pixiNineSliceSprite` below - Pixi's `NineSliceSprite`
 * only stretches its fill/edge regions, with no tiling mode (confirmed absent from its options),
 * so a genuinely tiling nine-slice has to be hand-built from three pieces: two fixed-size end
 * caps cropped from the source's leading/trailing strip, and a `pixiTilingSprite` for the
 * fill region cropped from the middle - at its own native texture scale (`pixiTilingSprite`'s
 * default `tileScale`), the same way `border-image-repeat: repeat` tiles a CSS fill region.
 */
const TiledNineSlicePixi = ({ texture, leftWidth, topHeight, rightWidth, bottomHeight, repeat, tintColor }: { texture: Texture; leftWidth: number; topHeight: number; rightWidth: number; bottomHeight: number; repeat: NineSliceRepeatAxis; tintColor?: string }) => {
    const { width, height } = texture;

    const pieces = useMemo(() => {
        if (repeat === 'y') {
            return {
                start: cropTexture(texture, 0, 0, width, topHeight),
                fill: cropTexture(texture, 0, topHeight, width, height - topHeight - bottomHeight),
                end: cropTexture(texture, 0, height - bottomHeight, width, bottomHeight),
            };
        }

        return {
            start: cropTexture(texture, 0, 0, leftWidth, height),
            fill: cropTexture(texture, leftWidth, 0, width - leftWidth - rightWidth, height),
            end: cropTexture(texture, width - rightWidth, 0, rightWidth, height),
        };
    }, [ texture, width, height, leftWidth, topHeight, rightWidth, bottomHeight, repeat ]);

    // Normal-flow flex children (fixed-size caps, `flex: 1` middle) rather than absolutely
    // positioned ones inset from both sides - confirmed empirically that a `pixiTilingSprite`
    // sizes reliably from Yoga's flex-grow distribution but NOT from a pair of opposite
    // absolute insets (`left`+`right` with no explicit `width`) the way a plain `pixiSprite`
    // does elsewhere in this codebase (see FillLayout.tsx) - it fell back to the cropped
    // texture's own native size instead of stretching, only on the axis without an explicit
    // dimension, which a flex `flex: 1` child doesn't have room to do.
    if (repeat === 'y') {
        return (
            <pixiContainer layout={{ flexDirection: 'column', width: '100%', height: '100%' }}>
                <pixiSprite
                    texture={pieces.start}
                    tint={tintColor}
                    eventMode="none"
                    layout={{ width: '100%', height: topHeight, flexShrink: 0 }}
                />
                <pixiTilingSprite
                    texture={pieces.fill}
                    tint={tintColor}
                    eventMode="none"
                    layout={{ width: '100%', flex: 1 }}
                />
                <pixiSprite
                    texture={pieces.end}
                    tint={tintColor}
                    eventMode="none"
                    layout={{ width: '100%', height: bottomHeight, flexShrink: 0 }}
                />
            </pixiContainer>
        );
    }

    return (
        <pixiContainer layout={{ flexDirection: 'row', width: '100%', height: '100%' }}>
            <pixiSprite
                texture={pieces.start}
                tint={tintColor}
                eventMode="none"
                layout={{ height: '100%', width: leftWidth, flexShrink: 0 }}
            />
            <pixiTilingSprite
                texture={pieces.fill}
                tint={tintColor}
                eventMode="none"
                layout={{ height: '100%', flex: 1 }}
            />
            <pixiSprite
                texture={pieces.end}
                tint={tintColor}
                eventMode="none"
                layout={{ height: '100%', width: rightWidth, flexShrink: 0 }}
            />
        </pixiContainer>
    );
};

const NineSliceLayerPixi = ({ textureKey, leftWidth, topHeight, rightWidth, bottomHeight, tintColor, layout, repeat }: NineSliceLayerProps) => {
    const texture = usePixiTexture(textureKey);

    if (!texture) return null;

    if (repeat) {
        return (
            <pixiContainer layout={layout ?? FillLayout}>
                <TiledNineSlicePixi
                    texture={texture}
                    leftWidth={leftWidth}
                    topHeight={topHeight}
                    rightWidth={rightWidth}
                    bottomHeight={bottomHeight}
                    repeat={repeat}
                    tintColor={tintColor}
                />
            </pixiContainer>
        );
    }

    return (
        <pixiNineSliceSprite
            texture={texture}
            leftWidth={leftWidth}
            topHeight={topHeight}
            rightWidth={rightWidth}
            bottomHeight={bottomHeight}
            tint={tintColor}
            eventMode="none"
            layout={layout ?? FillLayout}
        />
    );
};

const NineSliceLayerDom = ({ textureKey, leftWidth, topHeight, rightWidth, bottomHeight, tintColor, layout, repeat }: NineSliceLayerProps) => {
    if (!textureKey) return null;

    return (
        <BackgroundLayerDom
            layer={{ kind: 'nineSlice', textureKey, leftWidth, topHeight, rightWidth, bottomHeight, repeat }}
            tintColor={tintColor}
            style={layout ? boxLayoutToStyle(layout) : undefined}
        />
    );
};

/**
 * Callers reaching for a single nine-slice piece directly (ScrollbarSliderTrackVertical/
 * Horizontal, ScrollbarSliderBarVertical/Horizontal, DroplistItem, DropmenuItem,
 * FramePointerDown) rather than going through `BackgroundLayer`'s own `layer.kind` switch still
 * need the same dual-target dispatch that switch already gets - routing the DOM branch through
 * `BackgroundLayerDom` with a one-off `nineSlice` config reuses that exact CSS technique instead
 * of a second implementation.
 */
export const NineSliceLayer = (props: NineSliceLayerProps) => getRenderMode() === 'dom'
    ? <NineSliceLayerDom {...props} />
    : <NineSliceLayerPixi {...props} />;
