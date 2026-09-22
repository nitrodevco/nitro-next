import { useEffect, useState } from 'react';

import { clearMarketplaceOwnHistory, recallAllMarketplaceOffers, redeemExpiredMarketplaceOffer, requestMarketplaceOwnItems } from '#base/commands';
import { useCatalogStore, useCatalogStoreApi } from '#base/context/catalog';
import { useWebSocketContext } from '#base/context/communication';
import { useSystemStore, useTranslation } from '#base/context/system';
import { Border, Button, Dropmenu, LayoutImage, Region, ScrollArea, TextInput, ThemeImage, ThemeText } from '#base/theme';
import {
    formatMarketplaceStatusTime, getMarketplaceOfferTexts, MARKETPLACE_OFFER_STATUS_EXPIRED, MARKETPLACE_OFFER_STATUS_ONGOING, MARKETPLACE_OFFER_STATUS_SOLD, MARKETPLACE_OWN_CATEGORY_EXPIRED,
    MARKETPLACE_OWN_CATEGORY_OPEN, MARKETPLACE_OWN_CATEGORY_SOLD, MarketplaceOfferData,
} from '#base/utils';
import { CatalogMarketplaceOfferImageView } from '#base/views/catalog/marketplace/CatalogMarketplaceOfferImageView';

/** `MAX_SEARCH_STRING_LENGTH`. */
const MAX_SEARCH_STRING_LENGTH = 40;

/** The row template each status uses (`_itemTemplates`) and its background tint. */
const ROW_TEMPLATES: Record<number, { name: string; tint: string }> = {
    [MARKETPLACE_OFFER_STATUS_ONGOING]: { name: 'ongoing_item', tint: '#f6f6f3' },
    [MARKETPLACE_OFFER_STATUS_SOLD]: { name: 'sold_item', tint: '#e2f5d8' },
    [MARKETPLACE_OFFER_STATUS_EXPIRED]: { name: 'expired_item', tint: '#f5d5d3' },
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

interface OwnOfferItemProps {
    offer: MarketplaceOfferData;
    onPick: (offer: MarketplaceOfferData) => void;
}

/**
 * One row of `item_list` - `ongoing_item`, `sold_item` or `expired_item` by the offer's status,
 * 340x58 style 100 borders in their own tint: the icon container at 9,9, the bold name, the
 * italic description and (not for an expired one) the price at 58,5/17/29, then the time left
 * with the `pick` button (take the offer back), the sold text or the expired text at 58,41.
 */
const OwnOfferItem = ({ offer, onPick }: OwnOfferItemProps) => {
    const t = useTranslation();
    const wallItems = useSystemStore(x => x.wallItems);
    const template = ROW_TEMPLATES[offer.status];

    if (!template) return null;

    const { name, description } = getMarketplaceOfferTexts(offer, wallItems, t);

    let statusText: string;

    if (offer.status === MARKETPLACE_OFFER_STATUS_ONGOING) statusText = getTimeLeftText(t, offer);
    else if (offer.status === MARKETPLACE_OFFER_STATUS_SOLD) statusText = getStatusText(t, offer, 'catalog.marketplace.offer.sold', 'catalog.marketplace.offer.sold_at');
    else statusText = getStatusText(t, offer, 'catalog.marketplace.offer.expired', 'catalog.marketplace.offer.expired_at');

    return (
        <Border
            variant="100"
            name={template.name}
            tintColor={template.tint}
            layout={{ width: 340, height: 58, flexShrink: 0 }}
        >
            <CatalogMarketplaceOfferImageView
                offer={offer}
                withExtraData
                left={9}
                top={9}
            />
            <ThemeText
                name="item_name"
                text={name}
                textStyle="u_bold"
                verticalAlign="top"
                layout={{ position: 'absolute', left: 58, top: 5 }}
            />
            <ThemeText
                name="item_desc"
                text={description}
                textStyle="u_small"
                flashFormat={{ italic: true }}
                verticalAlign="top"
                layout={{ position: 'absolute', left: 58, top: 17 }}
            />
            {(offer.status !== MARKETPLACE_OFFER_STATUS_EXPIRED) && (
                <ThemeText
                    name="item_price"
                    text={t('catalog.marketplace.offer.price_own_item', '', { price: String(offer.price) })}
                    textStyle="u_small"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 58, top: 29 }}
                />
            )}
            <ThemeText
                name={(offer.status === MARKETPLACE_OFFER_STATUS_ONGOING) ? 'item_time' : ((offer.status === MARKETPLACE_OFFER_STATUS_SOLD) ? 'item_sold' : 'item_expired')}
                text={statusText}
                textStyle="u_small"
                verticalAlign="top"
                layout={{ position: 'absolute', left: 58, top: 41 }}
            />
            {(offer.status === MARKETPLACE_OFFER_STATUS_ONGOING) && (
                <Button
                    variant="3"
                    name="pick_button"
                    textStyle="button_shiny_regular"
                    onPointerTap={() => onPick(offer)}
                    layout={{ position: 'absolute', left: 145, width: 189, top: 31, height: 22 }}
                >
                    {t('catalog.marketplace.offer.pick')}
                </Button>
            )}
        </Border>
    );
};

