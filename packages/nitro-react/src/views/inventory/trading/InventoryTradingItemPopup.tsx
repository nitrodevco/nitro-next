/**
 * The popup that names what a trade slot holds - Flash `inventory/ItemPopupCtrl` over
 * `item_popup_xml` (203x90): a style 0 border with the item's name across the top (5,5 w190,
 * centred) and its picture under it (8,22 190x55), and an arrow pointing back at the slot.
 *
 * `show` places it beside the slot rather than over it - to the slot's left when it would otherwise
 * run off the right of the screen, to its right otherwise, 5px into the slot either way and centred
 * on the slot's height. `showDelayed` / `hideDelayed` are the two timers a hover runs through, so
 * dragging the pointer across the nine slots does not flash a popup for each one.
 *
 * Not ported: `nft_image`'s taller layout - Flash grows the popup for a collectible and draws its
 * product preview full size, where this draws it in the same picture box a furni uses - and the
 * limited-edition overlay beside it.
 */
import { ReactNode } from 'react';

import { Border, FloatingPopup, ThemeText } from '#base/theme';

/** `item_popup_xml`'s own size. */
const POPUP_WIDTH = 203;
const POPUP_HEIGHT = 90;

/** `show`: how far the popup sits into the slot it points at. */
const POPUP_OVERLAP = 5;

/** Where the popup is anchored - the slot's rectangle in screen space. */
export interface InventoryTradingItemPopupAnchor {
    x: number;
    y: number;
    width: number;
    height: number;
}

interface InventoryTradingItemPopupProps {
    anchor: InventoryTradingItemPopupAnchor;
    name: string;
    /** The slot's own picture, drawn again in the popup's `item_image` box. */
    image: ReactNode;
    onDismiss: () => void;
}

export const InventoryTradingItemPopup = ({ anchor, name, image, onDismiss }: InventoryTradingItemPopupProps) => {
    // `show`'s two cases: to the slot's right unless that would leave the screen.
    const fitsRight = (anchor.x + anchor.width + POPUP_WIDTH - POPUP_OVERLAP) <= window.innerWidth;
    const x = fitsRight
        ? ((anchor.x + anchor.width) - POPUP_OVERLAP)
        : ((anchor.x - POPUP_WIDTH) + POPUP_OVERLAP);
    const y = anchor.y + ((anchor.height - POPUP_HEIGHT) / 2);

    return (
        <FloatingPopup
            x={x}
            y={y}
            onOutsideClick={onDismiss}
        >
            <Border
                variant="0"
                name="item_popup_content"
                layout={{ width: POPUP_WIDTH, height: POPUP_HEIGHT, minWidth: POPUP_WIDTH, maxWidth: POPUP_WIDTH, overflow: 'hidden' }}
            >
                <ThemeText
                    text={name}
                    textStyle="u_headline_small"
                    textOptions={{ align: 'center', wordWrap: true, wordWrapWidth: 186 }}
                    name="item_name_text"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 5, top: 5, width: 190 }}
                />
                <Border
                    name="item_image"
                    layout={{ position: 'absolute', left: 8, top: 22, width: 190, height: 55, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}
                >
                    {image}
                </Border>
            </Border>
        </FloatingPopup>
    );
};
