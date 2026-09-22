import { useEffect, useState } from 'react';

import { buyMarketplaceOffer, requestMarketplaceItemStats, requestMarketplaceOffers } from '#base/commands';
import { useCatalogStore, useCatalogStoreApi } from '#base/context/catalog';
import { useWebSocketContext } from '#base/context/communication';
import { useSystemStore, useTranslation } from '#base/context/system';
import { useUserStore } from '#base/context/user';
import { Border, Button, ButtonGroupCenter, ButtonGroupLeft, ButtonGroupRight, CheckBox, Dropmenu, Region, ScrollArea, TextInput, ThemeText } from '#base/theme';
import { getMarketplaceOfferTexts, MarketplaceOfferData } from '#base/utils';
import { CatalogMarketplaceOfferDetailsView } from '#base/views/catalog/marketplace/CatalogMarketplaceOfferDetailsView';
import { CatalogMarketplaceOfferImageView } from '#base/views/catalog/marketplace/CatalogMarketplaceOfferImageView';

/** `MAX_SEARCH_STRING_LENGTH` / `MAX_PRICE_STRING_LENGTH`: the inputs are cut at these on every change. */
const MAX_SEARCH_STRING_LENGTH = 40;
const MAX_PRICE_STRING_LENGTH = 10;

/** `USABLE_USED_TEXT_COLOR` / `USABLE_UNUSED_TEXT_COLOR`. */
const USABLE_USED_TEXT_COLOR = '#cc0000';
const USABLE_UNUSED_TEXT_COLOR = '#1e9b39';

/** `search_selector`'s three buttons and the sort types `selectSearchCategory` gives each. */
type SearchCategory = 'search_by_activity' | 'search_by_value' | 'search_advanced';

const SORT_TYPES: Record<SearchCategory, readonly number[]> = {
    search_by_value: [ 1, 2 ],
    search_by_activity: [ 3, 4, 5, 6 ],
    search_advanced: [ 1, 2, 3, 4, 5, 6 ],
};

/** The fields `doSearch` reads off the search container. */
interface SearchFields {
    category: SearchCategory;
    sortSelection: number;
    combineUniques: boolean;
    searchInput: string;
    minPriceInput: string;
    maxPriceInput: string;
}

interface OfferItemProps {
    offer: MarketplaceOfferData;
    safetyLocked: boolean;
    onBuy: (offer: MarketplaceOfferData) => void;
    onMore: (offer: MarketplaceOfferData) => void;
}

/**
 * One `offer_item` of `offer_list` (`addListItem`): a 340x58 style 100 border in `0xf6f6f3`, the
 * icon container at 9,9, the bold name at 57,6, the usage state (`item_usage_state`, bold italic
 * small, red when used and green when not - only for a usable offer) and the price, average and
 * count texts under it, `buy` at 295,6 and `view more` at 137,31. `item_desc` is set but the
 * layout keeps it hidden. The buy button is disabled while the account is safety locked.
 */
const OfferItem = ({ offer, safetyLocked, onBuy, onMore }: OfferItemProps) => {
    const t = useTranslation();
    const wallItems = useSystemStore(x => x.wallItems);
    const { name } = getMarketplaceOfferTexts(offer, wallItems, t);

    return (
        <Border
            variant="100"
            name="offer_item"
            tintColor="#f6f6f3"
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
                layout={{ position: 'absolute', left: 57, top: 6 }}
            />
            {offer.isUsable && (
                <ThemeText
                    name="item_usage_state"
                    text={t(offer.isUsed ? 'catalog.marketplace.offer.used' : 'catalog.marketplace.offer.unused')}
                    textStyle="u_small"
                    textOptions={{ fill: offer.isUsed ? USABLE_USED_TEXT_COLOR : USABLE_UNUSED_TEXT_COLOR }}
                    flashFormat={{ bold: true, italic: true }}
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 57, top: 18 }}
                />
            )}
            <ThemeText
                name="item_price"
                text={t('catalog.marketplace.offer.price_public_item', '', { price: String(offer.price), average: (offer.averagePrice !== 0) ? String(offer.averagePrice) : ' - ' })}
                textStyle="u_small"
                verticalAlign="top"
                layout={{ position: 'absolute', left: 57, top: 30 }}
            />
            <ThemeText
                name="offer_count"
                text={t('catalog.marketplace.offer_count', '', { count: String(offer.offerCount) })}
                textStyle="u_small"
                verticalAlign="top"
                layout={{ position: 'absolute', left: 57, top: 42 }}
            />
            <Button
                variant="3"
                name="buy_button"
                textStyle="button_shiny_regular"
                disabled={safetyLocked}
                onPointerTap={() => onBuy(offer)}
                layout={{ position: 'absolute', left: 295, width: 39, top: 6, height: 22 }}
            >
                {t('buy')}
            </Button>
            <Button
                variant="3"
                name="more_button"
                textStyle="button_shiny_regular"
                onPointerTap={() => onMore(offer)}
                layout={{ position: 'absolute', left: 137, width: 197, top: 31, height: 22 }}
            >
                {t('catalog.marketplace.view_more')}
            </Button>
        </Border>
    );
};

