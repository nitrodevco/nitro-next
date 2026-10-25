/**
 * `HabbiconPopupController` - the item popup over a clicked tile, `habbicon_view.xml`'s
 * `habbicon_item_popup` in its `habbicon_popup_layer`.
 *
 * `configurePopup` by `HabbiconPopupMode.resolve`: the habbicon's name, then
 * - purchase: `habbicon.popup.desc.not_owned` and `habbicon_popup_bottom_bar` - its price, the
 *   currency icon and the buy button;
 * - info (a reward, or a habbicon without a price): what it is - owned, claim or locked;
 * - claim / add to favourites (green) / remove from favourites (`#7a0030`): the action button.
 *
 * `positionPopup` (`placeHabbiconPopup`) centres it over the tile, 2px into the tile's top edge,
 * kept 4px inside the layer's sides and within its height, once its lists are arranged to what it
 * shows. The hub hides it on a press outside it and the tile (not within 75ms of showing it) and on
 * any mouse wheel (`onStageMouseDown`, `onStageMouseWheel`).
 */
import { formatHabbiconPrice, getHabbiconPriceCurrency, HabbiconEntryModel, HabbiconPopupMode, HabbiconPopupModeName } from '#base/context/habbicons';
import { useTranslation } from '#base/context/system';
import { TemplateBindings, TemplateRect, TemplateWindows } from '#base/theme';
import { getCurrencyIconStyle } from '#base/utils';

/** `HABBICON_POPUP_HORIZONTAL_MARGIN`, `HABBICON_POPUP_VERTICAL_OFFSET`. */
const HORIZONTAL_MARGIN = 4;
const VERTICAL_OFFSET = 2;

/** The action button's green (`106753`), and `§_-71P§` for removing a favourite. */
const ACTION_COLOR = 0x01a101;
const REMOVE_FAVORITE_COLOR = 0x7a0030;

export interface HabbiconPopupBindingsOptions {
    /** The tile's entry, while the popup is shown. */
    entry: HabbiconEntryModel | undefined;
    mode: HabbiconPopupModeName;
    t: ReturnType<typeof useTranslation>;
    config: Record<string, unknown>;
    onAction: (entry: HabbiconEntryModel, mode: HabbiconPopupModeName) => void;
    onBuy: (entry: HabbiconEntryModel) => void;
}

/** `showForTile` / `hide`, and `configurePopup`. */
export const habbiconPopupBindings = ({ entry, mode, t, config, onAction, onBuy }: HabbiconPopupBindingsOptions): TemplateBindings => {
    if (!entry) return { habbicon_item_popup: { visible: false } };

    // `localize`: the fallback for a missing or empty text.
    const localize = (key: string, fallback: string) => {
        const value = t(key, fallback);

        return (value && value.length) ? value : fallback;
    };
    const purchase = (mode === HabbiconPopupMode.PURCHASE);
    const described = purchase || (mode === HabbiconPopupMode.INFO);

    // `resolveDescription`.
    let description = localize('habbicon.popup.desc.not_owned', 'Not owned');

    if (mode === HabbiconPopupMode.INFO) {
        if (entry.owned || entry.favorite) description = localize('generic.owned', 'Owned');
        else if (entry.isReward) description = entry.claimable ? localize('habbicon_reward.claim', 'Claim') : localize('habbicon.popup.desc.locked', 'Locked');
    }

    let actionCaption = localize('habbicon_reward.claim', 'Claim');
    let actionColor = ACTION_COLOR;

    if (mode === HabbiconPopupMode.REMOVE_FAVORITE) {
        actionCaption = localize('habbicon.favourite.remove', 'Remove from favourites');
        actionColor = REMOVE_FAVORITE_COLOR;
    } else if (mode === HabbiconPopupMode.ADD_FAVORITE) {
        actionCaption = localize('habbicon.favourite.add', 'Add to favourites');
    }

    return {
        habbicon_item_popup: { visible: true },
        habbicon_popup_title: { caption: entry.name.length ? entry.name : 'Habbicon' },
        habbicon_popup_description: { visible: described, ...(described && { caption: description }) },
        habbicon_popup_bottom_bar: { visible: purchase },
        habbicon_popup_action_row: { visible: !described },
        habbicon_popup_action_button: {
            ...(!described && { caption: actionCaption, color: actionColor }),
            onPointerTap: () => onAction(entry, mode),
        },
        ...(purchase && {
            habbicon_popup_price: { caption: formatHabbiconPrice(entry.priceCredits, entry.priceActivityPoints) },
            habbicon_popup_currency_icon: { style: String(getCurrencyIconStyle(getHabbiconPriceCurrency(entry.priceActivityPoints, entry.activityPointType), config, false)) },
        }),
        habbicon_popup_buy_button: { onPointerTap: () => onBuy(entry) },
    };
};

/**
 * `positionPopup`: the tile's rect relative to the layer in; the popup moved over it, and its rect
 * in the layer out (for the outside-press test).
 */
export const placeHabbiconPopup = ({ find }: TemplateWindows, tile: { x: number; y: number; width: number }): TemplateRect | undefined => {
    const layer = find('habbicon_popup_layer');
    const popup = find('habbicon_item_popup');

    if (!layer || !popup) return undefined;

    const maxX = Math.trunc(Math.max(HORIZONTAL_MARGIN, layer.width - popup.width - HORIZONTAL_MARGIN));
    const x = Math.max(HORIZONTAL_MARGIN, Math.min(maxX, Math.trunc(tile.x + ((tile.width - popup.width) * 0.5))));
    const maxY = Math.trunc(Math.max(0, layer.height - popup.height));
    const y = Math.max(0, Math.min(maxY, Math.trunc(tile.y - popup.height + VERTICAL_OFFSET)));

    popup.setX(x);
    popup.setY(y);

    return { x, y, width: popup.width, height: popup.height };
};
