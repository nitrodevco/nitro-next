import { TemplateBindings, TemplateElement, TemplateItem, TemplateWindows } from '@nitrodevco/nitro-theme';
import { useEffect, useState } from 'react';

import { buyMarketplaceOffer, requestMarketplaceItemStats, requestMarketplaceOffers } from '#base/commands';
import { useCatalogStore, useCatalogStoreApi } from '#base/context/catalog';
import { useWebSocketContext } from '#base/context/communication';
import { useSystemStore, useTranslation } from '#base/context/system';
import { useAccountSafetyLocked } from '#base/context/user';
import { findTemplateChild, useTemplateLibrary } from '#base/theme';
import { getMarketplaceOfferTexts, MarketplaceOfferData } from '#base/utils';
import { CatalogMarketplaceOfferDetailsView } from '#base/views/catalog/marketplace/CatalogMarketplaceOfferDetailsView';
import { marketplaceOfferImageBindings } from '#base/views/catalog/marketplace/marketplaceOfferImage';

import { CatalogWidgetProps } from '../CatalogPageRegistry';
import { CATALOG_LIBRARY, catalogTemplateId } from '../catalogTemplates';
import { useCatalogWidgetView } from '../catalogWidgetView';

/** `MAX_SEARCH_STRING_LENGTH` / `MAX_PRICE_STRING_LENGTH`: the inputs are cut at these on every change. */
const MAX_SEARCH_STRING_LENGTH = 40;
const MAX_PRICE_STRING_LENGTH = 10;

/** `USABLE_USED_TEXT_COLOR` / `USABLE_UNUSED_TEXT_COLOR`, as text colours. */
const USABLE_USED_TEXT_COLOR = 0xCC0000;
const USABLE_UNUSED_TEXT_COLOR = 0x1E9B39;

/** `search_selector`'s three buttons and the sort types `selectSearchCategory` gives each. */
type SearchCategory = 'search_by_activity' | 'search_by_value' | 'search_advanced';

const SEARCH_CATEGORIES: readonly SearchCategory[] = [ 'search_by_activity', 'search_by_value', 'search_advanced' ];

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

type Translate = (key: string, defaultValue?: string, replacements?: Record<string, string>) => string;

/**
 * `addListItem`: one clone of the `offer_item` prototype `init` took out of `offer_list` - the name,
 * the (layout-hidden) description, the price and average, the offer count, the usage state of a
 * usable offer (red when used, green when not), the icon and its overlays, and buy disabled while
 * the account is safety locked.
 */
const offerItem = (from: string | TemplateElement, offer: MarketplaceOfferData, safetyLocked: boolean, t: Translate, wallItems: Parameters<typeof getMarketplaceOfferTexts>[1], onBuy: () => void, onMore: () => void): TemplateItem => {
    const { name, description } = getMarketplaceOfferTexts(offer, wallItems, t);

    return {
        key: String(offer.offerId),
        from,
        bindings: {
            item_name: { caption: name },
            item_desc: { caption: description },
            item_price: { caption: t('catalog.marketplace.offer.price_public_item', '', { price: String(offer.price), average: (offer.averagePrice !== 0) ? String(offer.averagePrice) : ' - ' }) },
            offer_count: { caption: t('catalog.marketplace.offer_count', '', { count: String(offer.offerCount) }) },
            item_usage_state: offer.isUsable
                ? { visible: true, caption: t(offer.isUsed ? 'catalog.marketplace.offer.used' : 'catalog.marketplace.offer.unused'), color: offer.isUsed ? USABLE_USED_TEXT_COLOR : USABLE_UNUSED_TEXT_COLOR }
                : { visible: false, caption: '' },
            ...marketplaceOfferImageBindings(offer, true),
            buy_button: { disabled: safetyLocked, onPointerTap: onBuy },
            more_button: { onPointerTap: onMore },
        },
    };
};

