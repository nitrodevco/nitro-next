import { NineSliceSprite } from 'pixi.js';
import { useState } from 'react';

import { getRenderMode } from '#base/theme-core';

import { BoxLayout } from '../Box';
import { FillLayout } from '../utils/FillLayout';
import { usePixiTexture } from '../utils/usePixiTexture';

export interface BlendOverlayProps {
    textureKey: string | undefined;
    leftWidth: number;
    topHeight: number;
    rightWidth: number;
    bottomHeight: number;
    blend: number | undefined;
    layout?: BoxLayout;
}

/**
 * Border's `blend` prop - a rare, secondary shine effect (one call site in the whole app). No
 * DOM/CSS equivalent is built for it; it's dropped in DOM mode rather than approximated. The
 * hooks below still run unconditionally either way (rules-of-hooks), just unused when dom -
 * a wasted Pixi asset fetch is an acceptable cost for something this infrequently rendered.
 */
export const BlendOverlay = ({ textureKey, leftWidth, topHeight, rightWidth, bottomHeight, blend, layout }: BlendOverlayProps) => {
    const texture = usePixiTexture(textureKey);
    const [ maskNode, setMaskNode ] = useState<NineSliceSprite | null>(null);

    if (getRenderMode() === 'dom') return null;
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
                    draw={(g) => { g.clear(); g.rect(0, 0, 1, 1).fill(0xFFFFFF); }}
                />
            )}
        </>
    );
};
