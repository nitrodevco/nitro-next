/**
 * `SystemStore`'s actions across its slices other than the windows and dialogs (`useWindowActions`
 * has those): setting the localization, the hotel view, the toolbar and the room session requests.
 * Read off the store once: a component using these re-renders for nothing. Looking a text up is
 * `useTranslation`.
 */
import { systemStore } from '../store/SystemStore';

const state = systemStore.getState();

const actions = {
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
    setToolbarMenu: state.setToolbarMenu,
    setHomeRoomId: state.setHomeRoomId,
    startRoomSession: state.startRoomSession,
    endRoomSession: state.endRoomSession,
    setToolbarIconNode: state.setToolbarIconNode,
    removeToolbarTransition: state.removeToolbarTransition,
    setToolbarIconBounce: state.setToolbarIconBounce,
};

export const useSystemActions = () => actions;
