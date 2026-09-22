/**
 * The inventory's furni page - Flash `inventory/furni/FurniView` with `FurniGridView` and the
 * `GroupItem` thumbs (`inventory_thumb_xml`), on the `furni` region (468x261) of
 * `inventory_xml`: `options_container` on top with `placement.options` (274,2) beside
 * `filter.options`; `grid_container` (0,27 284x231) holding the `item_grid` (284x221, 42x42
 * thumbs 2 apart); `preview_container` (290,27 180x237) with the `furni_preview_widget` (5,0
 * 170x130) and the bottom-anchored `preview_element_list` (spacing 1): `furni_name` (bold,
 * wrapped at 190), `furni_description` (at most 45 high), the 12px `spacer`, then the buttons
 * `updateActionButtons` adds back in its order.
 *
 * - While the list has not arrived, or holds nothing, the page draws none of that and
 *   `InventoryView` shows the loading or empty container (`updateContainerVisibility`).
 * - Opening the page asks for the list unless the one held is current
 *   (`HabboInventory.checkCategoryInitilization('furni')`); closing it clears the new-item marks
 *   (`FurniModel.closingInventoryView` -> `resetUnseenItems`).
 * - A thumb (`GroupItem.updateItemCountVisual` / `updateBackgroundVisual` /
 *   `updateSelectionVisual`): the unlocked count from 2 up, the icon faded to 0.2 when every item
 *   is locked in a trade, a green ground while the group is new, the outline when selected. A
 *   press selects it (`WME_DOWN`).
 * - While a wired trade runs (`FurniModel.isTradingOpen` on the `wired_trading` sub page) the
 *   grid shows what the trade's requirement accepts and no NFT furni
 *   (`FurniGridView.setFilterByWired`), and the buttons are `offertotrade_cnt` - only with
 *   `multi.item.trading.enabled` - and `offertotrade_btn` (`inventory.trading.offer`), enabled
 *   when the selection has an unlocked item and its last item is tradeable
 *   (`FurniView.updateActionButtons`). The offer is `FurniModel.requestSelectedFurniToTrading`
 *   with the amount field's value, at least 1, and the field shows what was offered afterwards.
 * - Otherwise the buttons are `placeinroom_btn`, which does nothing yet: placing furni in the room
 *   (`requestSelectedFurniPlacement`, the room engine's object mover) is not ported; then, for a
 *   rented item that is not in a room (`flatId` -1) whose furni data allows it, `extendrent_btn`
 *   (`rentCouldBeUsedForBuyout`) and `buyrenteditem_btn` (`purchaseCouldBeUsedForBuyout`), which
 *   open the catalogue's rent window for the strip id (`FurniModel.extendRentPeriod` /
 *   `buyRentedItem` -> `HabboCatalog.openRentConfirmationWindow`). A rented item in a room gets no
 *   `placeinroom_btn` either.
 * - `sell_btn` (`inventory.marketplace.sell`) starts an offer on the marketplace
 *   (`FurniModel.requestSelectedFurniSelling`, see `inventoryMarketplaceCommands`), for a sellable
 *   item while the marketplace is on, no trade runs, the account is not safety locked and the furni
 *   is not an external image; opening the page asks for the marketplace configuration until it has
 *   come (`checkCategoryInitilization('marketplace')`).
 * - While the catalogue's recycler runs, a thumb with an unlocked recyclable item shows the recycle
 *   mark (`recyclable_container`), and a double click (a tap whose click count is 2) puts the
 *   selection's item into the recycler (`HabboInventory.recycleSelectedFurni`); during a trade it
 *   offers one item instead (`requestCurrentActionOnSelection`).
 *
 * Not ported: the text filter and what the two filter dropmenus choose (they show the captions
 * `populateFilterOptions` selects - main `all`, type `any` - and list nothing), the 200-item
 * pages and their `item_grid_pages` / `items.shown` row (the grid scrolls instead), the room
 * previewer (the preview is the furni's own picture, centred in the widget's box) with its
 * `nextItemButton` / `viewItemButton`, `furni_extra` (rarity, chest name, rent time), the rarity,
 * limited, chest and rent overlays, the tradeable and recyclable counters, the `goto_room`
 * and `use` buttons, `placeinroom_btn`'s disabling outside a private room, and a double
 * click's placement (`requestSelectedFurniPlacement`). A song disk
 * (category 8) is named by its furni, not by its song. The grid is the theme's `InfiniteGrid` in its
 * `itemGrid` mode - Flash's `ItemGridController`: 42px thumbs 2px apart both ways, the 17px
 * scrollbar flush at the `item_grid`'s right edge.
 */
