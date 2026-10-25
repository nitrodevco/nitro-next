/**
 * What the wired trading windows show for a `ChestItemType` (a furni type, a wall item, or a
 * legacy poster): its icon - Flash's `product_icon` widget fed a `ChestItemTypeRenderableWrapper`
 * - its name (`FurniChestView.getChestBasedItemName`) and the furni data behind it.
 */
import { IChestItemType, IFurnitureData } from '@nitrodevco/nitro-api';
import { GetRoomEngine } from '@nitrodevco/nitro-renderer';

import { useFurnitureData, useSystemStore, useTranslation } from '#base/context/system';
import { getFurnitureData, getWiredChestItemName } from '#base/utils';

/** `ItemTypeSelectionPreset.furniDataForSelectedItem`. */
export const useWiredChestItemFurniData = (type: IChestItemType | undefined): IFurnitureData | undefined => useFurnitureData(type?.typeId, type?.isWallItem ?? false);

/** The icon's URL, `''` for none: a floor type's own icon, a wall type's with the poster id as its extra. */
export const getWiredChestItemIconUrl = (type: IChestItemType | undefined): string => {
    if (!type) return '';

    const engine = GetRoomEngine();

    return (type.isWallItem ? engine.getFurnitureWallIconUrl(type.typeId, type.legacyPosterId || undefined) : engine.getFurnitureFloorIconUrl(type.typeId)) ?? '';
};

/** `getWiredChestItemIconUrl`, for a component that shows one item. */
export const useWiredChestItemIconUrl = (type: IChestItemType | undefined): string => getWiredChestItemIconUrl(type);

/** `getChestBasedItemName` as a function, for a list of items (the furni chest's search). */
export const useWiredChestItemNameResolver = (): ((type: IChestItemType, specialType: number) => string) => {
    const t = useTranslation();
    const floorItems = useSystemStore(x => x.floorItems);
    const wallItems = useSystemStore(x => x.wallItems);

    return (type, specialType) => getWiredChestItemName(type, specialType, key => t(key, key), (isWallItem, typeId) => getFurnitureData({ floorItems, wallItems }, typeId, isWallItem)?.localizedName);
};

/** `getChestBasedItemName`. */
export const useWiredChestItemName = (type: IChestItemType | undefined, specialType: number): string => {
    const resolve = useWiredChestItemNameResolver();

    return type ? resolve(type, specialType) : '';
};
