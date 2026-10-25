import { TemplateBindings, TemplateElement, TemplateItem } from '@nitrodevco/nitro-theme';
import { useEffect, useState } from 'react';

import { clearMarketplaceOwnHistory, recallAllMarketplaceOffers, redeemExpiredMarketplaceOffer, requestMarketplaceOwnItems } from '#base/commands';
import { useCatalogStore, useCatalogStoreApi } from '#base/context/catalog';
import { useWebSocketContext } from '#base/context/communication';
import { useSystemStore, useTranslation, useWindowActions } from '#base/context/system';
import { findTemplateChild, useTemplateLibrary } from '#base/theme';
import {
    formatMarketplaceStatusTime, getMarketplaceOfferTexts, MARKETPLACE_OFFER_STATUS_EXPIRED, MARKETPLACE_OFFER_STATUS_ONGOING, MARKETPLACE_OFFER_STATUS_SOLD, MARKETPLACE_OWN_CATEGORY_EXPIRED,
    MARKETPLACE_OWN_CATEGORY_OPEN, MARKETPLACE_OWN_CATEGORY_SOLD, MarketplaceOfferData,
} from '#base/utils';
import { marketplaceOfferImageBindings } from '#base/views/catalog/marketplace/marketplaceOfferImage';

import { CatalogWidgetProps } from '../CatalogPageRegistry';
import { CATALOG_LIBRARY, catalogTemplateId } from '../catalogTemplates';
import { useCatalogWidgetView } from '../catalogWidgetView';

/** `MAX_SEARCH_STRING_LENGTH`. */
const MAX_SEARCH_STRING_LENGTH = 40;

/** The row prototype each status takes (`_itemTemplates`, removed from `item_list` by `init`). */
const ROW_TEMPLATES: Record<number, string> = {
    [MARKETPLACE_OFFER_STATUS_ONGOING]: 'ongoing_item',
    [MARKETPLACE_OFFER_STATUS_SOLD]: 'sold_item',
    [MARKETPLACE_OFFER_STATUS_EXPIRED]: 'expired_item',
};

/** `populateCategoryDropMenu`'s order: `getCategoryForSelection` / `getDropMenuSelectionForCategory`. */
const CATEGORIES = [ MARKETPLACE_OWN_CATEGORY_OPEN, MARKETPLACE_OWN_CATEGORY_SOLD, MARKETPLACE_OWN_CATEGORY_EXPIRED ];
const CATEGORY_TEXTS: Record<number, { key: string; fallback: string }> = {
    [MARKETPLACE_OWN_CATEGORY_OPEN]: { key: 'shop.marketplace.own.offers.category.open', fallback: 'OPEN' },
    [MARKETPLACE_OWN_CATEGORY_SOLD]: { key: 'shop.marketplace.own.offers.category.sold', fallback: 'SOLD' },
    [MARKETPLACE_OWN_CATEGORY_EXPIRED]: { key: 'shop.marketplace.own.offers.category.expired', fallback: 'EXPIRED' },
};

type Translate = (key: string, defaultValue?: string, replacements?: Record<string, string>) => string;

/** `getStatusText`: the status text, with its time (`..._at`, `%timestamp%`) when the offer has one. */
const getStatusText = (t: Translate, offer: MarketplaceOfferData, key: string, timeKey: string) => {
    const text = t(key, '');

    if (isNaN(offer.statusTime) || (offer.statusTime <= 0)) return text;

    return t(timeKey, text, { timestamp: formatMarketplaceStatusTime(offer.statusTime) });
};

/** `updateList`'s `item_time`: at least a minute left, as hours and minutes. */
const getTimeLeftText = (t: Translate, offer: MarketplaceOfferData) => {
    const minutes = Math.max(1, offer.timeLeftMinutes);
    const hours = Math.floor(minutes / 60);
    let time = `${minutes - (hours * 60)} ${t('catalog.marketplace.offer.minutes')}`;

    if (hours > 0) time = `${hours} ${t('catalog.marketplace.offer.hours')} ${time}`;

    return t('catalog.marketplace.offer.time_left', '', { time });
};