import { RoomGeometryScaleType } from '@nitrodevco/nitro-api';
import { GetRoomEngine } from '@nitrodevco/nitro-renderer';
import { useEffect, useState } from 'react';

import { checkFurniInventoryInitialization, checkMarketplaceInitialization, offerSelectedFurniToTrade, openRentConfirmationWindow, recycleSelectedInventoryFurni, requestSelectedFurniSelling } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import {
    canOfferInventoryFurniToWiredTrade, getInventoryFurniUnlockedCount, INVENTORY_FURNI_CATEGORY_POSTER, INVENTORY_FURNI_MIN_ITEMS_TO_SHOW_COUNTER, INVENTORY_RECYCLER_STATE_ACTIVE, InventoryFurniGroup, isInventoryFurniGroupWallItem, peekInventoryFurni,
    useInventoryFurniActions, useInventoryStore,
} from '#base/context/inventory';
import { useConfigValue, useSystemStore, useTranslation } from '#base/context/system';
import { useUserStore } from '#base/context/user';
import { useWiredTradingStore } from '#base/context/wired-trading';
import { Border, Box, Button, Dropmenu, InfiniteGrid, LayoutImage, Region, TextInput, ThemeImage, ThemeText } from '#base/theme';
import { useFurnitureImageTexture } from '#base/views/catalog/useFurnitureImageTexture';

import { InventoryOptionsContainer } from './InventoryOptionsContainer';

const THUMB_SIZE = 42;
/** `GroupItem.updateBackgroundVisual`: 10275685 for a new group, 13421772 otherwise. */
const THUMB_COLOR_UNSEEN = '#9ccb65';
const THUMB_COLOR = '#cccccc';
/** `GroupItem.updateItemCountVisual`: the icon's blend with nothing unlocked. */
const THUMB_LOCKED_ALPHA = 0.2;
/** `inventory_thumb_xml`: the `number_container` fill and the `number` text colour. */
const COUNT_COLOR = '#2f6982';

/** The group's furni data (`GroupItem.furniData`). */
const useGroupFurniData = (group: InventoryFurniGroup | undefined) => {
    const floorItems = useSystemStore(x => x.floorItems);
    const wallItems = useSystemStore(x => x.wallItems);

    if (!group) return undefined;

    return (isInventoryFurniGroupWallItem(group) ? wallItems : floorItems)[group.typeId];
};

/** `GroupItem.initImage`: the wall item's icon with its stuff data, or the floor item's. */
const getGroupIconUrl = (group: InventoryFurniGroup): string => {
    const engine = GetRoomEngine();

    return (isInventoryFurniGroupWallItem(group) ? engine.getFurnitureWallIconUrl(group.typeId, group.stuffData.getLegacyString() || undefined) : engine.getFurnitureFloorIconUrl(group.typeId)) ?? '';
};

interface FurniThumbProps {
    group: InventoryFurniGroup;
    selected: boolean;
    /** `showRecyclable`: the recycler runs, so a group with an unlocked recyclable item shows `recyclable_container`. */
    showRecyclable: boolean;
    onSelect: (groupId: number) => void;
    /** `WME_DOUBLE_CLICK` -> `FurniModel.requestCurrentActionOnSelection`. */
    onAction: () => void;
}

/**
 * One `inventory_thumb_xml` (42x42): the grey (or new-green) style 5 border at 1,1, the icon
 * centred and unstretched in its 40x40 `bitmap`, the `number_container` and the selection
 * `outline` over it all.
 *
 * `number_container` is a blue (`0xff2f6982`) container at 33,2 (6x15) that expands to hold its
 * `number` text at 1,1 and keeps its right edge (expand-to-children with align-right,
 * `WindowController.expandToAccommodateChild` / `setRectangle`). The text is a style 0 (Volter,
 * so `regular`) field with advanced anti-aliasing in `0x2f6982` whose `background` fills its
 * `TextField` white (no `color`, so `TextField.backgroundColor` stays white): blue digits on
 * white, framed by the container's one blue pixel on the left and top.
 */
