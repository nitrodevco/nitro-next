import { CatalogPricingModelEnum, CatalogTypeEnum, FurnitureTypeEnum, IPurchasableOffer } from '@nitrodevco/nitro-api';
import { useEffect, useState } from 'react';

import { CatalogWidgetEventEnum } from '#base/context/catalog';
import { useTranslation } from '#base/context/system';
import { useCatalogWidgetEvent } from '#base/hooks';
import { Border, ButtonGroupCenter, ButtonGroupLeft, ButtonGroupRight, InfiniteGrid, Region } from '#base/theme';
import { getOfferProduct } from '#base/utils';

import { CatalogWidgetProps } from '../CatalogPageRegistry';
import { CatalogItemGridWidgetItemView } from './CatalogItemGridWidgetItemView';

/** `_groupNames`: the furniture class of each group's offers, in group order. */
const GROUP_CLASS_NAMES: readonly string[] = [ 'wallpaper', 'floor', 'landscape' ];
/** `_categories`: the `groups` selector's buttons, one per group. */
const GROUP_BUTTONS: readonly string[] = [ 'group.walls', 'group.floors', 'group.views' ];
/** Each button's caption key in `layout_spaces_new`. */
const GROUP_CAPTIONS: readonly string[] = [ 'catalog.spaces.tab.walls', 'catalog.spaces.tab.floors', 'catalog.spaces.tab.views' ];
/** `updateRoomPreview`'s tile size. */
const ROOM_PREVIEW_TILE_SIZE = 64;
/** `ItemGridCatalogWidget.select`: `border_outline`'s colour, 6538729 in the normal catalogue and 16758076 in the builders club. */
const HILIGHT_COLOR_NORMAL = '#63c5e9';
const HILIGHT_COLOR_BUILDERS_CLUB = '#ffb63c';

/**
 * `createOfferGroups`: the page's single and multi offers of a wall item or floor item whose
 * furniture class is `wallpaper`, `floor` or `landscape`, by group, in page order. Any other class
 * is logged and left out, as in Flash.
 */
const createOfferGroups = (offers: IPurchasableOffer[]): IPurchasableOffer[][] => {
    const groups: IPurchasableOffer[][] = GROUP_CLASS_NAMES.map(() => []);

    for (const offer of offers) {
        if ((offer.pricingModel !== CatalogPricingModelEnum.Single) && (offer.pricingModel !== CatalogPricingModelEnum.Multi)) continue;

        const product = getOfferProduct(offer);

        if (!product || !product.furnitureData) continue;
        if ((product.productType !== FurnitureTypeEnum.Wall) && (product.productType !== FurnitureTypeEnum.Floor)) continue;

        const group = GROUP_CLASS_NAMES.indexOf(product.furnitureData.className);

        if (group >= 0) groups[group].push(offer);
    }

    return groups;
};

/**
 * The spaces page's floor, wallpaper and landscape picker, Flash's `SpacesNewCatalogWidget` (an
 * `ItemGridCatalogWidget`) - drawn from `layout_spaces_new`'s `EMBEDDED,FIXED` container: the
 * `groups` selector (style 100) with its three button group segments, the half-blended style 6
 * border under it and the `itemGrid` (`scrollable_itemgrid_vertical` style 3, 356x151, items 2px
 * apart side by side and flush top to bottom) inside that.
 *
 * `createOfferGroups` sorts the page's offers into walls, floors and views; the selector shows one
 * group in the grid (`switchCategory`), and each group remembers which of its offers was picked.
 * Selecting an offer (`select`) is the item grid's - `SelectProductEvent`, and a wall item's
 * `SetExtraPurchaseParameterEvent` - followed by the spaces widget's own extra parameter (the
 * offer's again) and `updateRoomPreview`: once every group has an offer, the room preview widget
 * gets the three picks' types (`CatalogWidgetUpdateRoomPreviewEvent`, tile size 64). `init`
 * switches to the walls and selects their remembered offer, then updates the preview again;
 * `WIDGETS_INITIALIZED` selects the current group's offer once more, now that every widget hears
 * it.
 *
 * The segments are placed where the layout puts them (0, 50 and 100): `ButtonController` sets its
 * width to 0 when its caption resizes and `expand_to_accommodate_children` grows it back to the
 * caption with the `illumina_light_button_plain` margins, 50 at the least. The selected one is
 * drawn on top of the others, as `SelectorController.setSelected` moves it to the end.
 *
 * Flash also empties the page's offers (`page.replaceOffers`) and fills them with the shown group,
 * which only the page's item grid would read - this page has none, so the port keeps the page's
 * offers and the widget its groups. Its offers are single and multi offers bought
 * for no guild, so no grid item carries a bundle counter or guild colours. Dragging an offer out of
 * the grid into the room (`startDragAndDrop`, from a press that leaves a `ProductGridItem`) is the
 * grid item's to start, and the shared `CatalogItemGridWidgetItemView` selects on a tap only; the
 * room preview above starts the same drag from its own picture.
 */
