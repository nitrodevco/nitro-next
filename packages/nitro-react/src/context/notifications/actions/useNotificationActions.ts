import { notificationStore } from '../store';

const state = notificationStore.getState();

/**
 * Zustand actions are created once and never change, so they are read off the store a single
 * time here rather than subscribed to: a component using these re-renders for nothing.
 *
 * `addNotification` and `removeNotificationById` are Flash's `IHabboNotifications.addItem` and
 * `removeNotificationById`, for any feature that raises a bubble; the rest is the notifications
 * view reporting back.
 */
const actions = {
    addNotification: state.addNotification,
    removeNotificationById: state.removeNotificationById,
    showNextNotification: state.showNextNotification,
    dismissNotification: state.dismissNotification,
    finishNotification: state.finishNotification,
    setExtensionHeight: state.setExtensionHeight,
    setNotificationsDisabled: state.setNotificationsDisabled,
};

export const useNotificationActions = () => actions;
