/**
 * The info bubbles the wired trading windows open from a grey "i" (`lock_info_bubble` of
 * `chest_generic_xml`, `extra_info_bubble` of `transaction_details_xml`): a style 7 bubble with
 * its pointer on the left, moved onto the desktop, placed by
 * `WiredChestWrapperView.relocateBubbleFocus` - the window 3px right of the button, its middle a
 * pixel under the button's - and hidden again when it loses focus (`WE_DEACTIVATED`), i.e. on a
 * click anywhere else.
 *
 * `width` / `height` are the layout's bubble window, the skin's 6px transparent margin included,
 * and the window is drawn as the Flash window itself (`Bubble` with `margins`): both layouts give
 * the bubble `margin_*` 8 on every side, and put their text list `padding` further in. The
 * pointer is the style's own, 2px left of the window, centred on its height.
 *
 * It is drawn outside the window that opened it (the frame clips its content), in screen
 * coordinates taken from the button when it was clicked.
 */
import { Container as PixiContainer } from 'pixi.js';
import { ReactNode, useRef } from 'react';

import { Box, Bubble, useOutsideClick } from '#base/theme';

import { WiredTradingBubbleAnchor } from './wiredTradingBubbleAnchor';

/** The bubble's `margin_left` / `margin_top` / `margin_right` / `margin_bottom` vars in both layouts. */
const BUBBLE_MARGINS = [ 8, 8, 8, 8 ] as const;

export interface WiredTradingInfoBubbleProps {
    anchor: WiredTradingBubbleAnchor;
    width: number;
    height: number;
    /** The text list's offset inside the bubble's content area (8 in both layouts). */
    padding?: number;
    onClose: () => void;
    children?: ReactNode;
}

export const WiredTradingInfoBubble = ({ anchor, width, height, padding = 8, onClose, children }: WiredTradingInfoBubbleProps) => {
    const ref = useRef<PixiContainer>(null);

    useOutsideClick(ref, onClose);

    return (
        <Box
            ref={ref}
            zIndex={100000}
            layout={{ position: 'absolute', left: Math.round(anchor.x + anchor.width + 3), top: Math.round(anchor.y + 1 + (anchor.height / 2) - (height / 2)) }}
        >
            <Bubble
                variant="7"
                pointer="left"
                margins={BUBBLE_MARGINS}
                layout={{ width, height }}
            >
                <Box layout={{ position: 'absolute', left: padding, top: padding, flexDirection: 'column' }}>
                    {children}
                </Box>
            </Bubble>
        </Box>
    );
};