const FurniThumb = ({ group, selected, showRecyclable, onSelect, onAction }: FurniThumbProps) => {
    const unlockedCount = getInventoryFurniUnlockedCount(group);
    const iconUrl = getGroupIconUrl(group);
    // `GroupItem.getRecyclableCount`.
    const recyclable = showRecyclable && group.items.some(item => item.recyclable && !item.locked);

    return (
        <Region
            cursor="pointer"
            onPointerDown={() => onSelect(group.id)}
            // A pointer tap's `detail` is its click count: the second one is Flash's `WME_DOUBLE_CLICK`.
            onPointerTap={(event) => {
                if (event.detail === 2) onAction();
            }}
            layout={{ position: 'relative', width: THUMB_SIZE, height: THUMB_SIZE }}
        >
            <Border
                variant="5"
                tintColor={group.hasUnseenItems ? THUMB_COLOR_UNSEEN : THUMB_COLOR}
                layout={{ position: 'absolute', left: 1, top: 1, width: 40, height: 40 }}
            >
                {(iconUrl !== '') && (
                    <ThemeImage
                        src={iconUrl}
                        bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
                        alpha={(unlockedCount <= 0) ? THUMB_LOCKED_ALPHA : 1}
                        layout={{ position: 'absolute', left: 0, top: 0, width: 40, height: 40 }}
                    />
                )}
                {recyclable && (
                    <ThemeImage
                        name="recyclable_container"
                        src={LayoutImage('inventory/inventory_thumb_icon_recycle.png')}
                        bitmap={{}}
                        layout={{ position: 'absolute', left: 2, top: 3, width: 16, height: 16 }}
                    />
                )}
                {(unlockedCount >= INVENTORY_FURNI_MIN_ITEMS_TO_SHOW_COUNTER) && (
                    <Region
                        backgroundColor={COUNT_COLOR}
                        layout={{ position: 'absolute', right: 1, top: 2, minWidth: 6, minHeight: 15, paddingLeft: 1, paddingTop: 1, flexDirection: 'row', alignItems: 'flex-start' }}
                    >
                        <Region backgroundColor="#ffffff">
                            <ThemeText
                                text={String(unlockedCount)}
                                textStyle="regular"
                                textOptions={{ fill: COUNT_COLOR }}
                                flashFormat={{ antiAliasType: 'advanced' }}
                                verticalAlign="top"
                            />
                        </Region>
                    </Region>
                )}
            </Border>
            {selected && (
                <ThemeImage
                    src={LayoutImage('shared/inventory_thumb_selected_outline.png')}
                    bitmap={{}}
                    layout={{ position: 'absolute', left: 0, top: 0, width: THUMB_SIZE, height: THUMB_SIZE }}
                />
            )}
        </Region>
    );
};

/** `furni_preview_widget`, standing in for the room previewer: the furni at 64 facing 90 degrees. */
const FurniPreview = ({ group }: { group: InventoryFurniGroup }) => {
    const furniData = useGroupFurniData(group);
    const { texture, width, height } = useFurnitureImageTexture(furniData?.className, furniData?.colorIndex ?? 0, 2, RoomGeometryScaleType.ZoomedIn, 0);

    if (!texture) return null;

    return (
        <pixiSprite
            texture={texture}
            width={width}
            height={height}
            layout={{}}
        />
    );
};

