/**
 * Where an info bubble of the wired trading windows points from: the clicked button's place on
 * screen, read in its click handler (`WiredChestWrapperView.relocateBubbleFocus` reads the
 * button's global rectangle the same way). Kept apart from `WiredTradingInfoBubble` so that file
 * exports a component only.
 */
import { FederatedPointerEvent } from 'pixi.js';

export interface WiredTradingBubbleAnchor {
    x: number;
    y: number;
    width: number;
    height: number;
}

/** The anchor for a click on `event.currentTarget`. */
export const getWiredTradingBubbleAnchor = (event: FederatedPointerEvent): WiredTradingBubbleAnchor => {
    const bounds = event.currentTarget.getBounds();

    return { x: bounds.x, y: bounds.y, width: bounds.width, height: bounds.height };
};
