import { ISelectedRoomObjectData, RoomObjectCategoryEnum, RoomObjectPlacementSource } from '@nitrodevco/nitro-api';
import { StateCreator } from 'zustand';

/**
 * The furni the infostand's place more button keeps placing - `InfoStandWidget`'s `furniData` as
 * `requestItemToMover` reads it: its builders club offer, room category, type and extra param.
 */
export interface InfostandPlaceMoreFurni {
    bcOfferId: number;
    category: RoomObjectCategoryEnum;
    classId: number;
    extraParam: string;
}

type State = {
    selectedAvatarId: number;
    selectedObjectId: number;
    selectedObjectCategory: RoomObjectCategoryEnum;
    selectedObject: ISelectedRoomObjectData | undefined;
    placedObject: ISelectedRoomObjectData | undefined;
    objectPlacementSource: RoomObjectPlacementSource;
    infostandPlaceMoreFurni: InfostandPlaceMoreFurni | undefined;
};

type Actions = {
    getSelectedObject: () => ISelectedRoomObjectData | undefined;
    setSelectedAvatarId: (id: number) => void;
    setSelectedObjectId: (id: number) => void;
    setSelectedObjectCategory: (category: RoomObjectCategoryEnum) => void;
    setSelectedObject: (data: ISelectedRoomObjectData | undefined) => void;
    setPlacedObject: (data: ISelectedRoomObjectData | undefined) => void;
    setObjectPlacementSource: (source: RoomObjectPlacementSource) => void;
    setInfostandPlaceMoreFurni: (furni: InfostandPlaceMoreFurni | undefined) => void;
};

/**
 * What is selected, being placed or being moved in the room, where a placed object came
 * from, and what the infostand's place more button is placing.
 */
export const RoomSelectedObjectSliceInitialState: State = {
    selectedAvatarId: -1,
    selectedObjectId: -1,
    selectedObjectCategory: RoomObjectCategoryEnum.Minimum,
    selectedObject: undefined,
    placedObject: undefined,
    objectPlacementSource: RoomObjectPlacementSource.INVENTORY,
    infostandPlaceMoreFurni: undefined,
};

export type RoomSelectedObjectSlice = State & Actions;

export const createRoomSelectedObjectSlice: StateCreator<RoomSelectedObjectSlice, [], [], RoomSelectedObjectSlice> = (set, get) => ({
    ...RoomSelectedObjectSliceInitialState,
    getSelectedObject: () => get().selectedObject,
    setSelectedAvatarId: (id: number) => set({ selectedAvatarId: id }),
    setSelectedObjectId: (id: number) => set({ selectedObjectId: id }),
    setSelectedObjectCategory: (category: RoomObjectCategoryEnum) => set({ selectedObjectCategory: category }),
    setSelectedObject: (data: ISelectedRoomObjectData | undefined) => set({ selectedObject: data }),
    setPlacedObject: (data: ISelectedRoomObjectData | undefined) => set({ placedObject: data }),
    setObjectPlacementSource: (source: RoomObjectPlacementSource) => set({ objectPlacementSource: source }),
    setInfostandPlaceMoreFurni: (furni: InfostandPlaceMoreFurni | undefined) => set({ infostandPlaceMoreFurni: furni }),
});