/**
 * `updateList`: one row - a clone of the status's prototype (`claimItemWindow`) - with the name,
 * description, price (the expired row has none), the time left with `pick` (take the offer back),
 * the sold text or the expired text, and the icon with its overlays.
 */
const ownOfferItem = (from: string | TemplateElement, offer: MarketplaceOfferData, t: Translate, name: string, description: string, onPick: () => void): TemplateItem => {
    const bindings: TemplateBindings = {
        item_name: { caption: name },
        item_desc: { caption: description },
        ...marketplaceOfferImageBindings(offer, true),
    };

    if (offer.status !== MARKETPLACE_OFFER_STATUS_EXPIRED) bindings.item_price = { caption: t('catalog.marketplace.offer.price_own_item', '', { price: String(offer.price) }) };

    if (offer.status === MARKETPLACE_OFFER_STATUS_ONGOING) {
        bindings.item_time = { caption: getTimeLeftText(t, offer) };
        bindings.pick_button = { onPointerTap: onPick };
    }

    if (offer.status === MARKETPLACE_OFFER_STATUS_SOLD) bindings.item_sold = { caption: getStatusText(t, offer, 'catalog.marketplace.offer.sold', 'catalog.marketplace.offer.sold_at') };
    if (offer.status === MARKETPLACE_OFFER_STATUS_EXPIRED) bindings.item_expired = { caption: getStatusText(t, offer, 'catalog.marketplace.offer.expired', 'catalog.marketplace.offer.expired_at') };

    return { key: String(offer.offerId), from, bindings };
};

/**
 * `marketPlaceOwnItemsWidget` - Flash's `MarketPlaceOwnItemsCatalogWidget`. `displayMainView`
 * attaches the `marketPlaceOwnItemsWidget` view, which in `layout_marketplace_own_items` (an
 * `EMBEDDED` container) is the layout's own children: `redeem_info`, the `search_container` row (the
 * `offer_category_dropmenu`, the search field with its placeholder and clear button, `search`), the
 * `item_list`, the `status_text` and the bottom buttons.
 *
 * - `init`: the row prototypes leave the list, the category menu lists open, sold and expired
 *   (`shop.marketplace.own.offers.category.*`, `OPEN` / `SOLD` / `EXPIRED` when a text is missing)
 *   and the open offers are asked for.
 * - Picking a category (`setSelectedCategory`) empties the list, says "searching", disables the
 *   bottom button and asks for that category's offers.
 * - A list arriving (`listUpdatedNotify`) is filtered by the search text taken when the search ran
 *   (`performSearch`: the button or Enter; the name and description, lower-cased, must contain
 *   it), the status gives the count, and the bottom button is enabled when the category holds
 *   anything. Offers taken back or marked seen leave the list (`removeOfferIds`).
 * - Typing only swaps the placeholder for the clear button (`updateSearchUiState`); the clear
 *   button empties the field and the filter.
 * - The bottom button is `recall_all_button` for open offers and `mark_as_seen_button` for sold or
 *   expired ones (`updateBottomActionButtons`), each behind a confirmation (`recallAllOffers` /
 *   `clearOwnHistory`). An ongoing row's `pick` takes that offer back.
 *
 * `showRedeemInfo` shows a `redeem_border` the layout no longer has, so it changes nothing. Flash
 * pools the row windows (`claimItemWindow` / `recycleItemWindow`); rows here are just cloned.
 */
