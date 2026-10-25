import { GetRoomEngine } from '@nitrodevco/nitro-renderer';

import { MARKETPLACE_FURNI_TYPE_FLOOR, MARKETPLACE_FURNI_TYPE_WALL, MarketplaceOfferData } from '#base/utils';

/**
 * The furni icon of a marketplace offer - `getFurniImageResult` of the two marketplace widgets and
 * `MarketplaceConfirmationDialog.setImage`: the room engine's floor icon, or the wall icon (with
 * the offer's extra data where the caller passes it, as the lists do) - '' for any other type.
 */
export const getMarketplaceOfferIconUrl = (offer: MarketplaceOfferData, withExtraData: boolean): string => {
    const engine = GetRoomEngine();

    if (offer.furniType === MARKETPLACE_FURNI_TYPE_FLOOR) return engine.getFurnitureFloorIconUrl(offer.furniId) ?? '';
    if (offer.furniType === MARKETPLACE_FURNI_TYPE_WALL) return engine.getFurnitureWallIconUrl(offer.furniId, (withExtraData && offer.extraData) ? offer.extraData : undefined) ?? '';

    return '';
};
