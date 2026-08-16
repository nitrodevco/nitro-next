import { FurnitureTypeEnum, IProduct } from "@nitrodevco/nitro-api";
import { GetRoomEngine } from "@nitrodevco/nitro-renderer";

import { useConfigValue } from "#base/context";

export const useProductIconUrl = (product: IProduct) => {
    const catalogAssetUrl = useConfigValue<string>('catalog.asset.url') ?? '';

    switch (product.productType) {
        case FurnitureTypeEnum.Floor:
            return GetRoomEngine().getFurnitureFloorIconUrl(product.classId);
        case FurnitureTypeEnum.Wall: {
            let iconName = '';

            switch (product.furnitureData.className) {
                case 'floor':
                    iconName = ['th', product.furnitureData.className, product.extraParam].join('_');
                    break;
                case 'wallpaper':
                    iconName = ['th', 'wall', product.extraParam].join('_');
                    break;
                case 'landscape':
                    iconName = ['th', product.furnitureData.className, (product.extraParam || '').replace('.', '_'), '001'].join('_');
                    break;
            }

            if (iconName.length) return `${catalogAssetUrl}/${iconName}.png`;

            return GetRoomEngine().getFurnitureWallIconUrl(product.classId, product.extraParam);
        }
        case FurnitureTypeEnum.Effect:
            return '';
        case FurnitureTypeEnum.HabboClub:
            return '';
        case FurnitureTypeEnum.Badge:
            return '';
        case FurnitureTypeEnum.Robot:
            return '';
    }

    return '';
}