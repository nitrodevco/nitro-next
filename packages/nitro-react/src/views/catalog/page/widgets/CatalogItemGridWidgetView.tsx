import { CatalogPricingModelEnum, CatalogTypeEnum, FurnitureTypeEnum, IPurchasableOffer } from '@nitrodevco/nitro-api';
import { GetProductOfferComposer } from '@nitrodevco/nitro-packets';
import { useEffect, useRef, useState } from 'react';

import { requestSelectedItemToMover } from '#base/commands';
import { CATALOG_NO_GUILD_SELECTED, CatalogPage, CatalogWidgetEventEnum, useCatalogStoreApi } from '#base/context/catalog';
import { useWebSocketContext } from '#base/context/communication';
import { useUserStore } from '#base/context/user';
import { useCatalogWidgetEvent } from '#base/hooks';
import { Border, Box, InfiniteGrid, Region } from '#base/theme';
import { getOfferProduct } from '#base/utils';

import { CatalogWidgetProps } from '../CatalogPageRegistry';
import { CatalogItemGridWidgetItemView } from './CatalogItemGridWidgetItemView';

/** `ItemGridCatalogWidget.select`: `border_outline`'s colour, 6538729 in the normal catalogue and 16758076 in the builders club. */
const HILIGHT_COLOR_NORMAL = '#63c5e9';
const HILIGHT_COLOR_BUILDERS_CLUB = '#ffb63c';

/** The colour art `select` hands the colour grid (`CatalogWidgetColoursEvent`). */
const COLOUR_BACKGROUND_ASSET = 'ctlg_clr_27x22_1';
const COLOUR_ASSET = 'ctlg_clr_27x22_2';
const COLOUR_CHOSEN_ASSET = 'ctlg_clr_27x22_3';

/** `0xFFFFFF`, the colour `populateItemGrid` starts from and skips, and the `bc_` placeholder it prefers. */
const COLOUR_WHITE = 0xFFFFFF;
const COLOUR_BC_WHITE = 0xFFFFFE;

/** `Product.isColorable`: the furni's full name has a `*<colour>` part. */
const isColorable = (offer: IPurchasableOffer) => ((getOfferProduct(offer)?.furnitureData?.fullName ?? '').indexOf('*') !== -1);

/** The furni name before `*` - the family a colourable offer groups under. */
const colourFamily = (offer: IPurchasableOffer) => (getOfferProduct(offer)?.furnitureData?.fullName ?? '').split('*')[0];

/** What `populateItemGrid` works out: the offers the grid shows, and each colour family's colours by their `*<n>` number. */
interface ItemGridContent {
    gridOffers: IPurchasableOffer[];
    itemColors: Record<string, Record<number, number>>;
}

/**
 * `populateItemGrid`. Every offer gets an item, except on a `default_3x3_color_grouping` page: there
 * a colourable offer's family shows one item - its first offer, or for a `bc_` family the offer in
 * white - and the family's colours (each offer's last colour that is not white, by the number
 * after `*`) go to the colour grid when it is selected.
 */
const populateItemGrid = (page: CatalogPage): ItemGridContent => {
    const itemColors: Record<string, Record<number, number>> = {};

    if (page.layoutCode !== 'default_3x3_color_grouping') return { gridOffers: [ ...page.offers ], itemColors };

    const shown: IPurchasableOffer[] = [];
    const familyIndex: Record<string, number> = {};

    for (const offer of page.offers) {
        const furnitureData = getOfferProduct(offer)?.furnitureData;

        if (!furnitureData || !isColorable(offer)) {
            shown.push(offer);

            continue;
        }

        const [ family, number ] = furnitureData.fullName.split('*');
        const colours = (itemColors[family] ??= {});

        let colour = COLOUR_WHITE;

        if (furnitureData.colors) {
            for (const value of furnitureData.colors) {
                if (value !== COLOUR_WHITE) colour = value;
            }

            if (!Object.values(colours).includes(colour)) colours[parseInt(number)] = colour;
        }

        if (familyIndex[family] === undefined) {
            familyIndex[family] = shown.length;
            shown.push(offer);
        } else if ((family.indexOf('bc_') === 0) && ((colour === COLOUR_WHITE) || (colour === COLOUR_BC_WHITE))) {
            shown[familyIndex[family]] = offer;
        }
    }

    return { gridOffers: page.offers.filter(offer => shown.includes(offer)), itemColors };
};

