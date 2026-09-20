/**
 * One furni of the inventory and the stacks the furni grid shows them in - Flash
 * `inventory/items/FurnitureItem` and `inventory/items/GroupItem` - with the `GroupItem` methods
 * the furni page and its commands read as plain functions over the store's data.
 *
 * A group keeps the type, category, stuff data and extra it was created with
 * (`FurniModel.createGroupItem`); its items are in the order they were pushed, as Flash's `Map`
 * keeps them. `GroupItem.selectedItemIndex` is not kept: it only picks the item the preview and
 * the room placement use, and a group's items all share the type `getItemsForTrade` filters on.
 */
import { IObjectData, MapDataType } from '@nitrodevco/nitro-api';
import { IFurniListAddOrUpdateFurni, ITradeRequirement, TradeRequirementNodeType, TradeRequirementType } from '@nitrodevco/nitro-packets';

/** `FurnitureItem`. */
export interface InventoryFurniItem {
    /** `id`: the strip id - what the inventory and trade packets address. */
    id: number;
    /** `ref`: the room item id - what a trade's item list and the locks name. */
    ref: number;
    typeId: number;
    category: number;
    isWallItem: boolean;
    stuffData: IObjectData;
    /** `extra`; 0 for a wall item, which the packet sends none for. */
    extra: number;
    /** `groupable`: `isGroupable && !isRented`. */
    groupable: boolean;
    tradeable: boolean;
    recyclable: boolean;
    sellable: boolean;
    isRented: boolean;
    flatId: number;
    /** `locked`: in a trade (`FurniModel.updateItemLocks`). */
    locked: boolean;
}

/** `GroupItem`. */
export interface InventoryFurniGroup {
    /** Stands in for the `GroupItem` instance: selection and React keys follow it. */
    id: number;
    typeId: number;
    category: number;
    stuffData: IObjectData;
    extra: number;
    items: InventoryFurniItem[];
    /** `hasUnseenItems`: the thumb's green background. */
    hasUnseenItems: boolean;
}

/** `FurnitureItem`'s categories the group rules name (`FurniModel.addOrUpdateItem`, `GroupItem.getTotalCount`). */
export const INVENTORY_FURNI_CATEGORY_POST_IT = 5;
export const INVENTORY_FURNI_CATEGORY_POSTER = 6;
export const INVENTORY_FURNI_CATEGORY_GUILD_FURNI = 17;
export const INVENTORY_FURNI_CATEGORY_RARE = 19;
export const INVENTORY_FURNI_CATEGORY_CHEST_BROWN = 24;
export const INVENTORY_FURNI_CATEGORY_CHEST_GOLD = 25;

/** `FurniModel.requestSelectedFurniToTrading`: no more own items than this in one trade. */
export const INVENTORY_TRADE_MAX_ITEMS = 1500;
/** `GroupItem.getMinimumItemsToShowCounter`. */
export const INVENTORY_FURNI_MIN_ITEMS_TO_SHOW_COUNTER = 2;

/** `new FurnitureItem(furniData)`, unlocked; `update` is the same read keeping the lock. */
export const createInventoryFurniItem = (data: IFurniListAddOrUpdateFurni, locked: boolean = false): InventoryFurniItem => ({
    id: data.itemId,
    ref: data.roomItemId,
    typeId: data.itemTypeId,
    category: data.category,
    isWallItem: data.isWallItem,
    stuffData: data.stuffData,
    extra: data.extra ?? 0,
    groupable: data.isGroupable && !data.isRented,
    tradeable: data.isTradeable,
    recyclable: data.isRecyclable,
    sellable: data.isSellable,
    isRented: !!data.isRented,
    flatId: data.flatId,
    locked,
});

/** `IStuffData.contentsCount`: only a map stuff data carries one (`MapStuffData`). */
export const getStuffDataContentsCount = (stuffData: IObjectData): number => {
    if (!(stuffData instanceof MapDataType)) return 0;

    const value = stuffData.getValue('contents_count');

    return value ? (parseInt(value, 10) || 0) : 0;
};

/** `IStuffData.chestName`. */
export const getStuffDataChestName = (stuffData: IObjectData): string => ((stuffData instanceof MapDataType) ? stuffData.chestName : '');

/** `GroupItem.peek`: the last item pushed. */
export const peekInventoryFurni = (group: InventoryFurniGroup): InventoryFurniItem | undefined => group.items[group.items.length - 1];

/** `GroupItem.isWallItem`. */
export const isInventoryFurniGroupWallItem = (group: InventoryFurniGroup): boolean => group.items[0]?.isWallItem ?? false;

