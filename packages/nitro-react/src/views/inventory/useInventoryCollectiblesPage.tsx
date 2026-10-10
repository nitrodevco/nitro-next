/**
 * The inventory's collectibles page - Flash `inventory/collectibles/CollectiblesView` with
 * `CollectiblesGridView` and its `CollectibleGroupedItem` thumbs (`inventory_thumb_nft_xml`), on
 * `inventory_xml`'s `collectibles` window. The tab only shows while a trade runs (`InventoryView`).
 *
 * - Opening the page asks for the trade inventory (`GetNftTradeInventoryComposer`), the NFTs a
 *   trade may offer from; `initCollectibles` groups them by product - one thumb per product, the
 *   copies already in the trade counted out (`unlockedAssetCount`).
 * - `updateState` / `updateContainerVisibility`: `grid_container`, `options_container` and
 *   `preview_container` while the list holds something, the window's `empty_container` otherwise.
 * - `populateFilterOptions` / `updateFilters`: `filter.options` is "everything" and the product
 *   types (`FILTER_OPTIONS`); the `filter` box matches a product's name and applies on Enter or a
 *   filter picked; `clear_filter_button` empties it.
 * - `CollectiblesGridView`: 200 thumbs a page with `item_grid_pages`, as the furni grid pages.
 * - A thumb: the product's icon, faded with no copy free, the free count from 2 up, the `outline`
 *   while selected; a click selects it, a double click offers one copy (`requestAddTrading`).
 * - `updatePreview` (`maybeSelectFirst` first): the selected product's `nft_name`, its
 *   `collectibles.item.type` in `nft_type`, its preview in `nft_image`; `offertotrade_btn` is
 *   disabled with no copy free, and clamps `offertotrade_cnt` between 1 and the free copies.
 *
 * The client keeps no "list arrived" flag for the trade inventory, so the page is never in its
 * loading state.
 */
import { useEffect, useState } from 'react';

import { getCollectiblePreviewIcon, getCollectibleProductName, getCollectibleProductType, requestAddNftsToTrading, requestNftTradeInventory } from '#base/commands';
import { wrapBaseItem } from '#base/context/collectibles';
import { useWebSocketContext } from '#base/context/communication';
import { groupTradingNftInventory, InventoryCollectibleGroup, takeTradingNftAssetIds, useInventoryStore, useInventoryTradingActions } from '#base/context/inventory';
import { useTranslation } from '#base/context/system';
import { LayoutImage, TemplateItem } from '#base/theme';
import { CollectiblesProductPreview } from '#base/views/shared/CollectiblesProductPreview';

import {
    findInventoryElement, INVENTORY_GRID_PAGE_SIZE, inventoryGridPageCount, inventoryGridPageItems, InventoryPage, InventoryPageContext, inventoryPagePath, inventoryPageState, inventoryTemplateId, NO_INVENTORY_PAGE,
} from './inventoryPage';
import { inventoryNftThumbBindings } from './inventoryThumbs';

/** `CollectiblesView.FILTER_OPTIONS`: the product types `filter.options` lists after "everything", and their texts. */
const FILTER_OPTIONS: readonly { productTypeId: number; label: string }[] = [
    { productTypeId: 1, label: 'product.type.room' },
    { productTypeId: 0, label: 'product.type.wall' },
    { productTypeId: 11, label: 'product.type.clothing' },
    { productTypeId: 9, label: 'product.type.chatstyle' },
    { productTypeId: 4, label: 'product.type.badge' },
    { productTypeId: 2, label: 'product.type.effect' },
    { productTypeId: 10, label: 'product.type.pets' },
];

const page = (name?: string) => inventoryPagePath('collectibles', name);

