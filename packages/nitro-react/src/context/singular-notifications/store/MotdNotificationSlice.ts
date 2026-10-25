/**
 * The message-of-the-day windows - Flash's `notifications/singular/MOTDNotification`, which
 * `IncomingMessages.onMOTD` builds anew for every `MOTDNotificationEvent` with messages in it,
 * never reusing one that is up. Each is its own window until its `close` button or header close
 * disposes it, so the slice keeps a list.
 */
import { StateCreator } from 'zustand';

/** One `MOTDNotification`: the messages of the packet that built it. */
export interface MotdNotification {
    id: number;
    messages: string[];
}

type State = {
    /** Every `MOTDNotification` that is up, oldest first. */
    motdNotifications: MotdNotification[];
};

type Actions = {
    /** `new MOTDNotification(messages, ...)`. */
    showMotdNotification: (messages: string[]) => void;
    /** `MOTDNotification.dispose`: its `close` button or its header close. */
    closeMotdNotification: (id: number) => void;
};

export const MotdNotificationSliceInitialState: State = {
    motdNotifications: [],
};

export type MotdNotificationSlice = State & Actions;

let nextMotdNotificationId = 1;

export const createMotdNotificationSlice: StateCreator<MotdNotificationSlice, [], [], MotdNotificationSlice> = set => ({
    ...MotdNotificationSliceInitialState,
    showMotdNotification: messages => set(x => ({ motdNotifications: [ ...x.motdNotifications, { id: nextMotdNotificationId++, messages } ] })),
    closeMotdNotification: id => set(x => ({ motdNotifications: x.motdNotifications.filter(notification => notification.id !== id) })),
});
