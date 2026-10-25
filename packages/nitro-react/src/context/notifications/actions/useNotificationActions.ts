/**
 * The notification store's actions. Zustand actions are created once and never change, so they are
 * read off the store a single time here rather than subscribed to: a component using these
 * re-renders for nothing.
 *
 * `addNotification` and `removeNotificationById` are Flash's `IHabboNotifications.addItem` and
 * `removeNotificationById`, for any feature that raises a bubble; the popup pair opens and closes
 * a `NotificationPopup` (open one through `showNotification` in `commands/notifications/notificationCommands`);
 * the rest is the notifications view reporting back.
 */
import { notificationStore } from '../store';

const state = notificationStore.getState();

const actions = {
    addNotification: state.addNotification,
    removeNotificationById: state.removeNotificationById,
    showNextNotification: state.showNextNotification,
    dismissNotification: state.dismissNotification,
    finishNotification: state.finishNotification,
    setExtensionHeight: state.setExtensionHeight,
    setNotificationsDisabled: state.setNotificationsDisabled,
    addNotificationPopup: state.addNotificationPopup,
    removeNotificationPopup: state.removeNotificationPopup,
};

export const useNotificationActions = () => actions;