export const CatalogSpacesNewWidgetView = ({ page }: CatalogWidgetProps) => {
    const [ groups ] = useState(() => createOfferGroups(page.offers));
    const [ selectedGroup, setSelectedGroup ] = useState(0);
    const [ selectedIndices, setSelectedIndices ] = useState<readonly number[]>([ 0, 0, 0 ]);
    // `init()` shows the walls with their first offer picked, so the first render already does.
    const [ selectedOfferId, setSelectedOfferId ] = useState(() => groups[0][0]?.offerId ?? -1);
    const hilightColor = (page.catalogType === CatalogTypeEnum.Normal) ? HILIGHT_COLOR_NORMAL : HILIGHT_COLOR_BUILDERS_CLUB;
    const t = useTranslation();

    /** `updateRoomPreview`: the three remembered picks, once each group has one. */
    const updateRoomPreview = (indices: readonly number[]) => {
        const wallpaper = groups[0][indices[0]];
        const floor = groups[1][indices[1]];
        const landscape = groups[2][indices[2]];

        if (!floor || !wallpaper || !landscape) return;

        page.events.dispatchEvent({
            type: CatalogWidgetEventEnum.UPDATE_ROOM_PREVIEW,
            floorType: getOfferProduct(floor)?.extraParam ?? '',
            wallType: getOfferProduct(wallpaper)?.extraParam ?? '',
            landscapeType: getOfferProduct(landscape)?.extraParam ?? '',
            tileSize: ROOM_PREVIEW_TILE_SIZE,
        });
    };

    /**
     * What `select(gridItem, false)` tells the page: the item grid's `SelectProductEvent` (and a
     * wall item's extra parameter), the spaces widget's own extra parameter, and the preview with
     * the group's new pick. Answers the new picks.
     */
    const dispatchSelection = (group: number, offer: IPurchasableOffer, indices: readonly number[]): readonly number[] => {
        const product = getOfferProduct(offer);

        page.events.dispatchEvent({ type: CatalogWidgetEventEnum.SELECT_PRODUCT, offer });

        if (product && (product.productType === FurnitureTypeEnum.Wall)) page.events.dispatchEvent({ type: CatalogWidgetEventEnum.SET_EXTRA_PARAMETER, parameter: product.extraParam });

        page.events.dispatchEvent({ type: CatalogWidgetEventEnum.SET_EXTRA_PARAMETER, parameter: product?.extraParam ?? '' });

        const next = indices.map((index, at) => ((at === group) ? groups[group].indexOf(offer) : index));

        updateRoomPreview(next);

        return next;
    };

    /** `select(gridItem, false)`: the item's highlight and the group's remembered pick, then what the page hears. */
    const select = (group: number, offer: IPurchasableOffer, indices: readonly number[]) => {
        setSelectedOfferId(offer.offerId);
        setSelectedIndices(dispatchSelection(group, offer, indices));
    };

    /** `switchCategory`: show a group and select its remembered offer (`selectIndex`). */
    const switchCategory = (group: number) => {
        setSelectedGroup(group);

        const offer = groups[group][selectedIndices[group]];

        if (offer) select(group, offer, selectedIndices);
    };

    useCatalogWidgetEvent(page, CatalogWidgetEventEnum.WIDGETS_INITIALIZED, () => {
        const offer = groups[selectedGroup][selectedIndices[selectedGroup]];

        if (offer) select(selectedGroup, offer, selectedIndices);
    });

    // `init()`, after the listener above: `switchCategory` to the walls, which selects their first
    // offer (the state starts there), then `updateRoomPreview` once more.
    useEffect(() => {
        const offer = groups[0][0];

        updateRoomPreview(offer ? dispatchSelection(0, offer, [ 0, 0, 0 ]) : [ 0, 0, 0 ]);
    }, []);

    const offers = groups[selectedGroup];
    const hasPricedOffer = !page.isBuilderPage && offers.some(offer => (offer.priceInCredits > 0) || (offer.priceInActivityPoints > 0) || (offer.priceInSilver > 0));

    const renderButton = (group: number) => {
        const props = {
            variant: '100',
            name: GROUP_BUTTONS[group],
            selected: (group === selectedGroup),
            onPointerTap: () => switchCategory(group),
            layout: { position: 'absolute', left: (group * 50), top: 0, height: 21, minWidth: 50, minHeight: 21 },
        } as const;
        const caption = t(GROUP_CAPTIONS[group]);

        switch (group) {
            case 0: return (
                <ButtonGroupLeft
                    key={group}
                    {...props}
                >
                    {caption}
                </ButtonGroupLeft>
            );
            case 1: return (
                <ButtonGroupCenter
                    key={group}
                    {...props}
                >
                    {caption}
                </ButtonGroupCenter>
            );
            default: return (
                <ButtonGroupRight
                    key={group}
                    {...props}
                >
                    {caption}
                </ButtonGroupRight>
            );
        }
    };

    return (
        <Region layout={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0 }}>
            <Region
                name="groups"
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 22 }}
            >
                {[ 0, 1, 2 ].filter(group => (group !== selectedGroup)).map(renderButton)}
                {renderButton(selectedGroup)}
            </Region>
            <Border
                variant="6"
                blend={0.5}
                layout={{ position: 'absolute', left: 0, width: 360, top: 25, bottom: 0 }}
            />
            <Region
                name="itemGrid"
                layout={{ position: 'absolute', left: 2, width: 356, top: 27, bottom: 2, flexDirection: 'column' }}
            >
                <InfiniteGrid
                    items={offers}
                    itemGrid={hasPricedOffer ? { width: 53, height: 74, spacing: 2, verticalSpacing: 0 } : { width: 36, height: 36, spacing: 2, verticalSpacing: 0 }}
                    scrollResetKey={selectedGroup}
                    getKey={offer => offer.offerId}
                    itemRender={offer => (
                        <CatalogItemGridWidgetItemView
                            offer={offer}
                            isActive={offer.offerId === selectedOfferId}
                            hilightColor={hilightColor}
                            isBuilderPage={page.isBuilderPage}
                            bundleCounter={undefined}
                            guildStuffData={undefined}
                            onSelect={offer => select(selectedGroup, offer, selectedIndices)}
                        />
                    )}
                />
            </Region>
        </Region>
    );
};