export const InventoryFurniView = () => {
    const { send } = useWebSocketContext();
    const t = useTranslation();
    const groups = useInventoryStore(x => x.furniGroups);
    const selectedGroupId = useInventoryStore(x => x.furniSelectedGroupId);
    const listInitialized = useInventoryStore(x => x.furniListInitialized);
    const tradeRunning = useWiredTradingStore(x => x.tradeRunning);
    const requirement = useWiredTradingStore(x => x.tradeRequirement);
    const floorItems = useSystemStore(x => x.floorItems);
    const wallItems = useSystemStore(x => x.wallItems);
    const multiItemTrading = useConfigValue<boolean>('multi.item.trading.enabled') ?? false;
    const marketplaceEnabled = useInventoryStore(x => x.marketplaceConfiguration.isEnabled);
    const recyclerRunning = useInventoryStore(x => x.recyclerState === INVENTORY_RECYCLER_STATE_ACTIVE);
    const safetyLocked = useUserStore(x => x.accountSafetyLocked);
    const { selectFurniGroup, resetFurniUnseenItems } = useInventoryFurniActions();
    // `offertotrade_cnt`'s caption.
    const [ offerCount, setOfferCount ] = useState('1');

    useEffect(() => {
        checkFurniInventoryInitialization(send);
        // `FurniModel.getWindowContainer` -> `checkCategoryInitilization('marketplace')`.
        checkMarketplaceInitialization(send);

        return () => resetFurniUnseenItems();
    }, [ send, resetFurniUnseenItems ]);

    // `FurniView.updateContainerVisibility`: the page shows only once the list holds something;
    // `InventoryView` draws the loading and empty containers otherwise.
    const showPage = listInitialized && (groups.length > 0);

    const selectedGroup = groups.find(group => group.id === selectedGroupId);
    const selectedItem = selectedGroup ? peekInventoryFurni(selectedGroup) : undefined;
    const selectedFurniData = useGroupFurniData(selectedGroup);

    const visibleGroups = tradeRunning
        ? groups.filter((group) => {
                const className = (isInventoryFurniGroupWallItem(group) ? wallItems : floorItems)[group.typeId]?.className ?? '';

                return (className.indexOf('nft_') !== 0) && canOfferInventoryFurniToWiredTrade(requirement, group, className);
            })
        : groups;

    // `GroupItem.getFurniItemName` / `getFurniItemDesc`: a poster by its poster id, anything else by its furni data.
    const isPoster = selectedGroup?.category === INVENTORY_FURNI_CATEGORY_POSTER;
    const posterId = selectedItem?.stuffData.getLegacyString() ?? '';
    const name = !selectedItem ? '' : (isPoster ? t(`poster_${posterId}_name`) : (selectedFurniData?.localizedName ?? ''));
    const description = !selectedItem ? '' : (isPoster ? t(`poster_${posterId}_desc`) : (selectedFurniData?.description ?? ''));

    const canOffer = tradeRunning && !!selectedGroup && !!selectedItem && (getInventoryFurniUnlockedCount(selectedGroup) > 0) && selectedItem.tradeable;

    // `FurniView.updateActionButtons`' `sell_btn`: a sellable item while the marketplace is on, the
    // account is not safety locked, no trade runs and the furni is not an external image.
    const canSell = !!selectedItem && marketplaceEnabled && selectedItem.sellable && !safetyLocked && !tradeRunning && !(selectedFurniData?.isExternalImage ?? false);

    // `updateActionButtons`: a rented item already in a room is neither placed nor extended nor bought out.
    const notInRoom = !!selectedItem && !(selectedItem.isRented && (selectedItem.flatId > -1));
    const canExtendRent = !tradeRunning && notInRoom && !!selectedItem?.isRented && !!selectedFurniData?.rentCouldBeUsedForBuyout;
    const canBuyRentedItem = !tradeRunning && notInRoom && !!selectedItem?.isRented && !!selectedFurniData?.purchaseCouldBeUsedForBuyout;

    // `FurniModel.extendRentPeriod` / `buyRentedItem`: the rent window for the selected item's strip id.
    const onRent = (isBuyout: boolean) => {
        if (selectedItem && selectedFurniData) openRentConfirmationWindow(send, selectedFurniData, isBuyout, -1, selectedItem.id);
    };

    // `FurniModel.requestCurrentActionOnSelection`: into the recycler while it runs, else into the
    // trade while one runs; placing in the room is not ported.
    const onCurrentAction = () => {
        if (recyclerRunning) recycleSelectedInventoryFurni();
        else if (tradeRunning) offerSelectedFurniToTrade(send, 1);
    };

    const onOffer = () => {
        // `offertotrade_btn`: the field's value, at least 1.
        const count = Math.max(1, parseInt(offerCount, 10) || 0);
        const caption = offerSelectedFurniToTrade(send, count);

        setOfferCount(String(caption ?? count));
    };

    return (
        <Region layout={{ position: 'absolute', left: 0, top: 0, width: 468, bottom: 0, overflow: 'hidden' }}>
            {showPage && (
                <>
                    <InventoryOptionsContainer filterCaption={t('inventory.furni.filter.main.all')} />
                    <Dropmenu
                        variant="0"
                        caption={t('inventory.furni.filter.type.any')}
                        layout={{ position: 'absolute', left: 274, top: 2, width: 119, height: 21 }}
                    />
                    <Region layout={{ position: 'absolute', left: 0, top: 27, width: 284, bottom: 3, overflow: 'hidden' }}>
                        <Box layout={{ position: 'absolute', left: 0, top: 0, width: 284, bottom: 10, flexDirection: 'column' }}>
                            <InfiniteGrid
                                items={visibleGroups}
                                itemGrid={{ width: THUMB_SIZE, height: THUMB_SIZE, spacing: 2 }}
                                // A string: the grid keys a row's empty cells by their index, which a numeric id could equal.
                                getKey={group => `group-${group.id}`}
                                itemRender={group => (
                                    <FurniThumb
                                        group={group}
                                        selected={group.id === selectedGroupId}
                                        showRecyclable={recyclerRunning}
                                        onSelect={selectFurniGroup}
                                        onAction={onCurrentAction}
                                    />
                                )}
                            />
                        </Box>
                    </Region>
                    <Region layout={{ position: 'absolute', left: 290, top: 27, width: 180, bottom: -3 }}>
                        <Box layout={{ position: 'absolute', left: 5, right: 5, top: 0, bottom: 107, minHeight: 50, alignItems: 'center', justifyContent: 'center' }}>
                            {selectedGroup && (
                                <FurniPreview
                                    key={selectedGroup.id}
                                    group={selectedGroup}
                                />
                            )}
                        </Box>
                        <Box layout={{ position: 'absolute', left: 0, right: 0, bottom: 2, flexDirection: 'column', alignItems: 'flex-start', gap: 1 }}>
                            <ThemeText
                                text={name}
                                textStyle="u_regular"
                                textOptions={{ wordWrap: true, wordWrapWidth: 186 }}
                                flashFormat={{ bold: true }}
                                verticalAlign="top"
                                layout={{ width: 190, flexShrink: 0 }}
                            />
                            <Box layout={{ width: 190, maxHeight: 45, flexShrink: 0, overflow: 'hidden' }}>
                                <ThemeText
                                    text={description}
                                    textStyle="u_regular"
                                    textOptions={{ wordWrap: true, wordWrapWidth: 186 }}
                                    verticalAlign="top"
                                    layout={{ width: 190 }}
                                />
                            </Box>
                            <Box layout={{ width: 30, height: 12, flexShrink: 0 }} />
                            {notInRoom && !tradeRunning && (
                                <Button
                                    variant="3"
                                    textStyle="button_shiny_regular"
                                    layout={{ width: 180, height: 22, flexShrink: 0 }}
                                >
                                    {t('inventory.furni.placetoroom')}
                                </Button>
                            )}
                            {canExtendRent && (
                                <Button
                                    variant="3"
                                    name="extendrent_btn"
                                    textStyle="button_shiny_regular"
                                    onPointerTap={() => onRent(false)}
                                    layout={{ width: 168, height: 22, flexShrink: 0 }}
                                >
                                    {t('inventory.furni.extendrent')}
                                </Button>
                            )}
                            {canBuyRentedItem && (
                                <Button
                                    variant="3"
                                    name="buyrenteditem_btn"
                                    textStyle="button_shiny_regular"
                                    onPointerTap={() => onRent(true)}
                                    layout={{ width: 189, height: 22, flexShrink: 0 }}
                                >
                                    {t('inventory.furni.buyrenteditem')}
                                </Button>
                            )}
                            {canSell && (
                                <Button
                                    variant="3"
                                    name="sell_btn"
                                    textStyle="button_shiny_regular"
                                    onPointerTap={() => requestSelectedFurniSelling(send)}
                                    layout={{ width: 167, height: 22, flexShrink: 0 }}
                                >
                                    {t('inventory.marketplace.sell')}
                                </Button>
                            )}
                            {selectedItem && tradeRunning && multiItemTrading && (
                                <TextInput
                                    value={offerCount}
                                    onChange={setOfferCount}
                                    textStyle="u_regular"
                                    flashPlacement
                                    border="#000000"
                                    alwaysShowSelection
                                    backgroundColor="#ffffff"
                                    focusedBackgroundColor="#ffffff"
                                    layout={{ width: 50, height: 19, flexShrink: 0 }}
                                />
                            )}
                            {selectedItem && tradeRunning && (
                                <Button
                                    variant="3"
                                    textStyle="button_shiny_regular"
                                    disabled={!canOffer}
                                    onPointerTap={onOffer}
                                    layout={{ width: 148, minWidth: 60, height: 22, flexShrink: 0 }}
                                >
                                    {t('inventory.trading.offer')}
                                </Button>
                            )}
                        </Box>
                    </Region>
                </>
            )}
        </Region>
    );
};