/**
 * `marketPlaceOwnItemsWidget` - Flash's `MarketPlaceOwnItemsCatalogWidget`, embedded in
 * `layout_marketplace_own_items` (the container is `EMBEDDED`): the italic `redeem_info`, the
 * `search_container` row (the `offer_category_dropmenu`, the style 105 search field with its
 * placeholder and clear button, `search`), the `item_list`, the `status_text` and the bottom
 * buttons.
 *
 * - `init`: the category menu lists open, sold and expired (`shop.marketplace.own.offers.category.*`,
 *   `OPEN` / `SOLD` / `EXPIRED` when a text is missing) and the open offers are asked for.
 * - Picking a category (`setSelectedCategory`) empties the list, says "searching", disables the
 *   bottom button and asks for that category's offers.
 * - A list arriving (`listUpdatedNotify`) is filtered by the search text taken when the search ran
 *   (`performSearch`: the button or Enter; the name and description, lower-cased, must contain
 *   it), the status gives the count, and the bottom button is enabled when the category holds
 *   anything. Offers taken back or marked seen leave the list (`removeOfferIds`).
 * - Typing only swaps the placeholder for the clear button (`updateSearchUiState`); the clear
 *   button empties the field and the filter.
 * - The bottom button is `recall_all_button` (red, `il_regular_white`) for open offers and
 *   `mark_as_seen_button` for sold or expired ones, each behind a confirmation
 *   (`recallAllOffers` / `clearOwnHistory`). An ongoing row's `pick` takes that offer back.
 *
 * `showRedeemInfo` shows a `redeem_border` the layout no longer has, so it changes nothing. Flash
 * pools the row windows (`claimItemWindow` / `recycleItemWindow`); rows here are just rendered.
 */