/** `getCurrentItemColors`: the selected offer's family colours in `*<n>` order, none for an offer that is not colourable. */
const getCurrentItemColors = (offer: IPurchasableOffer | undefined, itemColors: Record<string, Record<number, number>>): number[] => {
    if (!offer || !isColorable(offer)) return [];

    const colours = itemColors[colourFamily(offer)] ?? {};

    return Object.keys(colours).map(Number).sort((a, b) => (a - b)).map(key => colours[key]);
};

/** `getCurrentItemColourIndex`: the selected offer's colour index less one. */
const getCurrentItemColourIndex = (offer: IPurchasableOffer | undefined): number => {
    if (!offer || !isColorable(offer)) return 0;

    return Math.max((getOfferProduct(offer)?.furnitureData?.colorIndex ?? 0) - 1, 0);
};

/**
 * The page's offer grid, `itemGridWidget.xml` - Flash's `ItemGridCatalogWidget`: a half-blended
 * style 6 border with the `itemGrid` `scrollable_itemgrid_vertical` (style 3) 4px inside it, its
 * items 3px apart side by side and flush top to bottom (`init` sets `verticalSpacing` to 0). The
 * grid is the theme's virtualised `InfiniteGrid` in its `itemGrid` mode (`ItemGridController`).
 *
 * `select` is the widget's heart, and the page reaches it too (`CatalogPage.selectOffer`, which
 * the grid registers for): the old item deactivates, the new one shows its highlight, and a lazy
 * item - a search hit - asks the server for its offer (`FurniProductContainer.activate`), whose
 * answer `HabboCatalog.onProductOffer` dispatches. Any other item dispatches `SelectProductEvent`,
 * a wall item's `SetExtraPurchaseParameterEvent`, and - when asked - the item's colours
 * (`CatalogWidgetColoursEvent` with the `ctlg_clr_27x22_*` art and the colour index).
 *
 * The rest of the class:
 * - `populateItemGrid`: the colour grouping of `default_3x3_color_grouping` (see above), and the
 *   bundle offers numbered in page order (`setBundleCounter`).
 * - `onColourIndex`: the colour grid's pick moves the selected item to the offer of that colour
 *   (`<family>*<index + 1>`) and selects it without telling the colour grid again.
 * - `onGuildSelected`: every item is rebuilt with the guild's `StringArrayStuffData` for its icon
 *   (`loadGraphics`), so the guild furni show the guild's colours.
 * - `createGridItem`: the template follows the price (see `CatalogItemGridWidgetItemView`), and
 *   the builders club always takes the bare `gridItem`.
 *
 * Flash's grid is a row of item lists, each as wide as its widest item, so a page that mixes a
 * free offer (the bare 36x36 `gridItem`) with priced ones (53x74) stacks the free one short in its
 * column. The virtualised grid has one cell size, so every cell here takes the priced size when
 * the page has a priced offer - a free offer on such a page sits at its cell's top left, where a
 * column of Flash's would pull the items under it up by 38px.
 *
 * `startDragAndDrop` / `onDragAndDropDone`: a press that leaves an item hands its offer to the
 * catalogue's object mover (`requestSelectedItemToMover`) when the user's club level allows the
 * offer, and a drop in the room buys it (`CatalogWidgetInitPurchaseEvent`).
 */
