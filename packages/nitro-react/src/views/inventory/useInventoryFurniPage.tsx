/**
 * The inventory's furni page - Flash `inventory/furni/FurniView` with `FurniGridView` and the
 * `GroupItem` thumbs (`inventory_thumb_xml`), on `inventory_xml`'s `furni` window.
 *
 * - `getWindowContainer` asks for the list unless the one held is current
 *   (`HabboInventory.checkCategoryInitilization('furni')`), and for the marketplace configuration
 *   (`checkCategoryInitilization('marketplace')`).
 * - `updateContainerVisibility`: `options_container`, `grid_container` and `preview_container` show
 *   once the list holds something; `InventoryView` shows the loading and empty containers otherwise.
 * - The filters (`updateGridFilters`, `FurniGridView.passFilter`, see `InventoryFurniFilterSlice`):
 *   `filter.options` and `placement.options` (whose entries follow the first), and the `filter`
 *   box, which applies on Enter and clears on Escape or `clear_filter_button` - shown while the box
 *   has text (`WKE_KEY_UP`). While a trade runs the grid also drops NFT furni (`showingNfts`, with
 *   `web3trade.enabled`), and while a wired trade runs what its requirement refuses
 *   (`setFilterByWired`).
 * - `FurniGridView.changeToPage` / `updatePaging`: the grid holds 200 thumbs a page; with more than
 *   one page `item_grid_pages` lists a clone of its first item per page, the current page's number
 *   red, a hovered one red too.
 * - A thumb (`GroupItem`): `BG_COLOR` green while the group is new, the unlocked count from 2 up,
 *   the icon faded to 0.2 with nothing unlocked, the recycle mark while the recycler runs, the rent
 *   mark (`updateRentStateVisual`, ending under `purchase.rent.warning_duration_seconds`), the
 *   limited, rarity or chest plaque (`updateItemImageVisual`) and the selection `outline`.
 *   `itemEventProc`: a press selects it; leaving it held drags the furni into the room (not during a
 *   trade); letting go puts back anything on its way out; a double click is
 *   `requestCurrentActionOnSelection`.
 * - `updateActionView`: the room previewer (`InventoryFurniPreview`), the tradeable and recyclable
 *   counts with their icons and tooltips, the limited and rarity plaques, the name, description and
 *   `furni_extra` (the rarity, or the chest's name; a rented item's time, `updateRentedItem`).
 * - `updateActionButtons`: `preview_element_list`'s buttons, re-added in its order - place in room
 *   (disabled outside a room), extend rent and buy out (a rented item not in a room), go to room (an
 *   item in a room), the amount field (`multi.item.trading.enabled`) and offer button while a trade
 *   runs (enabled for an unlocked tradeable item), and sell (marketplace on, sellable, no safety
 *   lock, no trade, not an external image). `furni_preview_region` places the furni too.
 *
 * Not ported: `use_btn`, `nextItemButton` / `viewItemButton` (`showUseProductSelection`, which the
 * room engine does not offer), an external image's own description, and the page numbers' underline.
 * A rented item whose time has run out leaves the list (`onImageUpdateTimerEvent`) in
 * `registerInventoryFurniHandlers`.
 */
import { IFurnitureData, MapDataType } from '@nitrodevco/nitro-api';
import { useEffect, useRef, useState } from 'react';

