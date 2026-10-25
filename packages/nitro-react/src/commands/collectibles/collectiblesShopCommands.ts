/**
 * The collectibles hub's shop tab - Flash `tabs/ShopTab`.
 * Part of Flash `catalog/collectibles/CollectiblesController` - see `collectiblesCommands`.
 */
import { GetNftStoreOffersComposer, INftStoreOffer } from '@nitrodevco/nitro-packets';

import { COLLECTIBLE_PREVIEW_NONE, COLLECTIBLE_PRODUCT_TYPE_CLOTHING, COLLECTIBLE_PRODUCT_TYPE_FLOOR, COLLECTIBLE_PRODUCT_TYPE_PET, COLLECTIBLE_PRODUCT_TYPE_WALL, collectiblesStore, wrapBaseItem } from '#base/context/collectibles';
import { Send } from '#base/context/communication';
import { translate as t } from '#base/context/system';
import { userStore } from '#base/context/user';

import { showNotEnoughActivityPointsAlert } from '../catalog/catalogClubCommands';
import { controllerPreviewImage, getCollectibleProductName } from './collectiblesCommands';
import { showCollectiblesPurchaseConfirmation } from './collectiblesPurchaseCommands';

/** `getNavigationCategory`. */
const getShopNavigationCategory = (productTypeId: number): string => {
    switch (productTypeId) {
        case COLLECTIBLE_PRODUCT_TYPE_WALL:
        case COLLECTIBLE_PRODUCT_TYPE_FLOOR: return 'shop.furni.title';
        case COLLECTIBLE_PRODUCT_TYPE_PET: return 'shop.pets.title';
        case COLLECTIBLE_PRODUCT_TYPE_CLOTHING: return 'shop.clothes.title';
        default: return 'product.type.other';
    }
};

/** `requestNftStoreOffers`. */
export const requestNftStoreOffers = (send: Send) => {
    collectiblesStore.getState().patchCollectiblesShop({ shopReady: false, shopActiveCategory: null, shopCategories: [], shopWaiting: true });
    send(new GetNftStoreOffersComposer({}));
};

/** `onNftStoreOffers`: taken once - the offers are filed under their localized category, and the first category opened. */
export const onNftStoreOffers = (send: Send, offers: INftStoreOffer[]) => {
    const { shopWaiting, shopCategories, shopOffersByCategory, patchCollectiblesShop } = collectiblesStore.getState();

    if (!shopWaiting || (shopCategories.length !== 0)) return;

    // `createNavigationNodes`.
    const categories = [ ...shopCategories ];
    const byCategory: Record<string, INftStoreOffer[]> = { ...shopOffersByCategory };

    for (const offer of offers) {
        if (!offer) continue;

        const category = t(getShopNavigationCategory(offer.productInfo.productTypeId));

        if (!Object.prototype.hasOwnProperty.call(byCategory, category)) {
            byCategory[category] = [];
            categories.push(category);
        }

        byCategory[category] = [ ...byCategory[category], offer ];
    }

    patchCollectiblesShop({ shopWaiting: false, shopCategories: categories, shopOffersByCategory: byCategory });

    if (categories.length > 0) activateShopCategory(send, categories[0]);

    patchCollectiblesShop({ shopReady: true });
};

/** `activateCategory` + `populateGridItems`: the category's offers, the first selected. */
export const activateShopCategory = (send: Send, category: string) => {
    const { shopActiveCategory, shopOffersByCategory, patchCollectiblesShop } = collectiblesStore.getState();

    if (shopActiveCategory === category) return;

    patchCollectiblesShop({ shopActiveCategory: category, shopSelectedIndex: -1 });

    if (!(shopOffersByCategory[category]?.length > 0)) return;

    selectShopItem(send, 0);
};

/** `selectItem` + `initItemPreview`: the offer's preview, name, price and mint count; buyable while there are mints left. */
export const selectShopItem = (send: Send, index: number) => {
    const { shopActiveCategory, shopOffersByCategory, patchCollectiblesShop } = collectiblesStore.getState();
    const offer = shopActiveCategory ? shopOffersByCategory[shopActiveCategory]?.[index] : undefined;

    patchCollectiblesShop({ shopSelectedIndex: index });

    if (!offer) return;

    const info = wrapBaseItem(offer.productInfo);

    patchCollectiblesShop({ shopPreview: COLLECTIBLE_PREVIEW_NONE });

    const preview = controllerPreviewImage(send, info);

    patchCollectiblesShop({
        shopPreview: preview,
        shopPreviewInfo: {
            productName: getCollectibleProductName(info),
            price: offer.emeraldPrice.toString(),
            mintLimitVisible: offer.mintLimit > 0,
            mintLimitText: `${offer.mintedCount}/${offer.mintLimit}`,
            buyEnabled: (offer.mintedCount < offer.mintLimit) || (offer.mintLimit === -1),
        },
    });
};

/** `onClickBuy`: short of emeralds, the "not enough" alert for currency 1001; else the confirmation, for the active wallet. */
export const buySelectedShopOffer = () => {
    const { shopActiveCategory, shopOffersByCategory, shopSelectedIndex, activeWallet } = collectiblesStore.getState();
    const offer = shopActiveCategory ? shopOffersByCategory[shopActiveCategory]?.[shopSelectedIndex] : undefined;

    if (!offer) return;

    if (userStore.getState().emeralds < offer.emeraldPrice) {
        showNotEnoughActivityPointsAlert(1001);

        return;
    }

    showCollectiblesPurchaseConfirmation({ kind: 'nft', offer }, activeWallet ?? '');
};
