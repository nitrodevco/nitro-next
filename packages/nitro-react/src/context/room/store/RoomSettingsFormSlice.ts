import { IFlatController, RoomSettingsDataEventMessageType } from '@nitrodevco/nitro-packets';
import { StateCreator } from 'zustand';

/**
 * The room settings as they are being edited: the server's snapshot with whatever has been
 * changed on top, plus whatever it said about the last attempt to save.
 *
 * This is not the live room's settings (`RoomSettingsSlice` holds those, driven by the room
 * entry) - it is the form behind the settings window, loaded on demand.
 */
type State = {
    roomSettingsForm: RoomSettingsDataEventMessageType | undefined;
    /** A localization key for whatever the server refused, or nothing. */
    roomSettingsFormError: string | undefined;
    /** Set while a save is in flight, so the window can say so and refuse a second one. */
    roomSettingsFormSaving: boolean;
    /** Who holds rights in the room, from `FlatControllersEventMessage`. */
    roomControllers: IFlatController[];
    /** Who is banned from it, from `BannedUsersFromRoomEventMessage`. */
    roomBannedUsers: IFlatController[];
};

type Actions = {
    setRoomSettingsForm: (form: RoomSettingsDataEventMessageType | undefined) => void;
    updateRoomSettingsForm: (changes: Partial<RoomSettingsDataEventMessageType>) => void;
    setRoomSettingsFormError: (error: string | undefined) => void;
    setRoomSettingsFormSaving: (saving: boolean) => void;
    setRoomControllers: (roomControllers: IFlatController[]) => void;
    addRoomController: (controller: IFlatController) => void;
    removeRoomController: (userId: number) => void;
    setRoomBannedUsers: (roomBannedUsers: IFlatController[]) => void;
    removeRoomBannedUser: (userId: number) => void;
};

export const RoomSettingsFormSliceInitialState: State = {
    roomSettingsForm: undefined,
    roomSettingsFormError: undefined,
    roomSettingsFormSaving: false,
    roomControllers: [],
    roomBannedUsers: [],
};

export type RoomSettingsFormSlice = State & Actions;

export const createRoomSettingsFormSlice: StateCreator<RoomSettingsFormSlice, [], [], RoomSettingsFormSlice> = set => ({
    ...RoomSettingsFormSliceInitialState,
    setRoomSettingsForm: roomSettingsForm => set({ roomSettingsForm, roomSettingsFormError: undefined, roomSettingsFormSaving: false }),
    updateRoomSettingsForm: changes => set(x => (x.roomSettingsForm
        ? { roomSettingsForm: { ...x.roomSettingsForm, ...changes } }
        : x)),
    setRoomSettingsFormError: roomSettingsFormError => set({ roomSettingsFormError, roomSettingsFormSaving: false }),
    setRoomSettingsFormSaving: roomSettingsFormSaving => set({ roomSettingsFormSaving }),
    setRoomControllers: roomControllers => set({ roomControllers }),
    addRoomController: controller => set(x => (x.roomControllers.some(other => other.userId === controller.userId)
        ? x
        : { roomControllers: [ ...x.roomControllers, controller ] })),
    removeRoomController: userId => set(x => ({ roomControllers: x.roomControllers.filter(controller => controller.userId !== userId) })),
    setRoomBannedUsers: roomBannedUsers => set({ roomBannedUsers }),
    removeRoomBannedUser: userId => set(x => ({ roomBannedUsers: x.roomBannedUsers.filter(user => user.userId !== userId) })),
});