/**
 * `marketPlaceWidget` - Flash's `MarketPlaceCatalogWidget`. `displayMainView` attaches the
 * `marketPlaceWidget` view, which in `layout_marketplace` (an `EMBEDDED` container) is the layout's
 * own children: the `search_selector`, the `search_container` border, the `status_text` and the
 * `offer_list`.
 *
 * - `init` / `displayMainView`: the activity search is selected and run.
 * - `selectSearchCategory` empties the search container and builds `marketplace_search_simple` or
 *   `marketplace_search_advanced` into it (`selectSearchCategory2` sizing the container to it - see
 *   `arrange`): its inputs start empty, the `sort_dropmenu` lists
 *   `catalog.marketplace.sort.<type>` for the category's sort types with the first selected, and the
 *   `combine_uniques_checkbox` keeps its state. That selection is a `WE_SELECTED`, which searches in
 *   the two simple categories; the advanced one waits for its search button. (Flash's rebuilt
 *   checkbox also fires a `WE_SELECTED` of its own before the dropmenu is populated, which sends one
 *   search more with the default sort type ahead of this one; the port sends only the one whose
 *   answer is shown.)
 * - `doSearch`: the price inputs (empty is -1), the text, the selected sort type (1 when none) and
 *   the combine checkbox go to `MarketPlaceLogic.requestOffers`; the status says "searching" until
 *   the next list arrives. The search button does nothing while the text is the
 *   `catalog.marketplace.search_name` label.
 * - A list arriving (`listUpdatedNotify`) closes the details view and fills the list
 *   (`addListItem`): the status gives the hit count, and how many are shown when fewer than all.
 *   Flash adds the rows five at a time on a 25ms timer; here they are all there at once.
 * - `buy` goes to `MarketPlaceLogic.buyOffer`; `view more` (`showDetails`) hides the main view and
 *   adds `marketplace_offer_details` to the container (`CatalogMarketplaceOfferDetailsView`), and
 *   asks for the offer's stats; its `back` (`hideDetails`) shows the main view again.
 */
