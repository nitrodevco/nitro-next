/**
 * The inventory's furni page - Flash `inventory/furni/FurniView` with `FurniGridView` and the
 * `GroupItem` thumbs (`inventory_thumb_xml`), on the `furni` region of `inventory_xml`: the
 * filter row on top, the grid of group items on the left (284 wide) and the selected group's
 * name, description and action buttons on the right (180 wide).
 *
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
 * - Otherwise the button is `placeinroom_btn`, which does nothing yet: placing furni in the room
 *   (`requestSelectedFurniPlacement`, the room engine's object mover) is not ported.
 *
 * Not ported: the text filter and the two filter dropmenus (drawn, empty - the header row keeps
 * its geometry), the 200-item pages (the grid scrolls instead), the room previewer (the preview
 * is the furni's own picture), the rarity, limited, chest and rent overlays, the tradeable and
 * recyclable counters, and a double click's `requestCurrentActionOnSelection` - the kit has no
 * double click. A song disk (category 8) is named by its furni, not by its song.
 */
import { RoomGeometryScaleType } from '@nitrodevco/nitro-api';
import { GetRoomEngine } from '@nitrodevco/nitro-renderer';
import { useEffect, useState } from 'react';

import { checkFurniInventoryInitialization, offerSelectedFurniToTrade } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import {
    canOfferInventoryFurniToWiredTrade, getInventoryFurniUnlockedCount, INVENTORY_FURNI_CATEGORY_POSTER, INVENTORY_FURNI_MIN_ITEMS_TO_SHOW_COUNTER, InventoryFurniGroup, isInventoryFurniGroupWallItem, peekInventoryFurni,
    useInventoryFurniActions, useInventoryStore,
} from '#base/context/inventory';
import { useConfigValue, useSystemStore, useTranslation } from '#base/context/system';
import { useWiredTradingStore } from '#base/context/wired-trading';
import { Border, Box, Button, Dropmenu, InfiniteGrid, LayoutImage, Region, TextInput, ThemeImage, ThemeText } from '#base/theme';
import { useFurnitureImageTexturePixi } from '#base/views/catalog/useFurnitureImageTexturePixi';

const THUMB_SIZE = 42;
/** `GroupItem.updateBackgroundVisual`: 10275685 for a new group, 13421772 otherwise. */
const THUMB_COLOR_UNSEEN = '#9ccb65';
const THUMB_COLOR = '#cccccc';
/** `GroupItem.updateItemCountVisual`: the icon's blend with nothing unlocked. */
const THUMB_LOCKED_ALPHA = 0.2;
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
    onSelect: (groupId: number) => void;
}

