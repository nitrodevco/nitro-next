import { Texture } from 'pixi.js';
import { Ref, useMemo } from 'react';

import { BoxLayout } from '../Box';
import { getCroppedTexture, usePixiTexture } from '../hooks';
import { FillLayout } from '../utils';
import { LayerNodeProps } from './layerLayout';

export type NineSliceRepeatAxis = 'x' | 'y';

export interface NineSliceLayerProps extends LayerNodeProps {
    textureKey: string | undefined;
    leftWidth: number;
    topHeight: number;
    rightWidth: number;
    bottomHeight: number;
    tintColor?: string;
    layout?: BoxLayout;
    repeat?: NineSliceRepeatAxis;
}

const cropTexture = (base: Texture, x: number, y: number, w: number, h: number): Texture => getCroppedTexture(base, { x, y, width: Math.max(1, w), height: Math.max(1, h) });

const TiledNineSlice = ({ texture, leftWidth, topHeight, rightWidth, bottomHeight, repeat, tintColor, layout, ref, alpha, visible }: { texture: Texture; leftWidth: number; topHeight: number; rightWidth: number; bottomHeight: number; repeat: NineSliceRepeatAxis; tintColor?: string; layout?: BoxLayout } & LayerNodeProps) => {
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

    // The start/fill/end row (or column) IS the layer's own box - the flex direction lives on
    // the same container the caller's layout sizes, not a nested one.
    if (repeat === 'y') {
        return (
            <pixiContainer
                ref={ref}
                alpha={alpha}
                visible={visible}
                layout={{ flexDirection: 'column', ...(layout ?? FillLayout) }}
            >
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
        <pixiContainer
            ref={ref}
            alpha={alpha}
            visible={visible}
            layout={{ flexDirection: 'row', ...(layout ?? FillLayout) }}
        >
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

/**
 * A skin drawn as a nine-slice stretched over its parent's box - or, with `repeat`, its centre
 * tiled along an axis, for a skin whose centre entities are `tiled`.
 */
export const NineSliceLayer = ({ textureKey, leftWidth, topHeight, rightWidth, bottomHeight, tintColor, layout, repeat, ref, alpha, visible }: NineSliceLayerProps) => {
    // A repeating middle piece goes through `TilingSprite`, which needs a texture that is its
    // own source (see `getStandaloneThemeTexture`); the plain `NineSliceSprite` is happy with
    // the atlas-backed region.
    const texture = usePixiTexture(textureKey, { standalone: !!repeat });

    if (!texture) return null;

    if (repeat) {
        return (
            <TiledNineSlice
                texture={texture}
                leftWidth={leftWidth}
                topHeight={topHeight}
                rightWidth={rightWidth}
                bottomHeight={bottomHeight}
                repeat={repeat}
                tintColor={tintColor}
                layout={layout}
                ref={ref}
                alpha={alpha}
                visible={visible}
            />
        );
    }

    // Never `undefined`: a prop that goes from a value to `undefined` makes @pixi/react build a bare
    // `new NineSliceSprite()` to read the default from (`applyProps`' `__defaultremove`), and that
    // constructor throws without its options - taking the whole stage down with it.
    return (
        <pixiNineSliceSprite
            ref={ref as Ref<never>}
            texture={texture}
            leftWidth={leftWidth}
            topHeight={topHeight}
            rightWidth={rightWidth}
            bottomHeight={bottomHeight}
            tint={tintColor ?? 0xffffff}
            alpha={alpha ?? 1}
            visible={visible ?? true}
            eventMode="none"
            layout={layout ?? FillLayout}
        />
    );
};
