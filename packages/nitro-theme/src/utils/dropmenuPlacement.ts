/**
 * Where Flash puts a drop menu's expanded view and how tall it is (`DropBaseController`).
 * `populateExpandedMenu` makes it the menu's own rectangle grown to the items plus its 3px padding
 * item plus 4, then `fitToDesktop` moves it back onto the screen and cuts it to the desktop's
 * height less 30, at y 30 - its `scrollable_itemlist_vertical` scrolls what no longer fits.
 * Coordinates are screen pixels: `anchor` from `getGlobalRect` of the closed menu, `itemsHeight`
 * the items' summed height. Draw the result with `Dropmenu expanded`.
 *
 * The top and left corrections are Flash's as written: a menu above or left of the desktop is
 * offset by `top - desktop.top` (further out, not back in). Nothing opens there in practice - the
 * menu starts on its closed self - so they are kept rather than second-guessed.
 */

/** `populateExpandedMenu`'s `padding` item (1x3) under the items. */
export const DROPMENU_EXPANDED_PADDING_ITEM_HEIGHT = 3;
/** The `+ 4` `populateExpandedMenu` grows the view by, and the list's margin in it. */
export const DROPMENU_EXPANDED_MARGIN = 4;
/** `fitToDesktop`: an expanded menu taller than the desktop minus this is cut to it and put at this y. */
const EXPANDED_DESKTOP_MARGIN = 30;

export interface ExpandedDropmenuPlacement {
    x: number;
    y: number;
    height: number;
    /** The item list's visible height when the items do not fit and scroll; otherwise undefined. */
    listHeight?: number;
}

export const placeExpandedDropmenu = (anchor: { x: number; y: number; width: number; height: number }, itemsHeight: number, desktop: { width: number; height: number }): ExpandedDropmenuPlacement => {
    const fullHeight = Math.max(anchor.height, itemsHeight + DROPMENU_EXPANDED_PADDING_ITEM_HEIGHT + DROPMENU_EXPANDED_MARGIN);
    let { x, y } = anchor;
    let height = fullHeight;

    if ((y + height) > desktop.height) y += desktop.height - (y + height);
    else if (y < 0) y += y;

    if (x < 0) x += x;
    else if ((x + anchor.width) > desktop.width) x += desktop.width - (x + anchor.width);

    if (height > (desktop.height - EXPANDED_DESKTOP_MARGIN)) {
        height = desktop.height - EXPANDED_DESKTOP_MARGIN;
        y = EXPANDED_DESKTOP_MARGIN;
    }

    return { x, y, height, listHeight: (height < fullHeight) ? (height - DROPMENU_EXPANDED_MARGIN) : undefined };
};