export const useInventoryCollectiblesPage = ({ active, templates }: InventoryPageContext): InventoryPage => {
    const { send } = useWebSocketContext();
    const t = useTranslation();
    const inventory = useInventoryStore(x => x.tradingNftInventory);
    const offered = useInventoryStore(x => x.tradingOwnUser.nftItems);
    const selectedKey = useInventoryStore(x => x.tradingNftSelectedKey);
    const { selectTradingNft } = useInventoryTradingActions();
    // `filter.options`' selection, and the `filter` box with the term the last update read from it.
    const [ filterIndex, setFilterIndex ] = useState(0);
    const [ filterCaption, setFilterCaption ] = useState('');
    const [ searchTerm, setSearchTerm ] = useState('');
    const [ offerCount, setOfferCount ] = useState('1');
    const [ currentPage, setCurrentPage ] = useState(0);
    const [ hoveredPage, setHoveredPage ] = useState(-1);

    const groups = groupTradingNftInventory(inventory, offered);
    const productTypeId = (filterIndex <= 0) ? -1 : FILTER_OPTIONS[filterIndex - 1].productTypeId;

    // `CollectiblesGridView.passFilter`.
    const passedGroups = groups.filter((group) => {
        const info = wrapBaseItem(group.item);

        if (searchTerm && !getCollectibleProductName(info).toLowerCase().includes(searchTerm)) return false;

        return (productTypeId === -1) || (info.productTypeId === productTypeId);
    });

    const pageCount = inventoryGridPageCount(passedGroups.length);
    const shownPage = Math.max(0, Math.min(currentPage, pageCount - 1));
    const pageGroups = passedGroups.slice(shownPage * INVENTORY_GRID_PAGE_SIZE, (shownPage + 1) * INVENTORY_GRID_PAGE_SIZE);

    const selectedGroup = groups.find(group => group.key === selectedKey);
    const firstKey = pageGroups[0]?.key;

    useEffect(() => {
        if (active) requestNftTradeInventory(send);
    }, [ active, send ]);

    // `maybeSelectFirst`.
    useEffect(() => {
        if (active && !selectedGroup && firstKey) selectTradingNft(firstKey);
    }, [ active, selectedGroup, firstKey, selectTradingNft ]);

    if (!active) return NO_INVENTORY_PAGE;

    const showContent = groups.length > 0;

    /** `updateFilters`: the box's caption is the search term. */
    const update = (caption: string = filterCaption) => setSearchTerm(caption.toLowerCase());

    /** `requestAddTrading`: the asked-for number of free copies. */
    const offer = (group: InventoryCollectibleGroup, count: number) => requestAddNftsToTrading(send, takeTradingNftAssetIds(group, offered, count));

    // `offertotrade_btn`: at least one, at most what is free, and the field corrected.
    const onOffer = () => {
        if (!selectedGroup) return;

        const wanted = Math.min(Math.max(1, parseInt(offerCount, 10) || 0), selectedGroup.unlockedAssetCount);

        if (String(wanted) !== offerCount) setOfferCount(String(wanted));

        offer(selectedGroup, wanted);
    };

    const thumbTemplate = templates[inventoryTemplateId('inventory_thumb_nft_xml')];
    const thumbs: TemplateItem[] = thumbTemplate
        ? pageGroups.map(group => ({
                key: group.key,
                from: thumbTemplate,
                bindings: {
                    ...inventoryNftThumbBindings(group.item, group.unlockedAssetCount, group.key === selectedKey),
                    // `itemEventProc`: a click selects, a double click offers one copy.
                    '': {
                        onPointerTap: (event) => {
                            if (event.detail === 2) offer(group, 1);
                            else selectTradingNft(group.key);
                        },
                    },
                },
            }))
        : [];

    const selectedInfo = selectedGroup ? wrapBaseItem(selectedGroup.item) : undefined;

    return {
        state: inventoryPageState(true, groups.length),
        bindings: {
            [page('grid_container')]: { visible: showContent },
            [page('options_container')]: { visible: showContent },
            [page('preview_container')]: { visible: showContent },

            [page('filter')]: {
                caption: filterCaption,
                onChange: setFilterCaption,
                onEnter: () => update(),
            },
            [page('clear_filter_button')]: {
                visible: filterCaption.length > 0,
                onPointerTap: () => {
                    setFilterCaption('');
                    update('');
                },
            },
            [page('filter.options')]: {
                options: [ t('inventory.filter.option.everything', 'Everything'), ...FILTER_OPTIONS.map(option => t(option.label)) ],
                selection: filterIndex,
                onSelect: (index) => {
                    setFilterIndex(index);
                    update();
                },
            },

            [page('item_grid')]: { items: thumbs },
            [page('item_grid_pages')]: {
                visible: pageCount > 1,
                items: inventoryGridPageItems(findInventoryElement(templates, page('item_grid_pages'))?.children[0], {
                    count: pageCount,
                    current: shownPage,
                    hovered: hoveredPage,
                    onPage: setCurrentPage,
                    onHover: (index, over) => setHoveredPage(current => (over ? index : ((current === index) ? -1 : current))),
                }),
            },

            [page('nft_name')]: { caption: selectedInfo ? getCollectibleProductName(selectedInfo) : '' },
            [page('nft_type')]: { caption: selectedInfo ? `${t('collectibles.item.type')}: ${getCollectibleProductType(selectedInfo)}` : '' },
            [page('nft_image')]: {
                // `ProductImageWidget.productInfo`: the product drawn across the widget, a badge or the
                // unknown stamp at its own size in the middle.
                children: selectedInfo && (
                    <CollectiblesProductPreview
                        key={selectedKey}
                        preview={getCollectiblePreviewIcon(selectedInfo)}
                        slots={{
                            productPreview: { left: 0, top: 0, width: 170, height: 110 },
                            badge: { left: 65, top: 35, width: 40, height: 40, zoom: 1 },
                            unknown: { left: 76, top: 46, width: 18, height: 18, src: LayoutImage('habbo-window-manager-com/collectables_icon_curator_stamp_small.png'), stretched: true },
                            pet: { left: 0, top: 0, width: 170, height: 110, zoom: 1, shrinkOnOverflow: true },
                        }}
                    />
                ),
            },
            [page('offertotrade_cnt')]: { caption: offerCount, onChange: setOfferCount },
            [page('offertotrade_btn')]: { disabled: !selectedGroup || (selectedGroup.unlockedAssetCount === 0), onPointerTap: onOffer },
        },
    };
};