/** `GroupItem.isGroupable`: an empty group takes anything. */
export const isInventoryFurniGroupGroupable = (group: InventoryFurniGroup): boolean => group.items[0]?.groupable ?? true;

/** `GroupItem.getTotalCount`: a post-it stack counts the sheets in its stuff data. */
export const getInventoryFurniTotalCount = (group: InventoryFurniGroup): number => {
    if (group.category !== INVENTORY_FURNI_CATEGORY_POST_IT) return group.items.length;

    return group.items.reduce((total, item) => total + (parseInt(item.stuffData.getLegacyString(), 10) || 0), 0);
};

/** `GroupItem.getUnlockedCount`. */
export const getInventoryFurniUnlockedCount = (group: InventoryFurniGroup): number => {
    if (group.category === INVENTORY_FURNI_CATEGORY_POST_IT) return getInventoryFurniTotalCount(group);

    return group.items.filter(item => !item.locked).length;
};

/** `GroupItem.getTradeableCount`. */
export const getInventoryFurniTradeableCount = (group: InventoryFurniGroup, unlockedOnly: boolean = true): number => group.items.filter(item => item.tradeable && (!unlockedOnly || !item.locked)).length;

/** `GroupItem.getOneForTrade` (without `selectedItemIndex`, see the docblock). */
export const getInventoryFurniOneForTrade = (group: InventoryFurniGroup): InventoryFurniItem | undefined => group.items.find(item => !item.locked && item.tradeable);

/** `GroupItem.getItemsForTrade`: up to `count` unlocked tradeable items of the first one's type. */
export const getInventoryFurniItemsForTrade = (group: InventoryFurniGroup, count: number): InventoryFurniItem[] => {
    const first = getInventoryFurniOneForTrade(group);

    if (!first) return [];

    const items: InventoryFurniItem[] = [];

    for (const item of group.items) {
        if (items.length >= count) break;

        if (!item.locked && item.tradeable && (item.typeId === first.typeId)) items.push(item);
    }

    return items;
};

/** `TradeRequirementWrapper.canOfferNormalFurni`: the type is one the requirement's "you give" nodes name. */
const canOfferNormalFurni = (requirement: ITradeRequirement, group: InventoryFurniGroup): boolean => {
    const youGiveRule = requirement.rules?.definition.youGiveRule;

    if (!youGiveRule) return false;

    const item = peekInventoryFurni(group);

    if (!item) return false;

    const types = youGiveRule.flatMap(rule => rule.nodes).flatMap(node => (((Number(node.type) === Number(TradeRequirementNodeType.Furni)) && node.itemType) ? [ node.itemType ] : []));

    if (!item.isWallItem) return types.some(type => !type.isWallItem && (type.typeId === item.typeId));

    const posterId = item.stuffData.getLegacyString();

    if ((item.category === INVENTORY_FURNI_CATEGORY_POSTER) && !types.some(type => type.isWallItem && (type.legacyPosterId.length > 0) && (type.legacyPosterId === posterId))) return false;

    return types.some(type => type.isWallItem && (type.typeId === item.typeId));
};

/** `TradeRequirementWrapper.canOfferCreditFurni`: a "you give" node asks for coins. */
const canOfferCreditFurni = (requirement: ITradeRequirement): boolean => !!requirement.rules?.definition.youGiveRule?.some(rule => rule.nodes.some(node => Number(node.type) === Number(TradeRequirementNodeType.Coin)));

/**
 * `WiredTradeRequirementsModel.canOfferFurni`: what the furni grid shows while a wired trade runs
 * (`FurniGridView.setFilterByWired`). `className` is the group's furni data class name, whose
 * `CF_` prefix marks credit furni.
 */
export const canOfferInventoryFurniToWiredTrade = (requirement: ITradeRequirement | undefined, group: InventoryFurniGroup, className: string): boolean => {
    if (!requirement) return true;

    if (getInventoryFurniTradeableCount(group, false) === 0) return false;

    const isCreditFurni = className.indexOf('CF_') === 0;

    switch (requirement.type) {
        case TradeRequirementType.AnyAll:
            return true;
        case TradeRequirementType.AnyFurni:
            return !isCreditFurni;
        case TradeRequirementType.AnyCoins:
            return isCreditFurni;
        case TradeRequirementType.Rules:
            return isCreditFurni ? canOfferCreditFurni(requirement) : canOfferNormalFurni(requirement, group);
        default:
            return true;
    }
};
