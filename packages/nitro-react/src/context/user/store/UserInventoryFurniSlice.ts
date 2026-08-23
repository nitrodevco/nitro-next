import { ISelectedRoomObjectData, RoomObjectCategoryEnum, RoomObjectPlacementSource } from '@nitrodevco/nitro-api';
import { StateCreator } from 'zustand';

type State = {
    selectedAvatarId: number;
    selectedObjectId: number;
    selectedObjectCategory: RoomObjectCategoryEnum;
    selectedObject: ISelectedRoomObjectData | undefined;
    placedObject: ISelectedRoomObjectData | undefined;
    objectPlacementSource: RoomObjectPlacementSource;
};

type Actions = {
    getSelectedObject: () => ISelectedRoomObjectData | undefined;
    setSelectedAvatarId: (id: number) => void;
    setSelectedObjectId: (id: number) => void;
    setSelectedObjectCategory: (category: RoomObjectCategoryEnum) => void;
    setSelectedObject: (data: ISelectedRoomObjectData | undefined) => void;
    setPlacedObject: (data: ISelectedRoomObjectData | undefined) => void;
    setObjectPlacementSource: (source: RoomObjectPlacementSource) => void;
};

export const UserInventoryFurniSliceInitialState: State = {
    selectedAvatarId: -1,
    selectedObjectId: -1,
    selectedObjectCategory: RoomObjectCategoryEnum.Minimum,
    selectedObject: undefined,
    placedObject: undefined,
    objectPlacementSource: RoomObjectPlacementSource.INVENTORY,
};

export type UserInventoryFurniSlice = State & Actions;

export const createUserInventoryFurniSlice: StateCreator<UserInventoryFurniSlice, [], [], UserInventoryFurniSlice> = (set, get, store) => ({
    ...UserInventoryFurniSliceInitialState,
    getSelectedObject: () => get().selectedObject,
    setSelectedAvatarId: (id: number) => set({ selectedAvatarId: id }),
    setSelectedObjectId: (id: number) => set({ selectedObjectId: id }),
    setSelectedObjectCategory: (category: RoomObjectCategoryEnum) => set({ selectedObjectCategory: category }),
    setSelectedObject: (data: ISelectedRoomObjectData | undefined) => set({ selectedObject: data }),
    setPlacedObject: (data: ISelectedRoomObjectData | undefined) => set({ placedObject: data }),
    setObjectPlacementSource: (source: RoomObjectPlacementSource) => set({ objectPlacementSource: source }),
});
