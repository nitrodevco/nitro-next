import { RoomObjectCategoryEnum } from "@nitrodevco/nitro-api";
import type { StateCreator } from "zustand";

type State = {
    targetId: number;
    targetCategory: RoomObjectCategoryEnum;
    cameraFollowDisabled: boolean;
    followDuration: number;
}

type Actions = {
    setTargetId: (id: number) => void;
    setTargetCategory: (category: RoomObjectCategoryEnum) => void;
    setTarget: (id: number, category: RoomObjectCategoryEnum) => void;
    setCameraFollowDisabled: (disabled: boolean) => void;
    setFollowDuration: (duration: number) => void;
    disableFollowTemporarily: (duration: number) => void;
};

export const RoomCameraSliceInitialState: State = {
    targetId: -1,
    targetCategory: RoomObjectCategoryEnum.Minimum,
    cameraFollowDisabled: false,
    followDuration: 1000
};

export type RoomCameraSlice = State & Actions;

export const createRoomCameraSlice: StateCreator<RoomCameraSlice, [], [], RoomCameraSlice> = (set, get, store) => ({
    ...RoomCameraSliceInitialState,
    setTargetId: (id: number) => set({ targetId: id }),
    setTargetCategory: (category: RoomObjectCategoryEnum) => set({ targetCategory: category }),
    setTarget: (id: number, category: RoomObjectCategoryEnum) => set({ targetId: id, targetCategory: category }),
    setCameraFollowDisabled: (disabled: boolean) => set({ cameraFollowDisabled: disabled }),
    setFollowDuration: (duration: number) => set({ followDuration: duration }),
    disableFollowTemporarily: (duration: number) => {
        set({ cameraFollowDisabled: true, followDuration: duration });
        setTimeout(() => set({ cameraFollowDisabled: false }), duration);
    }
});