import { cancelInventoryFurniInMover, checkFurniInventoryInitialization, checkMarketplaceInitialization, goToRoom, offerSelectedFurniToTrade, openRentConfirmationWindow, recycleSelectedInventoryFurni, requestSelectedFurniPlacement, requestSelectedFurniSelling } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import {
    canOfferInventoryFurniToWiredTrade, getInventoryFurniRecyclableCount, getInventoryFurniSecondsToExpiration, getInventoryFurniTradeableCount, getInventoryFurniTypeFilters, getInventoryFurniUnlockedCount, getStuffDataChestName, INVENTORY_FURNI_CATEGORY_POSTER, INVENTORY_FURNI_MAIN_FILTERS, INVENTORY_RECYCLER_STATE_ACTIVE, InventoryFurniGroup, isInventoryFurniGroupWallItem, passInventoryFurniFilter, peekInventoryFurni, useInventoryFurniActions, useInventoryStore,
} from '#base/context/inventory';
import { useRoom } from '#base/context/room';
import { useConfigValue, useSystemStore, useTranslation } from '#base/context/system';
import { useUserStore } from '#base/context/user';
import { useWiredTradingStore } from '#base/context/wired-trading';
import { TemplateBindings, TemplateItem, TemplateWindow } from '#base/theme';
import { GetFriendlyTime } from '#base/utils';
import { LimitedItemPreviewOverlayView } from '#base/views/shared/LimitedItemPreviewOverlayView';

import { InventoryFurniPreview } from './InventoryFurniPreview';
import { findInventoryElement, INVENTORY_GRID_PAGE_SIZE, inventoryGridPageCount, inventoryGridPageItems, InventoryPage, InventoryPageContext, inventoryPagePath, inventoryPageState, inventoryTemplateId, NO_INVENTORY_PAGE } from './inventoryPage';
import { DEFAULT_RENT_WARNING_SECONDS, inventoryFurniThumbBindings } from './inventoryThumbs';

/** `updateActionView`'s icons, by whether there are any to trade or recycle. */
const TRADE_ICON = 'habbo-window-manager-com-inventory_furni_trade_icon';
const NO_TRADE_ICON = 'habbo-window-manager-com-inventory_furni_no_trade_icon';
const RECYCLE_ICON = 'habbo-window-manager-com-inventory_furni_recycle_icon';
const NO_RECYCLE_ICON = 'habbo-window-manager-com-inventory_furni_no_recycle_icon';

/**
 * How often a started rent's time left is read again. Flash reads it every 200 ms
 * (`onImageUpdateTimerEvent`), but its text counts in whole seconds at the finest, and a read
 * re-renders the page.
 */
const RENT_UPDATE_INTERVAL_MS = 1000;

/** The room layout papers' categories - wallpaper, floor and landscape - which a press on the preview does not place. */
const ROOM_LAYOUT_CATEGORIES = [ 2, 3, 4 ];

const page = (name?: string) => inventoryPagePath('furni', name);