/** One `inventory_thumb_xml` (42x42). */
const FurniThumb = ({ group, selected, onSelect }: FurniThumbProps) => {
    const unlockedCount = getInventoryFurniUnlockedCount(group);
    const iconUrl = getGroupIconUrl(group);

    return (
        <Region
            cursor="pointer"
            onPointerDown={() => onSelect(group.id)}
            layout={{ position: 'relative', width: THUMB_SIZE, height: THUMB_SIZE }}
        >
            <Border
                variant="5"
                tintColor={group.hasUnseenItems ? THUMB_COLOR_UNSEEN : THUMB_COLOR}
                layout={{ position: 'absolute', left: 1, top: 1, width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }}
            >
                {(iconUrl !== '') && (
                    <ThemeImage
                        src={iconUrl}
                        alpha={(unlockedCount <= 0) ? THUMB_LOCKED_ALPHA : 1}
                    />
                )}
                {(unlockedCount >= INVENTORY_FURNI_MIN_ITEMS_TO_SHOW_COUNTER) && (
                    <Region
                        backgroundColor={COUNT_COLOR}
                        layout={{ position: 'absolute', right: 1, top: 2, height: 15, paddingLeft: 1, paddingRight: 1, justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={String(unlockedCount)}
                            textStyle="text-style-id-small"
                        />
                    </Region>
                )}
            </Border>
            {selected && (
                <ThemeImage
                    src={LayoutImage('shared/inventory_thumb_selected_outline.png')}
                    layout={{ position: 'absolute', left: 0, top: 0, width: THUMB_SIZE, height: THUMB_SIZE }}
                />
            )}
        </Region>
    );
};

/** `furni_preview_widget`, standing in for the room previewer: the furni at 64 facing 90 degrees. */
const FurniPreview = ({ group }: { group: InventoryFurniGroup }) => {
    const furniData = useGroupFurniData(group);
    const { texture, width, height } = useFurnitureImageTexturePixi(furniData?.className, furniData?.colorIndex ?? 0, 2, RoomGeometryScaleType.ZoomedIn, 0);

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
    const tradeRunning = useWiredTradingStore(x => x.tradeRunning);
    const requirement = useWiredTradingStore(x => x.tradeRequirement);
    const floorItems = useSystemStore(x => x.floorItems);
    const wallItems = useSystemStore(x => x.wallItems);
    const multiItemTrading = useConfigValue<boolean>('multi.item.trading.enabled') ?? false;
    const { selectFurniGroup, resetFurniUnseenItems } = useInventoryFurniActions();
    // `offertotrade_cnt`'s caption.
    const [ offerCount, setOfferCount ] = useState('1');

    useEffect(() => {
        checkFurniInventoryInitialization(send);

        return () => resetFurniUnseenItems();
    }, [ send, resetFurniUnseenItems ]);

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

    const onOffer = () => {
        // `offertotrade_btn`: the field's value, at least 1.
        const count = Math.max(1, parseInt(offerCount, 10) || 0);
        const caption = offerSelectedFurniToTrade(send, count);

        setOfferCount(String(caption ?? count));
    };

    return (
        <Box layout={{ flexDirection: 'column', gap: 4, height: '100%' }}>
            <Border
                variant="3"
                tintColor="#cacaca"
                layout={{ flexDirection: 'row', gap: 6, padding: 4, height: 25, alignItems: 'center' }}
            >
                <Border
                    variant="0"
                    layout={{ width: 139, height: 20 }}
                />
                <Dropmenu
                    variant="100"
                    layout={{ width: 119, height: 21 }}
                />
                <Dropmenu
                    variant="100"
                    layout={{ width: 119, height: 21 }}
                />
            </Border>
            <Box layout={{ flexDirection: 'row', flex: 1, gap: 6 }}>
                <Box layout={{ flexDirection: 'column', width: 284, flexShrink: 0 }}>
                    <InfiniteGrid
                        items={visibleGroups}
                        itemWidth={THUMB_SIZE}
                        // A string: the grid keys a row's empty cells by their index, which a numeric id could equal.
                        getKey={group => `group-${group.id}`}
                        itemRender={group => (
                            <FurniThumb
                                group={group}
                                selected={group.id === selectedGroupId}
                                onSelect={selectFurniGroup}
                            />
                        )}
                    />
                </Box>
                <Box layout={{ flexDirection: 'column', width: 180, flexShrink: 0, gap: 1 }}>
                    <Box layout={{ flex: 1, minHeight: 50, alignItems: 'center', justifyContent: 'center' }}>
                        {selectedGroup && (
                            <FurniPreview
                                key={selectedGroup.id}
                                group={selectedGroup}
                            />
                        )}
                    </Box>
                    <ThemeText
                        text={name}
                        textStyle="text-style-u-bold"
                        textOptions={{ wordWrap: true, wordWrapWidth: 180 }}
                        layout={{ width: 180 }}
                    />
                    <ThemeText
                        text={description}
                        textStyle="text-style-u-regular"
                        textOptions={{ wordWrap: true, wordWrapWidth: 180 }}
                        layout={{ width: 180, maxHeight: 45 }}
                    />
                    {selectedItem && !tradeRunning && (
                        <Button
                            variant="3"
                            textStyle="text-style-button-shiny-regular"
                            layout={{ width: 180, height: 22 }}
                        >
                            {t('inventory.furni.placetoroom')}
                        </Button>
                    )}
                    {selectedItem && tradeRunning && multiItemTrading && (
                        <TextInput
                            value={offerCount}
                            onChange={setOfferCount}
                            layout={{ width: 50, height: 19 }}
                        />
                    )}
                    {selectedItem && tradeRunning && (
                        <Button
                            variant="3"
                            textStyle="text-style-button-shiny-regular"
                            disabled={!canOffer}
                            onPointerTap={onOffer}
                            layout={{ width: 148, height: 22 }}
                        >
                            {t('inventory.trading.offer')}
                        </Button>
                    )}
                </Box>
            </Box>
        </Box>
    );
};
