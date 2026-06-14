import { RoomObjectCategoryEnum } from "@nitrodevco/nitro-api";
import type { StateCreator } from "zustand";

type State = {
    targetId: number;
    targetCategory: RoomObjectCategoryEnum;
    cameraFollowDisabled: boolean;
    followDuration: number;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type Actions = {
};

const initialState: State = {
    targetId: -1,
    targetCategory: RoomObjectCategoryEnum.Minimum,
    cameraFollowDisabled: false,
    followDuration: 1000
};

export type RoomCameraSlice = State & Actions;

export const createRoomCameraSlice: StateCreator<RoomCameraSlice, [], [], RoomCameraSlice> = (set, get, store) => ({
    ...initialState
});