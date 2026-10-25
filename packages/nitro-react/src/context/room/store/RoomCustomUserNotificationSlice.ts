import { StateCreator } from 'zustand';

/**
 * The window `CustomUserNotificationWidget` opens for a `CustomUserNotification` code
 * (`CustomUserNotificationWidgetHandler.onFurnitureUsageRequirementMissingMessage`: 1 costume hopper,
 * 2 VIP hopper, 3 VIP gate, 4 and 5 a talent show respect vote with no stage or no audience). One at
 * a time: `open` does nothing while one is up. A room widget, so it goes with the room.
 */
export type CustomUserNotificationType = 'costumehopper' | 'viphopper' | 'vipgate' | 'respectfailedstage' | 'respectfailedaudience';

const TYPES_BY_CODE: readonly CustomUserNotificationType[] = [ 'costumehopper', 'viphopper', 'vipgate', 'respectfailedstage', 'respectfailedaudience' ];

/** The window a code opens; none for a code the handler's switch does not know. */
export const customUserNotificationTypeOf = (code: number): CustomUserNotificationType | undefined => TYPES_BY_CODE[code - 1];

type State = {
    customUserNotification: CustomUserNotificationType | undefined;
};

type Actions = {
    /** `CustomUserNotificationWidget.open`: only while no window of the widget is up. */
    openCustomUserNotification: (type: CustomUserNotificationType) => void;
    /** `CustomUserNotificationWidget.close`. */
    closeCustomUserNotification: () => void;
};

export const RoomCustomUserNotificationSliceInitialState: State = {
    customUserNotification: undefined,
};

export type RoomCustomUserNotificationSlice = State & Actions;

export const createRoomCustomUserNotificationSlice: StateCreator<RoomCustomUserNotificationSlice, [], [], RoomCustomUserNotificationSlice> = set => ({
    ...RoomCustomUserNotificationSliceInitialState,
    openCustomUserNotification: type => set(x => (x.customUserNotification ? x : { customUserNotification: type })),
    closeCustomUserNotification: () => set({ customUserNotification: undefined }),
});
