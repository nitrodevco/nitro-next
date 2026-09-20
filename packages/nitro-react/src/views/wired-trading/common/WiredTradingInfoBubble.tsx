/**
 * The info bubbles the wired trading windows open from a grey "i" (`lock_info_bubble` of
 * `chest_generic_xml`, `extra_info_bubble` of `transaction_details_xml`): a style 7 bubble with
 * its pointer on the left, moved onto the desktop, placed by
 * `WiredChestWrapperView.relocateBubbleFocus` - the window 3px right of the button, its middle a
 * pixel under the button's - and hidden again when it loses focus (`WE_DEACTIVATED`), i.e. on a
 * click anywhere else.
 *
 * `width` / `height` are the layout's bubble window, the skin's 6px transparent margin included;
 * the content starts at the window's `content_area` (8px in), inside which the layouts put
 * their text list `padding` further in. The pointer sits 2px left of the window.
 *
 * It is drawn outside the window that opened it (the frame clips its content), in screen
 * coordinates taken from the button when it was clicked.
 */
import { Container as PixiContainer } from 'pixi.js';
import { ReactNode, useRef } from 'react';

import { Box, Bubble, useOutsideClick } from '#base/theme';

import { WiredTradingBubbleAnchor } from './wiredTradingBubbleAnchor';

/** `bubble_7_xml`: `content_area` is 8px into the window, the left pointer 2px outside it. */
const BUBBLE_CONTENT_INSET = 8;
const BUBBLE_POINTER_OFFSET = 2;

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
            layout={{ position: 'absolute', left: Math.round(anchor.x + anchor.width + 3) - BUBBLE_POINTER_OFFSET, top: Math.round(anchor.y + 1 + (anchor.height / 2) - (height / 2)) }}
        >
            <Bubble
                variant="7"
                pointer="left"
                layout={{ width, height, flexDirection: 'column', padding: BUBBLE_CONTENT_INSET + padding }}
            >
                {children}
            </Bubble>
        </Box>
    );
};
