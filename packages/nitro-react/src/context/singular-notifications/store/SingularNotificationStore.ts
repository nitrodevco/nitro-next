/**
 * The notification windows of Flash's `notifications/singular` package that are windows rather
 * than bubbles: the message-of-the-day windows (`MOTDNotification`) and the club gift and safety
 * lock notifications `SingularNotificationController` docks in the toolbar's extension column.
 * The bubble stack itself is `notificationStore`. An app-wide singleton: the packets that raise
 * these arrive whatever is open, and the extension column reads them from here. The same
 * controller's `NewFeatureNotification`s (the `notifications.new_feature.*` promotions) are here too.
 */
import { createStore } from 'zustand';

import { createMotdNotificationSlice, MotdNotificationSlice } from './MotdNotificationSlice';
import { createNewFeatureNotificationSlice, NewFeatureNotificationSlice } from './NewFeatureNotificationSlice';
import { createToolbarNotificationSlice, ToolbarNotificationSlice } from './ToolbarNotificationSlice';

export type SingularNotificationStore = MotdNotificationSlice & ToolbarNotificationSlice & NewFeatureNotificationSlice;

export const createSingularNotificationStore = () => createStore<SingularNotificationStore>()((set, get, store) => ({
    ...createMotdNotificationSlice(set, get, store),
    ...createToolbarNotificationSlice(set, get, store),
    ...createNewFeatureNotificationSlice(set, get, store),
}));

export const singularNotificationStore = createSingularNotificationStore();
