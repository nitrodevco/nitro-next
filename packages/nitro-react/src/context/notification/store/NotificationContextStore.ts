import { createStore } from "zustand";

import type { NotificationExtensionsSlice } from "./NotificationExtensionsSlice";
import { createNotificationExtensionsSlice } from "./NotificationExtensionsSlice";
import type { NotificationItemsSlice } from "./NotificationItemsSlice";
import { createNotificationItemsSlice } from "./NotificationItemsSlice";

export type NotificationContextStore = NotificationItemsSlice & NotificationExtensionsSlice;

export const createNotificationContextStore = () => createStore<NotificationContextStore>()((set, get, store) => ({
    ...createNotificationItemsSlice(set, get, store),
    ...createNotificationExtensionsSlice(set, get, store)
}));
