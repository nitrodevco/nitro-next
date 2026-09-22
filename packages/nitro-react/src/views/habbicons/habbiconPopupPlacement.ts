/**
 * `HabbiconPopupController`'s geometry: which parts of the item popup a mode shows
 * (`configurePopup`), how high that makes it (the content list and background sized to their
 * items, the pointer under them), and where `positionPopup` puts it over a tile.
 */
import { HabbiconEntryModel, HabbiconPopupMode, HabbiconPopupModeName, resolveHabbiconPopupMode } from '#base/context/habbicons';

/** `HABBICON_POPUP_HORIZONTAL_MARGIN`, `HABBICON_POPUP_VERTICAL_OFFSET`. */
const HORIZONTAL_MARGIN = 4;
const VERTICAL_OFFSET = 2;
/** `habbicon_popup_layer`'s size. */
export const HABBICON_POPUP_LAYER_WIDTH = 560;
export const HABBICON_POPUP_LAYER_HEIGHT = 428;
export const HABBICON_POPUP_WIDTH = 180;
/** The content list's top in the background, and the background's height below the list. */
export const HABBICON_POPUP_LIST_TOP = 6;
export const HABBICON_POPUP_LIST_BOTTOM = 7;
export const HABBICON_POPUP_POINTER_HEIGHT = 15;

/** The popup's parts shown in a mode: the description for purchase and info, the bottom bar for purchase, the action row otherwise. */
export const habbiconPopupParts = (mode: HabbiconPopupModeName) => {
    const purchase = (mode === HabbiconPopupMode.PURCHASE);
    const description = purchase || (mode === HabbiconPopupMode.INFO);

    return { description, bottomBar: purchase, actionRow: !description };
};

/** The popup's height: the background (the list, with every shown item after the 17px title 5px on) and the pointer under it. */
export const getHabbiconPopupHeight = (entry: HabbiconEntryModel): number => {
    const parts = habbiconPopupParts(resolveHabbiconPopupMode(entry));
    const list = 17 + (parts.description ? 25 : 0) + (parts.actionRow ? 33 : 0) + (parts.bottomBar ? 33 : 0);

    return HABBICON_POPUP_LIST_TOP + list + HABBICON_POPUP_LIST_BOTTOM + HABBICON_POPUP_POINTER_HEIGHT;
};

/** `positionPopup`: the tile's rect relative to the layer in, the popup's position out. */
export const placeHabbiconPopup = (tile: { x: number; y: number; width: number }, popupHeight: number): { x: number; y: number } => {
    const maxX = Math.trunc(Math.max(HORIZONTAL_MARGIN, HABBICON_POPUP_LAYER_WIDTH - HABBICON_POPUP_WIDTH - HORIZONTAL_MARGIN));
    const x = Math.max(HORIZONTAL_MARGIN, Math.min(maxX, Math.trunc(tile.x + ((tile.width - HABBICON_POPUP_WIDTH) * 0.5))));
    const maxY = Math.trunc(Math.max(0, HABBICON_POPUP_LAYER_HEIGHT - popupHeight));
    const y = Math.max(0, Math.min(maxY, Math.trunc(tile.y - popupHeight + VERTICAL_OFFSET)));

    return { x, y };
};