export const CatalogMarketPlaceOwnItemsWidgetView = ({ tags }: CatalogWidgetProps) => {
    const store = useCatalogStoreApi();
    const { send } = useWebSocketContext();
    const t = useTranslation();
    const templates = useTemplateLibrary(CATALOG_LIBRARY);
    const ownOffers = useCatalogStore(x => x.marketplaceOwnOffers);
    const ownOffersSerial = useCatalogStore(x => x.marketplaceOwnOffersSerial);
    const wallItems = useSystemStore(x => x.wallItems);
    const { showConfirm } = useWindowActions();
    const [ category, setCategory ] = useState(MARKETPLACE_OWN_CATEGORY_OPEN);
    const [ searchInput, setSearchInput ] = useState('');
    // `§_-z1v§`: the filter the last search took from the field, lower-cased.
    const [ searchText, setSearchText ] = useState('');
    // The list serial the last category request was sent at: the list stays empty until a newer one arrives.
    const [ requestSerial, setRequestSerial ] = useState(ownOffersSerial);

    // `init` -> `setSelectedCategory(1)`.
    useEffect(() => {
        requestMarketplaceOwnItems(send, store, MARKETPLACE_OWN_CATEGORY_OPEN);
    }, [ send, store ]);

    const setSelectedCategory = (next: number) => {
        setCategory(next);
        setRequestSerial(requestMarketplaceOwnItems(send, store, next));
    };

    // `applySearchFilter` over `_allOffers`, once a list has arrived for this category.
    const listArrived = (ownOffersSerial !== requestSerial) && !!ownOffers;
    const offers = listArrived
        ? ownOffers.map(offer => ({ offer, ...getMarketplaceOfferTexts(offer, wallItems, t) })).filter(({ name, description }) => ((searchText === '') || (`${name} ${description}`.toLowerCase().indexOf(searchText) >= 0)))
        : [];

    // `updateStatusDisplay` / `updateBottomActionButtons`.
    const statusText = !listArrived ? t('catalog.marketplace.searching') : ((offers.length > 0) ? t('catalog.marketplace.items_found', '', { count: String(offers.length) }) : t('catalog.marketplace.no_items'));
    const hasOffers = listArrived && (ownOffers.length > 0);
    const isOpen = (category === MARKETPLACE_OWN_CATEGORY_OPEN);
    const hasSearch = (searchInput.length > 0);

    const performSearch = () => setSearchText(searchInput.toLowerCase());

    const clearSearch = () => {
        setSearchInput('');
        setSearchText('');
    };

    const recallAll = () => showConfirm(t('shop.marketplace.recall.all.button'), t('shop.marketplace.recall.all.items'), () => recallAllMarketplaceOffers(send));

    const markAsSeen = () => showConfirm(t('shop.marketplace.mark.as.seen.button'), t('shop.marketplace.mark.as.seen.items'), () => clearMarketplaceOwnHistory(send, store, category));

    // The row prototypes: the layout's own in an embedded container, the attached view's otherwise.
    const embedded = tags.includes('EMBEDDED');
    const ownView = templates?.[catalogTemplateId('marketPlaceOwnItemsWidget')];
    const rowFrom = (status: number): string | TemplateElement | undefined => {
        const name = ROW_TEMPLATES[status] as string | undefined;

        if (!name) return undefined;

        return embedded ? name : (ownView && findTemplateChild(ownView.elements, name));
    };

    const items: TemplateItem[] = [];

    for (const { offer, name, description } of offers) {
        const from = rowFrom(offer.status);

        if (from) items.push(ownOfferItem(from, offer, t, name, description, () => redeemExpiredMarketplaceOffer(send, offer.offerId)));
    }

    useCatalogWidgetView(templates && {
        template: 'marketPlaceOwnItemsWidget',
        bindings: {
            offer_category_dropmenu: {
                options: CATEGORIES.map(value => t(CATEGORY_TEXTS[value].key, CATEGORY_TEXTS[value].fallback)),
                selection: Math.max(0, CATEGORIES.indexOf(category)),
                onSelect: (index) => {
                    const value = CATEGORIES[index];

                    if ((value !== undefined) && (value !== category)) setSelectedCategory(value);
                },
            },
            search_input: {
                caption: searchInput,
                onChange: value => setSearchInput(value.slice(0, MAX_SEARCH_STRING_LENGTH)),
                onEnter: performSearch,
            },
            search_placeholder: { visible: !hasSearch },
            cancel_search_btn: { visible: hasSearch, onPointerTap: clearSearch },
            search_button: { onPointerTap: performSearch },
            status_text: { caption: statusText },
            recall_all_button: { visible: isOpen, disabled: !(hasOffers && isOpen), onPointerTap: recallAll },
            mark_as_seen_button: { visible: !isOpen, disabled: !(hasOffers && !isOpen), onPointerTap: markAsSeen },
            item_list: { items },
        },
    });

    return null;
};
