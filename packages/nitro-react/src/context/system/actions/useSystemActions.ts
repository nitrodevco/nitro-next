import { systemStore } from '../store/SystemStore';

const state = systemStore.getState();

/**
 * Zustand actions are created once and never change, so they are read off the store a single
 * time here rather than subscribed to: a component using these re-renders for nothing.
 */
const actions = {
    toggleWindow: state.toggleWindow,
    showWindow: state.showWindow,
    hideWindow: state.hideWindow,
    updateWindowParams: state.updateWindowParams,
    getLocalizationValue: state.getLocalizationValue,
    setLocalization: state.setLocalization,
    setLocalizationForFurniture: state.setLocalizationForFurniture,
    setLandingViewVisible: state.setLandingViewVisible,
    setHotelViewBackgrounds: state.setHotelViewBackgrounds,
    setHotelViewTimingCode: state.setHotelViewTimingCode,
    setHotelViewSecondsUntil: state.setHotelViewSecondsUntil,
    setHotelViewBonusRare: state.setHotelViewBonusRare,
    setHotelViewCommunityGoal: state.setHotelViewCommunityGoal,
    setHotelViewPromoArticles: state.setHotelViewPromoArticles,
    setHotelViewPromoArticleIndex: state.setHotelViewPromoArticleIndex,
    setToolbarWidths: state.setToolbarWidths,
    setHomeRoomId: state.setHomeRoomId,
    startRoomSession: state.startRoomSession,
    endRoomSession: state.endRoomSession,
    showConfirm: state.showConfirm,
    setToolbarIconNode: state.setToolbarIconNode,
    removeToolbarTransition: state.removeToolbarTransition,
    setToolbarIconBounce: state.setToolbarIconBounce,
};

export const useSystemActions = () => actions;
