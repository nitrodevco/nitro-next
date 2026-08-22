import { NineSliceSprite } from "pixi.js";
import { useState } from "react";

import { BoxLayout } from "../Box";
import { FillLayout } from "../utils/FillLayout";
import { usePixiTexture } from "../utils/usePixiTexture";

export interface BlendOverlayProps {
    textureKey: string | undefined;
    leftWidth: number;
    topHeight: number;
    rightWidth: number;
    bottomHeight: number;
    blend: number | undefined;
    layout?: BoxLayout;
}

export const BlendOverlay = ({ textureKey, leftWidth, topHeight, rightWidth, bottomHeight, blend, layout }: BlendOverlayProps) => {
    const texture = usePixiTexture(textureKey);
    const [maskNode, setMaskNode] = useState<NineSliceSprite | null>(null);

    if (!texture || !blend || blend <= 0) return null;

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
                    draw={g => { g.clear(); g.rect(0, 0, 1, 1).fill(0xFFFFFF); }}
                />
            )}
        </>
    );
};