export const CatalogMarketPlaceWidgetView = ({ tags }: CatalogWidgetProps) => {
    const store = useCatalogStoreApi();
    const { send } = useWebSocketContext();
    const t = useTranslation();
    const templates = useTemplateLibrary(CATALOG_LIBRARY);
    const wallItems = useSystemStore(x => x.wallItems);
    const offers = useCatalogStore(x => x.marketplaceOffers);
    const totalItemsFound = useCatalogStore(x => x.marketplaceTotalItemsFound);
    const offersSerial = useCatalogStore(x => x.marketplaceOffersSerial);
    const safetyLocked = useAccountSafetyLocked();
    const [ fields, setFields ] = useState<SearchFields>({ category: 'search_by_activity', sortSelection: 0, combineUniques: true, searchInput: '', minPriceInput: '', maxPriceInput: '' });
    // Bumped by each `selectSearchCategory`, which builds the search window anew.
    const [ searchBuild, setSearchBuild ] = useState(0);
    // The list serial the last search was sent at: "searching" until a newer list arrives.
    const [ searchSerial, setSearchSerial ] = useState(offersSerial);
    // The list the widget was built on: its rows only fill once a list arrives after that (`init` removes the template).
    const [ mountSerial ] = useState(offersSerial);
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

        setSearchSerial(requestMarketplaceOffers(send, store, minPrice, maxPrice, isAdvanced ? next.searchInput : '', sortType, next.combineUniques));
    };

    // `init` -> `displayMainView`: the activity search, run once.
    useEffect(() => {
        requestMarketplaceOffers(send, store, -1, -1, '', SORT_TYPES.search_by_activity[0], true);
    }, [ send, store ]);

    const selectSearchCategory = (category: SearchCategory) => {
        const next: SearchFields = { ...fields, category, sortSelection: 0, searchInput: '', minPriceInput: '', maxPriceInput: '' };

        setFields(next);
        setSearchBuild(searchBuild + 1);

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

    const searchButton = () => {
        if (fields.searchInput === t('catalog.marketplace.search_name')) return;

        doSearch(fields);
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

    const isAdvanced = (fields.category === 'search_advanced');
    const searchTemplate = templates?.[catalogTemplateId(isAdvanced ? 'marketplace_search_advanced' : 'marketplace_search_simple')];
    // The `offer_item` prototype: the layout's own in an embedded container, the attached view's otherwise.
    const offerItemFrom = tags.includes('EMBEDDED') ? 'offer_item' : (templates && findTemplateChild(templates[catalogTemplateId('marketPlaceWidget')]?.elements ?? [], 'offer_item'));

    // The search window `selectSearchCategory` builds, as its fields are.
    const searchBindings: TemplateBindings = {
        sort_dropmenu: { options: SORT_TYPES[fields.category].map(type => `\${catalog.marketplace.sort.${type}}`), selection: fields.sortSelection, onSelect: selectSort },
        combine_uniques_checkbox: { selected: fields.combineUniques, onPointerTap: toggleCombineUniques },
    };

    if (isAdvanced) {
        searchBindings.search_input = { caption: fields.searchInput, onChange: value => setFields({ ...fields, searchInput: value.slice(0, MAX_SEARCH_STRING_LENGTH) }) };
        searchBindings.min_price_input = { caption: fields.minPriceInput, restrict: '0-9', onChange: value => setFields({ ...fields, minPriceInput: value.slice(0, MAX_PRICE_STRING_LENGTH) }) };
        searchBindings.max_price_input = { caption: fields.maxPriceInput, restrict: '0-9', onChange: value => setFields({ ...fields, maxPriceInput: value.slice(0, MAX_PRICE_STRING_LENGTH) }) };
        searchBindings.search_button = { onPointerTap: searchButton };
    }

    const mainVisible = !detailsOffer;
    const bindings: TemplateBindings = {
        // `_window.getChildAt(0).visible`: the main view's parts, hidden under the details.
        search_selector: { visible: mainVisible },
        search_container: {
            visible: mainVisible,
            items: searchTemplate ? [ { key: `${fields.category}:${searchBuild}`, from: searchTemplate, bindings: searchBindings } ] : [],
        },
        status_text: { visible: mainVisible, caption: statusText },
        offer_list: {
            visible: mainVisible,
            items: (offerItemFrom && (mountSerial !== offersSerial) && offers)
                ? offers.map(offer => offerItem(offerItemFrom, offer, safetyLocked, t, wallItems, () => buyMarketplaceOffer(store, offer.offerId), () => showDetails(offer)))
                : [],
        },
        // `showDetails`: `marketplace_offer_details` added to the container.
        '': {
            children: detailsOffer && (
                <CatalogMarketplaceOfferDetailsView
                    key={detailsOffer.offerId}
                    offer={detailsOffer}
                    safetyLocked={safetyLocked}
                    onBack={() => setDetailsOffer(undefined)}
                    onBuy={() => buyMarketplaceOffer(store, detailsOffer.offerId)}
                />
            ),
        },
    };

    for (const category of SEARCH_CATEGORIES) bindings[category] = { selected: fields.category === category, onPointerTap: () => selectSearchCategory(category) };

    /**
     * `selectSearchCategory2`, in the build whose advanced search adds the `offer_source_container`
     * row and is 150 tall: the search container grows to the search built into it, the status text
     * and offer list move down by as much and the list is shortened by it - 150 / 185 / 200 / 395
     * there, and the layout's 120 / 155 / 170 / 425 for a 120-tall search (the simple one, and the
     * AS3 build's advanced one), which fits as it is.
     */
    const arrange = ({ find }: TemplateWindows) => {
        const container = find('search_container');
        const grow = (container && searchTemplate) ? (searchTemplate.height - container.height) : 0;

        if (!container || (grow <= 0)) return;

        container.setHeight(container.height + grow);
        find('status_text')?.offset(0, grow);

        const list = find('offer_list');

        list?.setRectangle(list.x, list.y + grow, list.width, list.height - grow);
    };

    useCatalogWidgetView(templates && { template: 'marketPlaceWidget', bindings, arrange });

    return null;
};
