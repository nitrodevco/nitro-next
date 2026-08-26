import { INotificationAddOptions, INotificationItem, NotificationPhaseEnum } from "@nitrodevco/nitro-api";
import type { StateCreator } from "zustand";

import { getNotificationHeight, isKnownNotificationStyle } from "#base/views/notification-center/NotificationViewConfigs";

type State = {
    notifications: INotificationItem[];
    queue: INotificationItem[];
    notificationsDisabled: boolean;
    notificationContainerHeight: number;
}

type Actions = {
    addNotification: (content: string, styleName: string, options?: INotificationAddOptions) => number;
    dequeueNotifications: () => void;
    setNotificationPhase: (id: number, phase: NotificationPhaseEnum) => void;
    setNotificationHovering: (id: number, hovering: boolean) => void;
    expireNotification: (id: number) => void;
    clickNotification: (id: number, slideAway: boolean) => void;
    removeNotification: (id: number) => void;
    setNotificationsDisabled: (notificationsDisabled: boolean) => void;
    setNotificationContainerHeight: (notificationContainerHeight: number) => void;
}

export const NotificationItemsSliceInitialState: State = {
    notifications: [],
    queue: [],
    notificationsDisabled: false,
    notificationContainerHeight: 0
};

export type NotificationItemsSlice = State & Actions;

let nextNotificationId = 1;

const hasSpace = (notifications: readonly INotificationItem[], containerHeight: number) => {
    const used = notifications.reduce((total, item) => total + getNotificationHeight(item.styleName) + 4, 4);

    return (used + 70) < containerHeight;
}

export const createNotificationItemsSlice: StateCreator<NotificationItemsSlice, [], [], NotificationItemsSlice> = (set, get) => ({
    ...NotificationItemsSliceInitialState,
    addNotification: (content: string, styleName: string, options: INotificationAddOptions = {}) => {
        if (get().notificationsDisabled) return 0;

        if (!isKnownNotificationStyle(styleName)) return 0;

        const useStyleConfig = !options.iconAssetUri?.length;

        const notification: INotificationItem = {
            id: nextNotificationId++,
            styleName,
            content,
            icon: options.icon ?? options.iconAssetUri ?? null,
            badgeId: options.badgeId ?? null,
            internalLink: options.internalLink ?? null,
            useStyleConfig,
            phase: NotificationPhaseEnum.Idle,
            hovering: false,
            expired: false
        };

        set(x => ({ queue: [...x.queue, notification] }));

        get().dequeueNotifications();

        return get().queue.length;
    },
    dequeueNotifications: () => set(x => {
        if (!x.queue.length) return x;

        const notifications = [...x.notifications];
        const queue = [...x.queue];

        while (queue.length && hasSpace(notifications, x.notificationContainerHeight)) {
            const next = queue.shift();

            if (!next) break;

            notifications.push({ ...next, phase: NotificationPhaseEnum.FadeIn });
        }

        if (notifications.length === x.notifications.length) return x;

        return { notifications, queue };
    }),
    setNotificationPhase: (id: number, phase: NotificationPhaseEnum) => set(x => {
        const index = x.notifications.findIndex(item => item.id === id);

        if (index === -1 || x.notifications[index].phase === phase) return x;

        const notifications = [...x.notifications];

        notifications[index] = { ...notifications[index], phase };

        return { notifications };
    }),
    setNotificationHovering: (id: number, hovering: boolean) => set(x => {
        const index = x.notifications.findIndex(item => item.id === id);

        if (index === -1 || x.notifications[index].hovering === hovering) return x;

        const notifications = [...x.notifications];
        const current = notifications[index];
        const shouldFadeOut = !hovering && current.expired && current.phase === NotificationPhaseEnum.Display;

        notifications[index] = {
            ...current,
            hovering,
            phase: shouldFadeOut ? NotificationPhaseEnum.FadeOut : current.phase
        };

        return { notifications };
    }),
    expireNotification: (id: number) => set(x => {
        const index = x.notifications.findIndex(item => item.id === id);

        if (index === -1) return x;

        const current = x.notifications[index];

        if (current.phase !== NotificationPhaseEnum.Display) return x;

        const notifications = [...x.notifications];

        notifications[index] = current.hovering
            ? { ...current, expired: true }
            : { ...current, expired: true, phase: NotificationPhaseEnum.FadeOut };

        return { notifications };
    }),
    clickNotification: (id: number, slideAway: boolean) => {
        const current = get().notifications.find(item => item.id === id);

        if (!current) return;

        get().setNotificationPhase(id, slideAway ? NotificationPhaseEnum.SwipeOut : NotificationPhaseEnum.FadeOut);
    },
    removeNotification: (id: number) => {
        if (!get().notifications.some(item => item.id === id)) return;

        set(x => ({ notifications: x.notifications.filter(item => item.id !== id) }));

        get().dequeueNotifications();
    },
    setNotificationsDisabled: (notificationsDisabled: boolean) => set({ notificationsDisabled }),
    setNotificationContainerHeight: (notificationContainerHeight: number) => {
        if (get().notificationContainerHeight === notificationContainerHeight) return;

        set({ notificationContainerHeight });

        get().dequeueNotifications();
    }
});