/**
 * `marketPlaceWidget` - Flash's `MarketPlaceCatalogWidget`, embedded in `layout_marketplace`
 * (whose `marketPlaceWidget` container is `EMBEDDED`, so the layout's own children are the view):
 * the `search_selector` (by activity, by value, advanced; `il_button` style 100 group buttons),
 * the `search_container` border holding `marketplace_search_simple` or
 * `marketplace_search_advanced`, the `status_text` and the `offer_list`.
 *
 * - `init` / `displayMainView`: the activity search is selected and run.
 * - `selectSearchCategory` rebuilds the search container: its inputs start empty, the sort
 *   dropmenu lists `catalog.marketplace.sort.<type>` for the category's sort types with the first
 *   selected, and the combine checkbox keeps its state. That selection is a `WE_SELECTED`, which
 *   searches in the two simple categories; the advanced one waits for its search button. (Flash's
 *   rebuilt checkbox also fires a `WE_SELECTED` of its own before the dropmenu is populated, which
 *   sends one search more with the default sort type ahead of this one; the port sends only the
 *   one whose answer is shown.)
 * - `doSearch`: the price inputs (empty is -1), the text, the selected sort type (1 when none)
 *   and the combine checkbox go to `MarketPlaceLogic.requestOffers`; the status says "searching"
 *   until the next list arrives.
 * - A list arriving (`listUpdatedNotify`) closes the details view and fills the list: the status
 *   gives the hit count, and how many are shown when fewer than all. Flash adds the rows five at a
 *   time on a 25ms timer; here they are all there at once.
 * - `buy` goes to `MarketPlaceLogic.buyOffer`, `view more` opens `marketplace_offer_details`
 *   over the main container (`CatalogMarketplaceOfferDetailsView`), which asks for the offer's
 *   stats.
 */
