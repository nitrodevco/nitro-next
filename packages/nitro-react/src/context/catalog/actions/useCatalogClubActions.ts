import { useCatalogStoreApi } from '../useCatalogStoreApi';

/**
 * `CatalogClubSlice`'s actions, read off the store once (they never change), so a component using
 * them re-renders for nothing - the club dialogs close themselves, the club gift list opens its
 * confirmation.
 */
export const useCatalogClubActions = () => {
    const state = useCatalogStoreApi().getState();

    return {
        setClubOffers: state.setClubOffers,
        setClubBuyConfirmation: state.setClubBuyConfirmation,
        setClubExtendOffer: state.setClubExtendOffer,
        setClubGiftInfo: state.setClubGiftInfo,
        consumeClubGift: state.consumeClubGift,
        setClubGiftConfirmation: state.setClubGiftConfirmation,
        setVipBenefitsVisible: state.setVipBenefitsVisible,
        setVipPurchasePageName: state.setVipPurchasePageName,
        setClubKickbackData: state.setClubKickbackData,
        setClubCenterGiftsAvailable: state.setClubCenterGiftsAvailable,
        setClubBadgeId: state.setClubBadgeId,
        setClubCenterUpdating: state.setClubCenterUpdating,
    };
};
