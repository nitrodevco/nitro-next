/**
 * The masked, scrollable window `ScrollArea` draws its content in: a fixed-size viewport clips a
 * content container translated by `-scrollOffset` (on top of its own layout position, as
 * `useFrameDrag`'s offset is), and the scroll state lives in the caller's `useScrollController`.
 *
 * - The clip is a plain Pixi mask, the viewport's own child (`FillLayout`): @pixi/layout's
 *   `overflow: 'hidden'` only masks its own `LayoutContainer`, and a mask that is a *sibling* of
 *   what it clips renders it invisible ("Mask bounds, renderable is not inside the root
 *   container") - pixi.js's `addMaskLocalBounds` walks the mask's parents to the masked object.
 * - `alignItems: 'flex-start'` on the viewport is load-bearing: Yoga's default `stretch` would size
 *   the content container to the viewport across its row axis - the height, for a vertical
 *   scroller - so the content would measure exactly the viewport's height and never scroll.
 * - The mask and the content are both `roundPixels`: the offset is routinely fractional, and
 *   `FlashText` rounds its own sprites, so a mask edge on another sub-pixel than the text it clips
 *   shaves a hairline off the tallest glyphs.
 * - The viewport is a hit target over its whole box (`attachBoxHitArea`), so the wheel scrolls it
 *   wherever the pointer is over it, as a Flash scrollable list takes the mouse over all of it - a
 *   list whose items let presses through (a template's `pointerTransparent` windows) would
 *   otherwise not scroll over the gaps between them.
 */
import { Container as PixiContainer, FederatedWheelEvent, Graphics as PixiGraphics } from 'pixi.js';
import { ReactNode, useState } from 'react';

import { BoxLayout } from '../Box';
import { FillLayout } from './FillLayout';
import { attachBoxHitArea } from './interaction';

export interface ScrollViewportProps {
    viewportRef: (node: PixiContainer | null) => void;
    contentRef: (node: PixiContainer | null) => void;
    onWheel: (event: FederatedWheelEvent) => void;
    scrollOffset: number;
    vertical: boolean;
    layout?: BoxLayout;
    /** The content container's layout - how the scrolled children stack. */
    contentLayout: BoxLayout;
    children?: ReactNode;
}

export const ScrollViewport = ({ viewportRef, contentRef, onWheel, scrollOffset, vertical, layout, contentLayout, children }: ScrollViewportProps) => {
    const [ maskNode, setMaskNode ] = useState<PixiGraphics | null>(null);

    return (
        <pixiContainer
            ref={(node) => {
                if (node) attachBoxHitArea(node);
                viewportRef(node);
            }}
            eventMode="static"
            onWheel={onWheel}
            mask={maskNode ?? undefined}
            layout={{ alignItems: 'flex-start', ...layout }}
        >
            <pixiGraphics
                ref={setMaskNode}
                eventMode="none"
                roundPixels
                layout={FillLayout}
                draw={(g) => { g.clear().rect(0, 0, 1, 1).fill(0xFFFFFF); }}
            />
            <pixiContainer
                ref={contentRef}
                roundPixels
                x={vertical ? 0 : -scrollOffset}
                y={vertical ? -scrollOffset : 0}
                layout={contentLayout}
            >
                {children}
            </pixiContainer>
        </pixiContainer>
    );
};
