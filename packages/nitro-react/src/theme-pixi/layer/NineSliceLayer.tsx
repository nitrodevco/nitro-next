import { getRenderMode } from '#base/theme-core';

import { BoxLayout } from '../Box';
import { BackgroundLayerDom } from '../dom/BackgroundLayerDom';
import { boxLayoutToStyle } from '../dom/boxStyle';
import { FillLayout } from '../utils/FillLayout';
import { usePixiTexture } from '../utils/usePixiTexture';

export interface NineSliceLayerProps {
    textureKey: string | undefined;
    leftWidth: number;
    topHeight: number;
    rightWidth: number;
    bottomHeight: number;
    tintColor?: string;
    layout?: BoxLayout;
}

const NineSliceLayerPixi = ({ textureKey, leftWidth, topHeight, rightWidth, bottomHeight, tintColor, layout }: NineSliceLayerProps) => {
    const texture = usePixiTexture(textureKey);

    if (!texture) return null;

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

const NineSliceLayerDom = ({ textureKey, leftWidth, topHeight, rightWidth, bottomHeight, tintColor, layout }: NineSliceLayerProps) => {
    if (!textureKey) return null;

    return (
        <BackgroundLayerDom
            layer={{ kind: 'nineSlice', textureKey, leftWidth, topHeight, rightWidth, bottomHeight }}
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
