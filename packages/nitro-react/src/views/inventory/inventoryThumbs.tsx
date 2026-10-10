/**
 * The inventory's two thumbs as bindings over their templates - what `GroupItem` sets on its
 * `inventory_thumb_xml` window and `CollectibleGroupedItem` on its `inventory_thumb_nft_xml` one.
 * The furni page shows them in its grid and the trade in its slots (`TradingView.fixItemWindow`
 * takes the same window), each adding what a press does.
 */
import { ITradeNftAsset } from '@nitrodevco/nitro-packets';
import { GetRoomEngine } from '@nitrodevco/nitro-renderer';

import {
    getInventoryFurniRecyclableCount, getInventoryFurniSecondsToExpiration, getInventoryFurniUnlockedCount, getStuffDataContentsCount, INVENTORY_FURNI_CATEGORY_CHEST_BROWN, INVENTORY_FURNI_CATEGORY_CHEST_GOLD, INVENTORY_FURNI_MIN_ITEMS_TO_SHOW_COUNTER, InventoryFurniGroup,
    isInventoryFurniGroupWallItem,
} from '#base/context/inventory';
import { LayoutImage, TemplateBindings } from '#base/theme';
import { LimitedItemGridOverlayView } from '#base/views/shared/LimitedItemGridOverlayView';
import { RarityItemGridOverlayView } from '#base/views/shared/RarityItemGridOverlayView';

import { ChestItemGridOverlayView, ChestOverlayColor } from './ChestItemGridOverlayView';
import { InventoryNftIcon } from './InventoryNftIcon';
import { inventoryThumbLook } from './inventoryPage';

/** `updateItemCountVisual` / `unlockedAssetCountChanged`: the icon's blend with nothing unlocked. */
const LOCKED_ALPHA = 0.2;

/** `updateRentStateVisual`'s `purchase.rent.warning_duration_seconds` when the config has none. */
export const DEFAULT_RENT_WARNING_SECONDS = 172800;

/** `CollectibleGroupedItem.unlockedAssetCountChanged`: the count shows from 2 up. */
const MIN_NFT_ITEMS_TO_SHOW_COUNTER = 2;

/** `GroupItem.initImage`: the wall item's icon with its stuff data, or the floor item's. */
export const getInventoryFurniIconUrl = (group: InventoryFurniGroup): string => {
    const engine = GetRoomEngine();

    return (isInventoryFurniGroupWallItem(group) ? engine.getFurnitureWallIconUrl(group.typeId, group.stuffData.getLegacyString() || undefined) : engine.getFurnitureFloorIconUrl(group.typeId)) ?? '';
};

/** `updateItemImageVisual`'s chest: gold for category 25, brown for 24. */
const chestColorOf = (group: InventoryFurniGroup): ChestOverlayColor | undefined => {
    if (group.category === INVENTORY_FURNI_CATEGORY_CHEST_GOLD) return 'gold';
    if (group.category === INVENTORY_FURNI_CATEGORY_CHEST_BROWN) return 'brown';

    return undefined;
};

export interface InventoryFurniThumbState {
    selected: boolean;
    /** `GroupItem.hasUnseenItems`. */
    unseen: boolean;
    /** `showRecyclable`: the recycler runs. */
    showRecyclable: boolean;
    /** `purchase.rent.warning_duration_seconds`: a started rent with less left than this shows as ending. */
    rentWarningSeconds?: number;
}

/**
 * `updateRentStateVisual`: a rented group's mark - not started, ending within the warning time,
 * or started; nothing for a group that is not rented (`GroupItem.isRented` reads its first item).
 */
const rentStateAsset = (group: InventoryFurniGroup, warningSeconds: number): string | undefined => {
    const item = group.items[0];

    if (!item?.isRented) return undefined;

    if (!item.hasRentPeriodStarted) return 'habbo-window-manager-com-inventory_thumb_rent_not_started';

    return (getInventoryFurniSecondsToExpiration(item) < warningSeconds) ? 'habbo-window-manager-com-inventory_thumb_rent_ending' : 'habbo-window-manager-com-inventory_thumb_rent_started';
};

/**
 * `GroupItem.initWindow`'s visuals: `BG_COLOR` and the `outline`; the icon, faded with nothing
 * unlocked, and the unlocked count from 2 up (`updateItemCountVisual`); the recycle mark
 * (`updateRecycleStatusVisual`); the rent mark (`updateRentStateVisual`); the first plaque that applies - a limited edition's, a rarity's, a
 * chest's (`updateItemImageVisual`).
 */
export const inventoryFurniThumbBindings = (group: InventoryFurniGroup, { selected, unseen, showRecyclable, rentWarningSeconds = DEFAULT_RENT_WARNING_SECONDS }: InventoryFurniThumbState): TemplateBindings => {
    const unlocked = getInventoryFurniUnlockedCount(group);
    const rentState = rentStateAsset(group, rentWarningSeconds);
    const unique = group.stuffData.uniqueNumber > 0;
    const rare = !unique && (group.stuffData.rarityLevel >= 0);
    const chest = (!unique && !rare) ? chestColorOf(group) : undefined;

    return {
        ...inventoryThumbLook(selected, unseen),
        bitmap: { asset: getInventoryFurniIconUrl(group), alpha: (unlocked <= 0) ? LOCKED_ALPHA : 1 },
        number_container: { visible: unlocked >= INVENTORY_FURNI_MIN_ITEMS_TO_SHOW_COUNTER },
        number: { caption: String(unlocked) },
        recyclable_container: { visible: showRecyclable && (getInventoryFurniRecyclableCount(group) > 0) },
        rent_state: rentState ? { visible: true, asset: rentState } : { visible: false },
        unique_item_background_bitmap: { visible: unique },
        unique_item_overlay_container: unique ? { visible: true, children: <LimitedItemGridOverlayView serialNumber={group.stuffData.uniqueNumber} /> } : { visible: false },
        rarity_item_overlay_container: rare ? { visible: true, children: <RarityItemGridOverlayView rarityLevel={group.stuffData.rarityLevel} /> } : { visible: false },
        chest_overlay_container: chest
            ? {
                    visible: true,
                    children: (
                        <ChestItemGridOverlayView
                            contentsCount={getStuffDataContentsCount(group.stuffData)}
                            color={chest}
                        />
                    ),
                }
            : { visible: false },
        chest_background_bitmap: chest ? { visible: true, asset: LayoutImage(`habbo-window-manager-com/chest_overlay_${chest}_background.png`) } : { visible: false },
    };
};

/**
 * `CollectibleGroupedItem`'s visuals: `BG_COLOR` and the `outline` (`isSelected`), the product in
 * `nft_icon` (`initializeImage`), faded with no copy unlocked, and the unlocked count from 2 up
 * (`unlockedAssetCountChanged`).
 */
export const inventoryNftThumbBindings = (asset: ITradeNftAsset, unlockedCount: number, selected: boolean): TemplateBindings => ({
    ...inventoryThumbLook(selected, false),
    nft_icon: { alpha: (unlockedCount === 0) ? LOCKED_ALPHA : 1, children: <InventoryNftIcon asset={asset} /> },
    number_container: { visible: unlockedCount >= MIN_NFT_ITEMS_TO_SHOW_COUNTER },
    number: { caption: String(unlockedCount) },
});