export const useInventoryFurniPage = ({ active, templates }: InventoryPageContext): InventoryPage => {
    const { send } = useWebSocketContext();
    const t = useTranslation();
    const groups = useInventoryStore(x => x.furniGroups);
    const selectedGroupId = useInventoryStore(x => x.furniSelectedGroupId);
    const listInitialized = useInventoryStore(x => x.furniListInitialized);
    const filterMain = useInventoryStore(x => x.furniFilterMain);
    const filterType = useInventoryStore(x => x.furniFilterType);
    const filterText = useInventoryStore(x => x.furniFilterText);
    const userTradeActive = useInventoryStore(x => x.tradingActive);
    const wiredTradeRunning = useWiredTradingStore(x => x.tradeRunning);
    const requirement = useWiredTradingStore(x => x.tradeRequirement);
    const floorItems = useSystemStore(x => x.floorItems);
    const wallItems = useSystemStore(x => x.wallItems);
    const multiItemTrading = useConfigValue<boolean>('multi.item.trading.enabled') ?? false;
    // `HabboInventory.web3tradeEnabled`: without it a trade never hides the NFT furni.
    const web3TradeEnabled = useConfigValue<boolean>('web3trade.enabled') === true;
    const marketplaceEnabled = useInventoryStore(x => x.marketplaceConfiguration.isEnabled);
    const recyclerRunning = useInventoryStore(x => x.recyclerState === INVENTORY_RECYCLER_STATE_ACTIVE);
    const safetyLocked = useUserStore(x => x.accountSafetyLocked);
    const rentWarningSeconds = useConfigValue<number>('purchase.rent.warning_duration_seconds') ?? DEFAULT_RENT_WARNING_SECONDS;
    // `FurniModel.isPrivateRoom`: every room session is a private room.
    const inRoom = !!useRoom();
    const { selectFurniGroup, setFurniFilterMain, setFurniFilterType, setFurniFilterText } = useInventoryFurniActions();
    // The `filter` box's caption, which the grid takes on Enter; a reset of the filters empties it.
    const [ filterCaption, setFilterCaption ] = useState(filterText);
    const [ appliedText, setAppliedText ] = useState(filterText);
    // `offertotrade_cnt`'s caption.
    const [ offerCount, setOfferCount ] = useState('1');
    // `FurniGridView.§_-B2M§` and the page number the pointer is over.
    const [ currentPage, setCurrentPage ] = useState(0);
    const [ hoveredPage, setHoveredPage ] = useState(-1);
    // `GroupItem.§_-F1a§`: the thumb being held, so leaving it is a drag rather than a hover.
    const heldGroup = useRef<number>(-1);
    // Bumped to read the selected item's rent again (`updateRentedItem`).
    const [ , setRentReads ] = useState(0);
    const selectedPeek = (() => {
        const group = groups.find(entry => entry.id === selectedGroupId);

        return group ? peekInventoryFurni(group) : undefined;
    })();
    const rentCounting = active && !!selectedPeek?.isRented && selectedPeek.hasRentPeriodStarted;

    // `HabboInventory.activeTradingModel`: either trade puts the page into its trading shape.
    const tradeRunning = userTradeActive || wiredTradeRunning;

    if (appliedText !== filterText) {
        setAppliedText(filterText);
        setFilterCaption(filterText);
    }

    useEffect(() => {
        if (!active) return;

        checkFurniInventoryInitialization(send);
        checkMarketplaceInitialization(send);
    }, [ active, send ]);

    // `onImageUpdateTimerEvent` -> `updateRentedItem`: a started rent's time left is shown counting down.
    useEffect(() => {
        if (!rentCounting) return;

        const timer = setInterval(() => setRentReads(reads => reads + 1), RENT_UPDATE_INTERVAL_MS);

        return () => clearInterval(timer);
    }, [ rentCounting ]);

    if (!active) return NO_INVENTORY_PAGE;

    // `setViewToState`'s 3: the page's own windows show only once the list holds something.
    const showContent = listInitialized && (groups.length > 0);

    /** `GroupItem.furniData`. */
    const getFurniData = (group: InventoryFurniGroup): IFurnitureData | undefined => (isInventoryFurniGroupWallItem(group) ? wallItems : floorItems)[group.typeId];

    /** `GroupItem.getFurniItemName` / `getFurniItemDesc`: a poster by its poster id, anything else by its furni data. */
    const getGroupTexts = (group: InventoryFurniGroup): { name: string; description: string } => {
        const item = peekInventoryFurni(group);

        if (!item) return { name: '', description: '' };

        if (group.category === INVENTORY_FURNI_CATEGORY_POSTER) {
            const posterId = item.stuffData.getLegacyString();

            return { name: t(`poster_${posterId}_name`), description: t(`poster_${posterId}_desc`) };
        }

        const furniData = getFurniData(group);

        return { name: furniData?.localizedName ?? '', description: furniData?.description ?? '' };
    };

    // `FurniGridView.update`: the groups that pass every filter, in the model's order.
    const passedGroups = groups.filter((group) => {
        const texts = getGroupTexts(group);

        if (!passInventoryFurniFilter(filterMain, filterType, filterText, { group, furniData: getFurniData(group), ...texts, chestName: getStuffDataChestName(group.stuffData) })) return false;

        const isNft = (getFurniData(group)?.className ?? '').indexOf('nft_') === 0;

        // `subCategorySwitch('trading')` turns `showingNfts` off for as long as the trade runs.
        if (userTradeActive && web3TradeEnabled && isNft) return false;

        if (!wiredTradeRunning) return true;

        return !isNft && canOfferInventoryFurniToWiredTrade(requirement, group, getFurniData(group)?.className ?? '');
    });

    // `changeToPage`: the page kept within the pages there are.
    const pageCount = inventoryGridPageCount(passedGroups.length);
    const shownPage = Math.max(0, Math.min(currentPage, pageCount - 1));
    const pageGroups = passedGroups.slice(shownPage * INVENTORY_GRID_PAGE_SIZE, (shownPage + 1) * INVENTORY_GRID_PAGE_SIZE);

    const selectedGroup = groups.find(group => group.id === selectedGroupId);
    const selectedItem = selectedGroup ? peekInventoryFurni(selectedGroup) : undefined;
    const selectedFurniData = selectedGroup ? getFurniData(selectedGroup) : undefined;
    const selectedTexts = selectedGroup ? getGroupTexts(selectedGroup) : { name: '', description: '' };

    // `FurniModel.requestCurrentActionOnSelection`: into the recycler while it runs, into the trade
    // while one runs, else placed in the room.
    const onCurrentAction = () => {
        if (recyclerRunning) recycleSelectedInventoryFurni();
        else if (tradeRunning) offerSelectedFurniToTrade(send, 1);
        else requestSelectedFurniPlacement(send, true);
    };

    // `GroupItem` over a clone of `inventory_thumb_xml`: `initWindow`'s visuals and `itemEventProc`.
    const thumbTemplate = templates[inventoryTemplateId('inventory_thumb_xml')];
    const thumbs: TemplateItem[] = thumbTemplate
        ? pageGroups.map(group => ({
                key: String(group.id),
                from: thumbTemplate,
                bindings: {
                    ...inventoryFurniThumbBindings(group, { selected: group.id === selectedGroupId, unseen: group.hasUnseenItems, showRecyclable: recyclerRunning, rentWarningSeconds }),
                    '': {
                        onPointerDown: () => {
                            selectFurniGroup(group.id);
                            heldGroup.current = group.id;
                        },
                        onPointerUp: () => {
                            heldGroup.current = -1;
                            cancelInventoryFurniInMover();
                        },
                        // `WME_OUT`: dragging off a held thumb takes the furni into the room, unless a trade is open.
                        onPointerOut: () => {
                            if ((heldGroup.current !== group.id) || tradeRunning) return;

                            if (requestSelectedFurniPlacement(send, true)) heldGroup.current = -1;
                        },
                        // A tap's `detail` is its click count: the second is `WME_DOUBLE_CLICK`.
                        onPointerTap: (event) => {
                            heldGroup.current = -1;

                            if (event.detail === 2) onCurrentAction();
                        },
                    },
                },
            }))
        : [];

    const pageItems = inventoryGridPageItems(findInventoryElement(templates, page('item_grid_pages'))?.children[0], {
        count: pageCount,
        current: shownPage,
        hovered: hoveredPage,
        onPage: setCurrentPage,
        onHover: (index, over) => setHoveredPage(current => (over ? index : ((current === index) ? -1 : current))),
    });

    const applyFilterText = (text: string) => {
        setFilterCaption(text);
        setFurniFilterText(text);
    };

    // `updateActionButtons`.
    const hasSelection = !!selectedGroup && !!selectedItem;
    const notRentedInRoom = !!selectedItem && !(selectedItem.isRented && (selectedItem.flatId > -1));
    const canExtendRent = !!selectedItem?.isRented && notRentedInRoom && !!selectedFurniData?.rentCouldBeUsedForBuyout;
    const canBuyRentedItem = !!selectedItem?.isRented && notRentedInRoom && !!selectedFurniData?.purchaseCouldBeUsedForBuyout;
    const canSell = hasSelection && marketplaceEnabled && selectedItem.sellable && !safetyLocked && !tradeRunning && !(selectedFurniData?.isExternalImage ?? false);
    const canOffer = hasSelection && (getInventoryFurniUnlockedCount(selectedGroup) > 0) && selectedItem.tradeable;

    // `FurniModel.extendRentPeriod` / `buyRentedItem`: the rent window for the selected item's strip id.
    const onRent = (isBuyout: boolean) => {
        if (selectedItem && selectedFurniData) openRentConfirmationWindow(send, selectedFurniData, isBuyout, -1, selectedItem.id);
    };

    // `offertotrade_btn`: the field's value, at least 1; the field shows what was offered afterwards.
    const onOffer = () => {
        const count = Math.max(1, parseInt(offerCount, 10) || 0);
        const caption = offerSelectedFurniToTrade(send, count);

        setOfferCount(String(caption ?? count));
    };

    /** `placeinroom_btn` / `furni_preview_region`'s click: placed, unless a trade is open. */
    const onPlace = () => {
        if (!tradeRunning) requestSelectedFurniPlacement(send);
    };

    const buttons: [ name: string, shown: boolean, bindings: TemplateBindings ][] = [
        [ 'placeinroom_btn', !tradeRunning && notRentedInRoom, { '': { disabled: !(hasSelection && inRoom), onPointerTap: onPlace } } ],
        [ 'extendrent_btn', !tradeRunning && canExtendRent, { '': { onPointerTap: () => onRent(false) } } ],
        [ 'buyrenteditem_btn', !tradeRunning && canBuyRentedItem, { '': { onPointerTap: () => onRent(true) } } ],
        [ 'goto_room_btn', !tradeRunning && !!selectedItem && (selectedItem.flatId > -1), { '': { onPointerTap: () => selectedItem && goToRoom(send, selectedItem.flatId) } } ],
        [ 'offertotrade_cnt', tradeRunning && multiItemTrading, { '': { caption: offerCount, onChange: setOfferCount, disabled: !canOffer } } ],
        [ 'offertotrade_btn', tradeRunning, { '': { disabled: !canOffer, onPointerTap: onOffer } } ],
        [ 'sell_btn', canSell, { '': { onPointerTap: () => requestSelectedFurniSelling(send) } } ],
    ];

    // `furni_extra`: the rarity, or the chest's name - then `updateRentedItem`: a rented item's time
    // left once its period has started, its whole period before.
    const stuffData = selectedItem?.stuffData;
    const rentText = selectedItem?.isRented
        ? t(selectedItem.hasRentPeriodStarted ? 'inventory.rent.expiration' : 'inventory.rent.inactive', '', { time: GetFriendlyTime(t, getInventoryFurniSecondsToExpiration(selectedItem)) })
        : undefined;
    const extraText = rentText ?? ((!stuffData)
        ? ''
        : (stuffData.rarityLevel >= 0)
                ? (((stuffData instanceof MapDataType) && (stuffData.getValue('rarity') !== undefined)) ? t('inventory.rarity', '', { rarity: String(stuffData.rarityLevel) }) : '')
                : (getStuffDataChestName(stuffData) ? t('inventory.chest_name', '', { chest_name: getStuffDataChestName(stuffData) }) : ''));

    // `preview_element_list`: its texts, then `updateActionButtons`' buttons in the order it adds them.
    const previewItems: TemplateItem[] = [
        { key: 'furni_name', from: page('furni_name'), bindings: { '': { caption: hasSelection ? selectedTexts.name : '' } } },
        { key: 'furni_description', from: page('furni_description'), bindings: { '': { caption: hasSelection ? selectedTexts.description : '' } } },
        { key: 'furni_extra', from: page('furni_extra'), bindings: { '': { caption: extraText, visible: extraText !== '' } } },
        { key: 'spacer', from: page('spacer') },
        ...(hasSelection ? buttons.filter(([ , shown ]) => shown).map(([ name, , bindings ]) => ({ key: name, from: page(name), bindings })) : []),
    ];

    const tradeableCount = selectedGroup ? getInventoryFurniTradeableCount(selectedGroup) : 0;
    const recyclableCount = selectedGroup ? getInventoryFurniRecyclableCount(selectedGroup) : 0;
    const unique = !!stuffData && (stuffData.uniqueNumber > 0);
    const rare = !!stuffData && (stuffData.rarityLevel >= 0);

    return {
        state: inventoryPageState(listInitialized, groups.length),
        bindings: {
            [page('options_container')]: { visible: showContent },
            [page('grid_container')]: { visible: showContent },
            [page('preview_container')]: { visible: showContent },

            // `windowEventProc`: Enter applies the box, Escape and the clear button empty it.
            [page('filter')]: {
                caption: filterCaption,
                onChange: setFilterCaption,
                onEnter: () => setFurniFilterText(filterCaption),
                onKeyDown: (key) => {
                    if (key === 'Escape') applyFilterText('');
                },
            },
            [page('clear_filter_button')]: { visible: filterCaption.length > 0, onPointerTap: () => applyFilterText('') },
            // `populateFilterOptions` / `populateTypeFilterOptions`: the ids name their own texts.
            [page('filter.options')]: {
                options: INVENTORY_FURNI_MAIN_FILTERS.map(id => t(`inventory.furni.filter.main.${id}`)),
                selection: INVENTORY_FURNI_MAIN_FILTERS.indexOf(filterMain),
                onSelect: index => setFurniFilterMain(INVENTORY_FURNI_MAIN_FILTERS[index]),
            },
            [page('placement.options')]: {
                options: getInventoryFurniTypeFilters(filterMain).map(id => t(`inventory.furni.filter.type.${id}`)),
                selection: Math.max(0, getInventoryFurniTypeFilters(filterMain).indexOf(filterType)),
                onSelect: index => setFurniFilterType(getInventoryFurniTypeFilters(filterMain)[index]),
            },

            [page('item_grid')]: { items: thumbs },
            [page('item_grid_pages')]: { visible: pageCount > 1, items: pageItems },
            // `populateFilterOptions`.
            [page('items.shown')]: { visible: false },

            [page('furni_preview_widget')]: {
                visible: hasSelection,
                children: selectedGroup && (
                    <InventoryFurniPreview
                        key={selectedGroup.id}
                        group={selectedGroup}
                        layout={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0 }}
                    />
                ),
            },
            // `WME_DOWN` places anything but a room layout paper; `WME_CLICK` places.
            [page('furni_preview_region')]: {
                onPointerDown: () => {
                    if (selectedGroup && !ROOM_LAYOUT_CATEGORIES.includes(selectedGroup.category)) onPlace();
                },
                onPointerTap: onPlace,
            },
            [page('nextItemButton')]: { visible: false },
            [page('viewItemButton')]: { visible: false },

            [page('tradeable_info_region')]: { tooltip: hasSelection ? t((tradeableCount > 0) ? 'inventory.furni.preview.tradeable_amount' : 'inventory.furni.preview.not_tradeable') : undefined },
            [page('tradeable_icon')]: { asset: hasSelection ? ((tradeableCount > 0) ? TRADE_ICON : NO_TRADE_ICON) : '' },
            [page('tradeable_number')]: { visible: tradeableCount > 0, caption: String(tradeableCount) },
            [page('recyclable_info_region')]: { tooltip: hasSelection ? t((recyclableCount > 0) ? 'inventory.furni.preview.recyclable_amount' : 'inventory.furni.preview.not_recyclable') : undefined },
            [page('recyclable_icon')]: { asset: hasSelection ? ((recyclableCount > 0) ? RECYCLE_ICON : NO_RECYCLE_ICON) : '' },
            [page('recyclable_number')]: { visible: recyclableCount > 0, caption: String(recyclableCount) },

            [page('unique_limited_item_overlay_widget')]: unique && stuffData
                ? {
                        visible: true,
                        children: (
                            <LimitedItemPreviewOverlayView
                                serialNumber={stuffData.uniqueNumber}
                                seriesSize={stuffData.uniqueSeries}
                            />
                        ),
                    }
                : { visible: false },
            [page('rarity_item_overlay_widget')]: rare && stuffData
                ? {
                        visible: true,
                        children: (
                            <TemplateWindow
                                id="habbo-window-manager-com/rarity_item_overlay_preview_xml"
                                bindings={{ level: { caption: String(stuffData.rarityLevel) } }}
                            />
                        ),
                    }
                : { visible: false },

            [page('preview_element_list')]: { items: previewItems },
        },
    };
};
