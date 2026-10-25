/**
 * The furni and user choosers' lists - what `FurniChooserWidget` and `UsersChooserWidget` hold as
 * `items` while their window is open (`RoomWidgetChooserContentEvent`). `undefined` is a closed
 * chooser: Flash builds the window with the first content and disposes it on close. Kept per room,
 * as Flash's widgets go with the room's desktop.
 */
import { RoomObjectCategoryEnum } from '@nitrodevco/nitro-api';
import { StateCreator } from 'zustand';

/** `ChooserItem`: one row of a chooser - an object of the room, its name, owner and user type. */
export interface ChooserItem {
    id: number;
    category: RoomObjectCategoryEnum;
    name: string;
    /** The furni's owner as the room object names it (`furniture_owner_name`); a user has none. */
    ownerName: string | undefined;
    /** A user's `RoomObjectUserType`; 0 for a furni. */
    type: number;
    lowerCaseName: string;
}

type State = {
    furniChooserItems: ChooserItem[] | undefined;
    userChooserItems: ChooserItem[] | undefined;
};

type Actions = {
    setFurniChooserItems: (furniChooserItems: ChooserItem[] | undefined) => void;
    setUserChooserItems: (userChooserItems: ChooserItem[] | undefined) => void;
};

export const RoomChooserSliceInitialState: State = {
    furniChooserItems: undefined,
    userChooserItems: undefined,
};

export type RoomChooserSlice = State & Actions;

export const createRoomChooserSlice: StateCreator<RoomChooserSlice, [], [], RoomChooserSlice> = set => ({
    ...RoomChooserSliceInitialState,
    setFurniChooserItems: furniChooserItems => set({ furniChooserItems }),
    setUserChooserItems: userChooserItems => set({ userChooserItems }),
});
