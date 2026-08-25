import { NineSliceSprite, Rectangle, Texture } from 'pixi.js';
import { useMemo, useState } from 'react';

import { BoxLayout } from '../Box';
import { BackgroundLayerDom, boxLayoutToStyle } from '../dom';
import { usePixiTexture } from '../hooks';
import { FillLayout, getRenderMode } from '../utils';
import { BackgroundLayerConfig } from './BackgroundLayer';

export type NineSliceRepeatAxis = 'x' | 'y';

export interface NineSliceBorderWidth {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
}

export interface NineSliceLayerProps {
    textureKey: string | undefined;
    leftWidth: number;
    topHeight: number;
    rightWidth: number;
    bottomHeight: number;
    tintColor?: string;
    layout?: BoxLayout;
    repeat?: NineSliceRepeatAxis;
}

const cropTexture = (base: Texture, x: number, y: number, w: number, h: number): Texture => new Texture({ source: base.source, frame: new Rectangle(x, y, Math.max(1, w), Math.max(1, h)) });

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

const NineSliceBlendOverlay = ({ textureKey, leftWidth, topHeight, rightWidth, bottomHeight, blend, layout }: {
    textureKey: string | undefined;
    leftWidth: number;
    topHeight: number;
    rightWidth: number;
    bottomHeight: number;
    blend: number | undefined;
    layout?: BoxLayout;
}) => {
    const texture = usePixiTexture(textureKey);
    const [ maskNode, setMaskNode ] = useState<NineSliceSprite | null>(null);

    if (getRenderMode() === 'dom' || !texture || !blend || blend <= 0) return null;

    return (
        <>
            <pixiNineSliceSprite
                ref={setMaskNode}
                texture={texture}
                leftWidth={leftWidth}
                topHeight={topHeight}
                rightWidth={rightWidth}
                bottomHeight={bottomHeight}
                renderable={false}
                eventMode="none"
                layout={layout ?? FillLayout}
            />
            {maskNode && (
                <pixiGraphics
                    mask={maskNode}
                    alpha={blend}
                    eventMode="none"
                    layout={layout ?? FillLayout}
                    draw={(g) => { g.clear().rect(0, 0, 1, 1).fill(0xFFFFFF); }}
                />
            )}
        </>
    );
};

const NineSlice = (textureKey: string, leftWidth: number, topHeight: number, rightWidth: number, bottomHeight: number, borderWidth?: NineSliceBorderWidth, repeat?: NineSliceRepeatAxis): BackgroundLayerConfig => (
    { kind: 'nineSlice', textureKey, leftWidth, topHeight, rightWidth, bottomHeight, borderWidth, repeat }
);

const NineSliceLayer = (props: NineSliceLayerProps) => getRenderMode() === 'dom'
    ? <NineSliceLayerDom {...props} />
    : <NineSliceLayerPixi {...props} />;

export { NineSlice, NineSliceBlendOverlay, NineSliceLayer };
