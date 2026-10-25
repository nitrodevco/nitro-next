/**
 * What the notification windows' own buttons do: close a MOTD window, and take the club gift
 * notification down (with or without "not now"). Showing them, and taking the safety lock
 * notification down, is the packet handlers' (`registerSingularNotificationHandlers`). Read off
 * the store once: a component using these re-renders for nothing.
 */
import { singularNotificationStore } from '../store/SingularNotificationStore';

const state = singularNotificationStore.getState();

const actions = {
    closeMotdNotification: state.closeMotdNotification,
    closeEpicPopup: state.closeEpicPopup,
    closeClubGiftNotification: state.closeClubGiftNotification,
    attachNewFeatureNotification: state.attachNewFeatureNotification,
    markNewFeatureNotificationOpened: state.markNewFeatureNotificationOpened,
    closeNewFeatureNotification: state.closeNewFeatureNotification,
    clearNewFeatureClaim: state.clearNewFeatureClaim,
};

export const useSingularNotificationActions = () => actions;