export const CatalogMarketPlaceOwnItemsWidgetView = () => {
    const store = useCatalogStoreApi();
    const { send } = useWebSocketContext();
    const t = useTranslation();
    const ownOffers = useCatalogStore(x => x.marketplaceOwnOffers);
    const ownOffersSerial = useCatalogStore(x => x.marketplaceOwnOffersSerial);
    const wallItems = useSystemStore(x => x.wallItems);
    const showConfirm = useSystemStore(x => x.showConfirm);
    const [ category, setCategory ] = useState(MARKETPLACE_OWN_CATEGORY_OPEN);
    const [ searchInput, setSearchInput ] = useState('');
    // `§_-z1v§`: the filter the last search took from the field, lower-cased.
    const [ searchText, setSearchText ] = useState('');
    // The list serial the last category request was sent at: the list stays empty until a newer one arrives.
    const [ requestSerial, setRequestSerial ] = useState(() => store.getState().marketplaceOwnOffersSerial);

    // `init` -> `setSelectedCategory(1)`.
    useEffect(() => {
        requestMarketplaceOwnItems(send, store, MARKETPLACE_OWN_CATEGORY_OPEN);
    }, [ send, store ]);

    const setSelectedCategory = (next: number) => {
        setCategory(next);
        setRequestSerial(store.getState().marketplaceOwnOffersSerial);
        requestMarketplaceOwnItems(send, store, next);
    };

    // `applySearchFilter` over `_allOffers`, once a list has arrived for this category.
    const listArrived = (ownOffersSerial !== requestSerial) && !!ownOffers;
    const offers = listArrived
        ? ownOffers.filter((offer) => {
                if (searchText === '') return true;

                const { name, description } = getMarketplaceOfferTexts(offer, wallItems, t);

                return `${name} ${description}`.toLowerCase().indexOf(searchText) >= 0;
            })
        : [];

    // `updateStatusDisplay` / `updateBottomActionButtons`.
    const statusText = !listArrived ? t('catalog.marketplace.searching') : ((offers.length > 0) ? t('catalog.marketplace.items_found', '', { count: String(offers.length) }) : t('catalog.marketplace.no_items'));
    const hasOffers = listArrived && (ownOffers.length > 0);
    const isOpen = (category === MARKETPLACE_OWN_CATEGORY_OPEN);

    const performSearch = () => setSearchText(searchInput.toLowerCase());

    const clearSearch = () => {
        setSearchInput('');
        setSearchText('');
    };

    const recallAll = () => showConfirm(t('shop.marketplace.recall.all.button'), t('shop.marketplace.recall.all.items'), () => recallAllMarketplaceOffers(send));

    const markAsSeen = () => showConfirm(t('shop.marketplace.mark.as.seen.button'), t('shop.marketplace.mark.as.seen.items'), () => clearMarketplaceOwnHistory(send, store, category));

    const categoryOptions = CATEGORIES.map(value => ({
        key: value,
        label: t(CATEGORY_TEXTS[value].key, CATEGORY_TEXTS[value].fallback),
        selected: value === category,
        onSelect: () => {
            if (value !== category) setSelectedCategory(value);
        },
    }));

    return (
        <Region layout={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0 }}>
            <ThemeText
                name="redeem_info"
                text={t('catalog.marketplace.own_info')}
                textStyle="u_italic"
                textOptions={{ wordWrap: true, wordWrapWidth: 336 }}
                verticalAlign="top"
                layout={{ position: 'absolute', left: 10, width: 340, top: 0 }}
            />
            <Region
                name="search_container"
                layout={{ position: 'absolute', left: 0, width: 347, top: 39, height: 26 }}
            >
                <Dropmenu
                    variant="3"
                    caption={categoryOptions.find(option => option.selected)?.label ?? ''}
                    options={categoryOptions}
                    layout={{ position: 'absolute', left: 0, width: 90, top: 0, height: 25 }}
                />
                <Border
                    variant="105"
                    name="search_input_border"
                    layout={{ position: 'absolute', left: 100, width: 160, top: 0, height: 26 }}
                >
                    <TextInput
                        value={searchInput}
                        onChange={value => setSearchInput(value.slice(0, MAX_SEARCH_STRING_LENGTH))}
                        onEnter={performSearch}
                        maxLength={MAX_SEARCH_STRING_LENGTH}
                        textStyle="u_regular"
                        flashPlacement
                        alwaysShowSelection
                        backgroundColor={null}
                        focusedBackgroundColor={null}
                        layout={{ position: 'absolute', left: 6, width: 151, top: 3, height: 19 }}
                    />
                    {(searchInput.length === 0) && (
                        <Region
                            name="search_placeholder"
                            alpha={0.5}
                            layout={{ position: 'absolute', left: 6, top: 3, paddingTop: 1 }}
                        >
                            <ThemeText
                                text={t('catalog.search')}
                                textStyle="u_regular"
                                textOptions={{ fill: '#666666' }}
                                verticalAlign="top"
                            />
                        </Region>
                    )}
                    {(searchInput.length > 0) && (
                        <Region
                            name="cancel_search_btn"
                            cursor="pointer"
                            onPointerTap={clearSearch}
                            layout={{ position: 'absolute', left: 137, width: 19, top: 3, height: 19 }}
                        >
                            <ThemeImage
                                src={LayoutImage('shared/icons_close.png')}
                                bitmap={{ stretchedX: false, stretchedY: false, fitSizeToContents: true }}
                                layout={{ position: 'absolute', left: 5, top: 4 }}
                            />
                        </Region>
                    )}
                </Border>
                <Button
                    variant="3"
                    name="search_button"
                    textStyle="button_shiny_regular"
                    onPointerTap={performSearch}
                    layout={{ position: 'absolute', left: 270, width: 69, top: 0, height: 25 }}
                >
                    {t('generic.search')}
                </Button>
            </Region>
            <ThemeText
                name="status_text"
                text={statusText}
                textStyle="u_small"
                verticalAlign="top"
                layout={{ position: 'absolute', left: 0, bottom: 5, height: 15 }}
            />
            {isOpen && (
                <Button
                    variant="3"
                    name="recall_all_button"
                    textStyle="il_regular_white"
                    tintColor="#e33934"
                    disabled={!hasOffers}
                    onPointerTap={recallAll}
                    layout={{ position: 'absolute', left: 275, width: 64, bottom: 2, height: 24 }}
                >
                    {t('shop.marketplace.recall.all.button')}
                </Button>
            )}
            {!isOpen && (
                <Button
                    variant="3"
                    name="mark_as_seen_button"
                    textStyle="button_shiny_regular"
                    disabled={!hasOffers}
                    onPointerTap={markAsSeen}
                    layout={{ position: 'absolute', left: 249, width: 90, bottom: 2, height: 24 }}
                >
                    {t('shop.marketplace.mark.as.seen.button')}
                </Button>
            )}
            <ScrollArea
                orientation="vertical"
                variant="3"
                scrollResetKey={requestSerial}
                layout={{ position: 'absolute', left: 0, width: 360, top: 72, bottom: 36 }}
                contentLayout={{ position: 'relative', width: '100%', flexDirection: 'column', gap: 1 }}
            >
                {offers.map(offer => (
                    <OwnOfferItem
                        key={offer.offerId}
                        offer={offer}
                        onPick={item => redeemExpiredMarketplaceOffer(send, item.offerId)}
                    />
                ))}
            </ScrollArea>
        </Region>
    );
};
