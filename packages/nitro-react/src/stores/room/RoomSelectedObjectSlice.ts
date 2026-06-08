import type { ISelectedRoomObjectData } from "@nitrodevco/nitro-api";
import { RoomObjectCategoryEnum, RoomObjectPlacementSource } from "@nitrodevco/nitro-api";
import type { StateCreator } from "zustand";

type State = {
    selectedAvatarId: number;
    selectedObjectId: number;
    selectedObjectCategory: RoomObjectCategoryEnum;
    selectedObject: ISelectedRoomObjectData | undefined;
    placedObject: ISelectedRoomObjectData | undefined;
    objectPlacementSource: RoomObjectPlacementSource;
}

type Actions = {
    getSelectedObject: () => ISelectedRoomObjectData | undefined;
    setSelectedAvatarId: (id: number) => void;
    setSelectedObjectId: (id: number) => void;
    setSelectedObjectCategory: (id: number) => void;
    setSelectedObject: (data: ISelectedRoomObjectData | undefined) => void;
    setPlacedObject: (data: ISelectedRoomObjectData | undefined) => void;
};

const initialState: State = {
    selectedAvatarId: -1,
    selectedObjectId: -1,
    selectedObjectCategory: RoomObjectCategoryEnum.Minimum,
    selectedObject: undefined,
    placedObject: undefined,
    objectPlacementSource: RoomObjectPlacementSource.INVENTORY
};

export type RoomSelectedObjectSlice = State & Actions;

export const createRoomSelectedObjectSlice: StateCreator<RoomSelectedObjectSlice, [], [], RoomSelectedObjectSlice> = (set, get, store) => ({
    ...initialState,
    getSelectedObject: () => get().selectedObject,
    setSelectedAvatarId: (id: number) => set(state => { return { ...state, selectedAvatarId: id } }),
    setSelectedObjectId: (id: number) => set(state => { return { ...state, selectedObjectId: id } }),
    setSelectedObjectCategory: (id: number) => set(state => { return { ...state, selectedObjectCategory: id } }),
    setSelectedObject: (data: ISelectedRoomObjectData | undefined) =>
        set(state => {
            return {
                ...state,
                selectedObject: data
            }
        }),
    setPlacedObject: (data: ISelectedRoomObjectData | undefined) =>
        set(state => {
            return {
                ...state,
                placedObject: data
            }
        }),
});