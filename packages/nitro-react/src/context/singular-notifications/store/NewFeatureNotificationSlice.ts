/**
 * `SingularNotificationController`'s `NewFeatureNotification`s: the promotions the hotel lists in
 * `notifications.new_feature.active`, each docked in the toolbar's extension column as
 * `new_feature_<key>` until its cancel link takes it down. The slice keeps the keys up, in the
 * order they were shown, and which of them were clicked open - that shows their cancel link.
 */
import { StateCreator } from 'zustand';

type State = {
    newFeatureNotifications: string[];
    /** The keys whose notification was opened (`eventHandler`'s `cancel_link_region.visible = true`). */
    newFeatureNotificationsOpened: string[];
};

type Actions = {
    /** `maybeShowNewFeatureNotificationByKey` with its condition met: `new NewFeatureNotification(.., key)`. */
    showNewFeatureNotification: (key: string) => void;
    /** A click on the notification or its button: its link opened, its cancel link shown. */
    markNewFeatureNotificationOpened: (key: string) => void;
    /** `NewFeatureNotification.dispose`: `detachExtension("new_feature_" + key)`. */
    closeNewFeatureNotification: (key: string) => void;
};

export const NewFeatureNotificationSliceInitialState: State = {
    newFeatureNotifications: [],
    newFeatureNotificationsOpened: [],
};

export type NewFeatureNotificationSlice = State & Actions;

export const createNewFeatureNotificationSlice: StateCreator<NewFeatureNotificationSlice, [], [], NewFeatureNotificationSlice> = set => ({
    ...NewFeatureNotificationSliceInitialState,
    showNewFeatureNotification: key => set(x => (x.newFeatureNotifications.includes(key) ? x : { newFeatureNotifications: [ ...x.newFeatureNotifications, key ] })),
    markNewFeatureNotificationOpened: key => set(x => (x.newFeatureNotificationsOpened.includes(key) ? x : { newFeatureNotificationsOpened: [ ...x.newFeatureNotificationsOpened, key ] })),
    closeNewFeatureNotification: key => set(x => ({ newFeatureNotifications: x.newFeatureNotifications.filter(entry => entry !== key) })),
});
