import { singularNotificationStore } from '../store/SingularNotificationStore';

const state = singularNotificationStore.getState();

/**
 * What the notification windows' own buttons do: close a MOTD window, and take the club gift
 * notification down (with or without "not now"). Showing them, and taking the safety lock
 * notification down, is the packet handlers' (`registerSingularNotificationHandlers`). Read off
 * the store once: a component using these re-renders for nothing.
 */
const actions = {
    closeMotdNotification: state.closeMotdNotification,
    closeClubGiftNotification: state.closeClubGiftNotification,
    markNewFeatureNotificationOpened: state.markNewFeatureNotificationOpened,
    closeNewFeatureNotification: state.closeNewFeatureNotification,
};

export const useSingularNotificationActions = () => actions;
