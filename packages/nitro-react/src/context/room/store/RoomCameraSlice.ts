/**
 * Who the camera follows and for how long, and whether following is suspended because the user
 * dragged the room. `cameraResetRequests` counts the times the camera was told to look again
 * (`RoomCamera.reset`), which `useRoomCamera` answers on its next update.
 */
import { RoomObjectCategoryEnum } from '@nitrodevco/nitro-api';
import { StateCreator } from 'zustand';

type State = {
    targetId: number;
    targetCategory: RoomObjectCategoryEnum;
    cameraFollowDisabled: boolean;
    followDuration: number;
    cameraResetRequests: number;
};

type Actions = {
    setTargetId: (id: number) => void;
    setTargetCategory: (category: RoomObjectCategoryEnum) => void;
    setTarget: (id: number, category: RoomObjectCategoryEnum) => void;
    setCameraFollowDisabled: (disabled: boolean) => void;
    setFollowDuration: (duration: number) => void;
    disableFollowTemporarily: (duration: number) => void;
    /** `RoomEngine.onToolbarClicked`: `activateFollowing(cameraFollowDuration)` and `reset()`. */
    reactivateCameraFollowing: () => void;
};

export const RoomCameraSliceInitialState: State = {
    targetId: -1,
    targetCategory: RoomObjectCategoryEnum.Minimum,
    cameraFollowDisabled: false,
    followDuration: 1000,
    cameraResetRequests: 0,
};

export type RoomCameraSlice = State & Actions;

export const createRoomCameraSlice: StateCreator<RoomCameraSlice, [], [], RoomCameraSlice> = set => ({
    ...RoomCameraSliceInitialState,
    setTargetId: (id: number) => set({ targetId: id }),
    setTargetCategory: (category: RoomObjectCategoryEnum) => set({ targetCategory: category }),
    setTarget: (id: number, category: RoomObjectCategoryEnum) => set({ targetId: id, targetCategory: category }),
    setCameraFollowDisabled: (disabled: boolean) => set({ cameraFollowDisabled: disabled }),
    setFollowDuration: (duration: number) => set({ followDuration: duration }),
    disableFollowTemporarily: (duration: number) => {
        set({ cameraFollowDisabled: true, followDuration: duration });
        setTimeout(() => set({ cameraFollowDisabled: false }), duration);
    },
    // The duration is `cameraFollowDuration`'s 1000; `room.camera.follow_user` gates the following itself in `useRoomCamera`.
    reactivateCameraFollowing: () => set(x => ({ followDuration: 1000, cameraResetRequests: x.cameraResetRequests + 1 })),
});
