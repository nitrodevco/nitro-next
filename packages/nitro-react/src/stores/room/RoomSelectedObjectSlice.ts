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
    setSelectedAvatarId: (id: number) => void;
    setSelectedObjectId: (id: number) => void;
    setSelectedObjectCategory: (category: RoomObjectCategoryEnum) => void;
    setSelectedObject: (data: ISelectedRoomObjectData | undefined) => void;
    setPlacedObject: (data: ISelectedRoomObjectData | undefined) => void;
    setObjectPlacementSource: (source: RoomObjectPlacementSource) => void;
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

export const createRoomSelectedObjectSlice: StateCreator<RoomSelectedObjectSlice, [], [], RoomSelectedObjectSlice> = (set) => ({
    ...initialState,
    setSelectedAvatarId: (id: number) => set({ selectedAvatarId: id }),
    setSelectedObjectId: (id: number) => set({ selectedObjectId: id }),
    setSelectedObjectCategory: (category: RoomObjectCategoryEnum) => set({ selectedObjectCategory: category }),
    setSelectedObject: (data: ISelectedRoomObjectData | undefined) => set({ selectedObject: data }),
    setPlacedObject: (data: ISelectedRoomObjectData | undefined) => set({ placedObject: data }),
    setObjectPlacementSource: (source: RoomObjectPlacementSource) => set({ objectPlacementSource: source }),
});