export const CatalogMarketPlaceWidgetView = () => {
    const store = useCatalogStoreApi();
    const { send } = useWebSocketContext();
    const t = useTranslation();
    const offers = useCatalogStore(x => x.marketplaceOffers);
    const totalItemsFound = useCatalogStore(x => x.marketplaceTotalItemsFound);
    const offersSerial = useCatalogStore(x => x.marketplaceOffersSerial);
    const safetyLocked = useUserStore(x => x.accountSafetyLocked);
    const [ fields, setFields ] = useState<SearchFields>({ category: 'search_by_activity', sortSelection: 0, combineUniques: true, searchInput: '', minPriceInput: '', maxPriceInput: '' });
    // The list serial the last search was sent at: "searching" until a newer list arrives.
    const [ searchSerial, setSearchSerial ] = useState(() => store.getState().marketplaceOffersSerial);
    // The list the widget was built on: its rows only fill once a list arrives after that (`init` removes the template).
    const [ mountSerial ] = useState(() => store.getState().marketplaceOffersSerial);
    const [ detailsOffer, setDetailsOffer ] = useState<MarketplaceOfferData | undefined>(undefined);
    const [ detailsSerial, setDetailsSerial ] = useState(offersSerial);

    // `listUpdatedNotify` -> `hideDetails`.
    if (detailsSerial !== offersSerial) {
        setDetailsSerial(offersSerial);
        setDetailsOffer(undefined);
    }

    const doSearch = (next: SearchFields) => {
        const sortTypes = SORT_TYPES[next.category];
        const sortType = ((next.sortSelection >= 0) && (next.sortSelection < sortTypes.length)) ? sortTypes[next.sortSelection] : 1;
        const isAdvanced = (next.category === 'search_advanced');
        const minPrice = (!isAdvanced || (next.minPriceInput === '')) ? -1 : parseInt(next.minPriceInput, 10);
        const maxPrice = (!isAdvanced || (next.maxPriceInput === '')) ? -1 : parseInt(next.maxPriceInput, 10);

        setSearchSerial(store.getState().marketplaceOffersSerial);
        requestMarketplaceOffers(send, store, minPrice, maxPrice, isAdvanced ? next.searchInput : '', sortType, next.combineUniques);
    };

    // `init` -> `displayMainView`: the activity search, run once.
    useEffect(() => {
        requestMarketplaceOffers(send, store, -1, -1, '', SORT_TYPES.search_by_activity[0], true);
    }, [ send, store ]);

    const selectSearchCategory = (category: SearchCategory) => {
        const next: SearchFields = { ...fields, category, sortSelection: 0, searchInput: '', minPriceInput: '', maxPriceInput: '' };

        setFields(next);

        if (category !== 'search_advanced') doSearch(next);
    };

    const selectSort = (sortSelection: number) => {
        const next = { ...fields, sortSelection };

        setFields(next);

        if (next.category !== 'search_advanced') doSearch(next);
    };

    const toggleCombineUniques = () => {
        const next = { ...fields, combineUniques: !fields.combineUniques };

        setFields(next);
        doSearch(next);
    };

    const showDetails = (offer: MarketplaceOfferData) => {
        setDetailsOffer(offer);
        requestMarketplaceItemStats(send, store, offer);
    };

    // `updateStatusDisplay`.
    let statusText: string;

    if ((searchSerial === offersSerial) || (mountSerial === offersSerial) || !offers) {
        statusText = t('catalog.marketplace.searching');
    } else if (totalItemsFound > 0) {
        statusText = t('catalog.marketplace.items_found', '', { count: String(totalItemsFound) });

        if ((offers.length > 0) && (offers.length < totalItemsFound)) statusText += `. ${t('catalog.marketplace.items_shown', '', { count: String(offers.length) })}.`;
    } else {
        statusText = t('catalog.marketplace.no_items');
    }

    const sortTypes = SORT_TYPES[fields.category];
    const sortOptions = sortTypes.map((type, index) => ({
        key: type,
        label: t(`catalog.marketplace.sort.${type}`),
        selected: index === fields.sortSelection,
        onSelect: () => selectSort(index),
    }));

    const sortDropmenu = (left: number, top: number) => (
        <Dropmenu
            variant="3"
            caption={sortOptions[fields.sortSelection]?.label ?? ''}
            options={sortOptions}
            layout={{ position: 'absolute', left, width: 220, top, height: 24 }}
        />
    );

    const combineUniques = (
        <>
            <CheckBox
                variant="3"
                selected={fields.combineUniques}
                onPointerTap={toggleCombineUniques}
                layout={{ position: 'absolute', left: 10, width: 16, top: 92, height: 15 }}
            />
            <ThemeText
                text={t('catalog.marketplace.combine_uniques')}
                textStyle="u_regular"
                textOptions={{ fill: '#666666' }}
                verticalAlign="top"
                layout={{ position: 'absolute', left: 29, top: 91 }}
            />
        </>
    );

    const priceInput = (value: string, onChange: (value: string) => void) => (
        <TextInput
            value={value}
            onChange={value => onChange(value.slice(0, MAX_PRICE_STRING_LENGTH))}
            restrict="0-9"
            textStyle="u_regular"
            flashPlacement
            alwaysShowSelection
            backgroundColor={null}
            focusedBackgroundColor={null}
            layout={{ position: 'absolute', left: 6, width: 60, top: 3, height: 16 }}
        />
    );

    return (
        <Region layout={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0 }}>
            <Region
                visible={!detailsOffer}
                layout={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0 }}
            >
                <Region
                    name="search_selector"
                    layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 25 }}
                >
                    <ButtonGroupLeft
                        variant="100"
                        name="search_by_activity"
                        textStyle="il_button"
                        selected={fields.category === 'search_by_activity'}
                        onPointerTap={() => selectSearchCategory('search_by_activity')}
                        layout={{ position: 'absolute', left: 0, width: 107, top: 0, height: 25 }}
                    >
                        {t('catalog.marketplace.search_by_activity')}
                    </ButtonGroupLeft>
                    <ButtonGroupCenter
                        variant="100"
                        name="search_by_value"
                        textStyle="il_button"
                        selected={fields.category === 'search_by_value'}
                        onPointerTap={() => selectSearchCategory('search_by_value')}
                        layout={{ position: 'absolute', left: 107, width: 106, top: 0, height: 25 }}
                    >
                        {t('catalog.marketplace.search_by_value')}
                    </ButtonGroupCenter>
                    <ButtonGroupRight
                        variant="100"
                        name="search_advanced"
                        textStyle="il_button"
                        selected={fields.category === 'search_advanced'}
                        onPointerTap={() => selectSearchCategory('search_advanced')}
                        layout={{ position: 'absolute', left: 213, width: 107, top: 0, height: 25 }}
                    >
                        {t('catalog.marketplace.search_advanced')}
                    </ButtonGroupRight>
                </Region>
                <Border
                    variant="100"
                    name="search_container"
                    tintColor="#efefef"
                    layout={{ position: 'absolute', left: 0, width: 360, top: 30, height: 120 }}
                >
                    {(fields.category !== 'search_advanced') && (
                        <Region
                            name="marketplace_search_simple"
                            layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 120 }}
                        >
                            <Region layout={{ position: 'absolute', left: 0, width: 360, top: 23, flexDirection: 'row', justifyContent: 'center' }}>
                                <ThemeText
                                    text={t('catalog.marketplace.sort_order')}
                                    textStyle="u_regular"
                                    textOptions={{ fill: '#666666' }}
                                    verticalAlign="top"
                                />
                            </Region>
                            {sortDropmenu(70, 50)}
                            {combineUniques}
                        </Region>
                    )}
                    {(fields.category === 'search_advanced') && (
                        <Region
                            name="marketplace_search_advanced"
                            layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 120 }}
                        >
                            <Region
                                name="text_search_container"
                                layout={{ position: 'absolute', left: 10, width: 340, top: 10, height: 20 }}
                            >
                                <ThemeText
                                    text={t('catalog.marketplace.search_name')}
                                    textStyle="u_regular"
                                    textOptions={{ fill: '#666666' }}
                                    verticalAlign="top"
                                    layout={{ position: 'absolute', left: 0, top: 3 }}
                                />
                                <Border
                                    variant="0"
                                    layout={{ position: 'absolute', left: 120, width: 220, top: 0, height: 20 }}
                                >
                                    <TextInput
                                        value={fields.searchInput}
                                        onChange={value => setFields({ ...fields, searchInput: value.slice(0, MAX_SEARCH_STRING_LENGTH) })}
                                        textStyle="u_regular"
                                        flashPlacement
                                        alwaysShowSelection
                                        backgroundColor={null}
                                        focusedBackgroundColor={null}
                                        layout={{ position: 'absolute', left: 6, width: 210, top: 2, height: 16 }}
                                    />
                                </Border>
                            </Region>
                            <Region
                                name="price_container"
                                layout={{ position: 'absolute', left: 10, width: 340, top: 35, height: 20 }}
                            >
                                <ThemeText
                                    text={t('catalog.marketplace.search_price')}
                                    textStyle="u_regular"
                                    textOptions={{ fill: '#666666' }}
                                    verticalAlign="top"
                                    layout={{ position: 'absolute', left: 0, top: 3 }}
                                />
                                <Border
                                    variant="0"
                                    layout={{ position: 'absolute', left: 120, width: 70, top: 0, height: 20 }}
                                >
                                    {priceInput(fields.minPriceInput, value => setFields({ ...fields, minPriceInput: value }))}
                                </Border>
                                <Border
                                    variant="0"
                                    layout={{ position: 'absolute', left: 270, width: 70, top: 0, height: 20 }}
                                >
                                    {priceInput(fields.maxPriceInput, value => setFields({ ...fields, maxPriceInput: value }))}
                                </Border>
                            </Region>
                            <Region
                                name="sort_container"
                                layout={{ position: 'absolute', left: 10, width: 340, top: 60, height: 24 }}
                            >
                                <ThemeText
                                    text={t('catalog.marketplace.sort_order')}
                                    textStyle="u_regular"
                                    textOptions={{ fill: '#666666' }}
                                    verticalAlign="top"
                                    layout={{ position: 'absolute', left: 0, top: 3 }}
                                />
                                {sortDropmenu(120, 0)}
                            </Region>
                            {combineUniques}
                            <Button
                                variant="3"
                                name="search_button"
                                onPointerTap={() => doSearch(fields)}
                                layout={{ position: 'absolute', left: 250, width: 100, top: 90, height: 22 }}
                            >
                                {t('generic.search')}
                            </Button>
                        </Region>
                    )}
                </Border>
                <ThemeText
                    name="status_text"
                    text={statusText}
                    textStyle="u_small"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 2, top: 155 }}
                />
                <ScrollArea
                    orientation="vertical"
                    variant="3"
                    scrollResetKey={offersSerial}
                    layout={{ position: 'absolute', left: 0, width: 360, top: 170, bottom: 13 }}
                    contentLayout={{ position: 'relative', width: '100%', flexDirection: 'column', gap: 1 }}
                >
                    {(mountSerial !== offersSerial) && offers?.map(offer => (
                        <OfferItem
                            key={offer.offerId}
                            offer={offer}
                            safetyLocked={safetyLocked}
                            onBuy={item => buyMarketplaceOffer(store, item.offerId)}
                            onMore={showDetails}
                        />
                    ))}
                </ScrollArea>
            </Region>
            {detailsOffer && (
                <CatalogMarketplaceOfferDetailsView
                    key={detailsOffer.offerId}
                    offer={detailsOffer}
                    safetyLocked={safetyLocked}
                    onBack={() => setDetailsOffer(undefined)}
                    onBuy={() => buyMarketplaceOffer(store, detailsOffer.offerId)}
                />
            )}
        </Region>
    );
};
