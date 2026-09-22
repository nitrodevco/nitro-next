/**
 * The pictures `Product.initIcon` takes by name or url rather than rendering - shared by the
 * product icon (`CatalogProductIconView`) and the purchase confirmation's picture
 * (`CatalogOfferImageView`).
 */
import { FurnitureTypeEnum, IProduct } from '@nitrodevco/nitro-api';
import { GetRoomEngine } from '@nitrodevco/nitro-renderer';

import { LayoutImage } from '#base/theme';

/** `getSubscriptionProductIcon`: the catalogue's `icon_hc`. */
export const SUBSCRIPTION_PRODUCT_ICON = LayoutImage('catalog/icon_hc.png');

/** `getPixelEffectIcon`: the effect's `fx_icon_<id>` (the inventory's library, here the `effect-icons` bundle). */
export const pixelEffectIcon = (classId: number) => LayoutImage(`effect-icons/fx_icon_${classId}.png`);

/** `Product.initIcon`'s `i` case: the catalogue picture a floor, wallpaper or landscape product shows, or `undefined` for an engine icon. */
const wallProductPictureName = (className: string, extraParam: string) => {
    switch (className) {
        case 'floor':
            return [ 'th', className, extraParam ].join('_');
        case 'wallpaper':
            return [ 'th', 'wall', extraParam ].join('_');
        case 'landscape':
            return [ 'th', className, (extraParam || '').replace('.', '_'), '001' ].join('_');
    }

    return undefined;
};

/** The url of a floor or wall product's icon (`getFurnitureIcon` / `getWallItemIcon`, or the `th_*` catalogue picture). */
export const getFurniProductIconUrl = (product: IProduct, catalogAssetUrl: string) => {
    switch (product.productType) {
        case FurnitureTypeEnum.Floor:
            return GetRoomEngine().getFurnitureFloorIconUrl(product.classId);
        case FurnitureTypeEnum.Wall: {
            const picture = product.furnitureData ? wallProductPictureName(product.furnitureData.className, product.extraParam) : undefined;

            if (picture) return `${catalogAssetUrl}/${picture}.png`;

            return GetRoomEngine().getFurnitureWallIconUrl(product.classId, product.extraParam);
        }
    }

    return '';
};