export const CatalogItemGridWidgetView = ({ page }: CatalogWidgetProps) => {
    const [ content, setContent ] = useState<ItemGridContent>(() => populateItemGrid(page));
    const [ selectedOffer, setSelectedOffer ] = useState<IPurchasableOffer | undefined>(undefined);
    const [ guildStuffData, setGuildStuffData ] = useState<readonly string[] | undefined>(undefined);
    const clubLevel = useUserStore(x => x.clubLevel);
    const store = useCatalogStoreApi();
    const { send } = useWebSocketContext();

    /**
     * `startDragAndDrop`: an offer the user's club level allows goes to the object mover with the
     * grid as its receiver, and a drop in the room starts its purchase (`onDragAndDropDone`).
     */
    const startDragAndDrop = (offer: IPurchasableOffer) => {
        if (Number(clubLevel) < offer.clubLevel) return;

        requestSelectedItemToMover(store, {
            onDragAndDropDone: (placed, userName) => {
                if (placed) page.events.dispatchEvent({ type: CatalogWidgetEventEnum.INIT_PURCHASE, enableBuyAsGift: false, userName });
            },
        }, offer);
    };

    const select = (offer: IPurchasableOffer, notifyColours: boolean) => {
        setSelectedOffer(offer);

        const product = getOfferProduct(offer);

        if (offer.isLazy) {
            if (product?.furnitureData) send(new GetProductOfferComposer({ offerId: product.furnitureData.rentOfferId > -1 ? product.furnitureData.rentOfferId : product.furnitureData.purchaseOfferId }));

            return;
        }

        page.events.dispatchEvent({ type: CatalogWidgetEventEnum.SELECT_PRODUCT, offer });

        if (product && (product.productType === FurnitureTypeEnum.Wall)) page.events.dispatchEvent({ type: CatalogWidgetEventEnum.SET_EXTRA_PARAMETER, parameter: product.extraParam });

        if (notifyColours) page.events.dispatchEvent({ type: CatalogWidgetEventEnum.COLOUR_ARRAY, colours: getCurrentItemColors(offer, content.itemColors), backgroundAssetName: COLOUR_BACKGROUND_ASSET, colourAssetName: COLOUR_ASSET, chosenColourAssetName: COLOUR_CHOSEN_ASSET, index: getCurrentItemColourIndex(offer) });
    };

    const selectRef = useRef(select);

    useEffect(() => {
        selectRef.current = select;
    });

    useEffect(() => page.registerItemGrid({ select: (offer, notifyColours) => selectRef.current(offer, notifyColours) }), [ page ]);

    useCatalogWidgetEvent(page, CatalogWidgetEventEnum.GUILD_SELECTED, (event) => {
        setGuildStuffData((event.guildId === CATALOG_NO_GUILD_SELECTED) ? undefined : [ '0', event.guildId.toString(), event.badgeCode, event.color1, event.color2 ]);
    });

    useCatalogWidgetEvent(page, CatalogWidgetEventEnum.COLOUR_INDEX, (event) => {
        if (!selectedOffer || !content.gridOffers.includes(selectedOffer) || !isColorable(selectedOffer)) return;

        const fullName = `${colourFamily(selectedOffer)}*${event.index + 1}`;
        // Flash moves the item to every offer of that name in turn, selecting each; the last one stays.
        const matches = page.offers.filter(offer => (getOfferProduct(offer)?.furnitureData?.fullName === fullName));

        if (!matches.length) return;

        setContent({ ...content, gridOffers: content.gridOffers.map(offer => ((offer === selectedOffer) ? matches[matches.length - 1] : offer)) });

        for (const match of matches) select(match, false);
    });

    const bundleCounters = new Map<IPurchasableOffer, number>();

    for (const offer of page.offers) {
        if (Number(offer.pricingModel) === Number(CatalogPricingModelEnum.Bundle)) bundleCounters.set(offer, bundleCounters.size + 1);
    }

    const hasPricedOffer = !page.isBuilderPage && content.gridOffers.some(offer => (offer.priceInCredits > 0) || (offer.priceInActivityPoints > 0) || (offer.priceInSilver > 0));
    const hilightColor = (page.catalogType === CatalogTypeEnum.Normal) ? HILIGHT_COLOR_NORMAL : HILIGHT_COLOR_BUILDERS_CLUB;

    return (
        <Region layout={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0 }}>
            <Border
                variant="6"
                blend={0.5}
                layout={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0 }}
            />
            <Box layout={{ position: 'absolute', left: 4, top: 4, right: 4, bottom: 4, flexDirection: 'column' }}>
                <InfiniteGrid
                    items={content.gridOffers}
                    itemGrid={hasPricedOffer ? { width: 53, height: 74, spacing: 3, verticalSpacing: 0 } : { width: 36, height: 36, spacing: 3, verticalSpacing: 0 }}
                    scrollResetKey={page}
                    getKey={offer => offer.offerId}
                    itemRender={offer => (
                        <CatalogItemGridWidgetItemView
                            offer={offer}
                            isActive={offer === selectedOffer}
                            hilightColor={hilightColor}
                            isBuilderPage={page.isBuilderPage}
                            bundleCounter={bundleCounters.get(offer)}
                            guildStuffData={guildStuffData}
                            onSelect={offer => select(offer, true)}
                            onDragOut={startDragAndDrop}
                        />
                    )}
                />
            </Box>
        </Region>
    );
};
