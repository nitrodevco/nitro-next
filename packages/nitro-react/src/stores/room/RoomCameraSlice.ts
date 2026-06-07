import type { IVector3D } from "@nitrodevco/nitro-api";
import { RoomGeometryScaleType } from "@nitrodevco/nitro-api";
import { RoomObjectCategoryEnum, Vector3d } from "@nitrodevco/nitro-api";
import type { StateCreator } from "zustand";

type State = {
    targetId: number;
    targetCategory: RoomObjectCategoryEnum;
    cameraFollowDisabled: boolean;
    camera: {
        currentLocation: IVector3D | undefined;
        targetLocation: IVector3D | undefined;
        targetObjectLocation: IVector3D | undefined;
        limitedLocation: { x: boolean; y: boolean; };
        centeredLocation: { x: boolean; y: boolean; };
        screenSize: { w: number; h: number; };
        roomSize: { w: number; h: number; };
        scale: RoomGeometryScaleType;
        moveDistance: number;
        previousMoveSpeed: number;
        maintainPreviousMoveSpeed: boolean;
        geometryUpdateId: number;
        scaleChanged: boolean;
        followDuration: number;
    }
}

type Actions = {
    resetCamera: () => void;
    initializeCameraLocation: (location: IVector3D) => void;
    resetCameraLocation: (location: IVector3D) => void;
    setCameraTarget: (target: IVector3D) => void;
    setTargetObjectLocation: (target: IVector3D) => void;
    setCameraLimitedLocation: (x: boolean, y: boolean) => void;
    setCameraCenteredLocation: (x: boolean, y: boolean) => void;
    setCameraScale: (scale: RoomGeometryScaleType) => void;
    setCameraScreenSize: (w: number, height: number) => void;
    setCameraRoomSize: (w: number, h: number) => void;
    setGeometryUpdateId: (id: number) => void;
    updateCamera: (time: number, threshold: number) => void;
};

const initialState: State = {
    targetId: -1,
    targetCategory: RoomObjectCategoryEnum.Minimum,
    cameraFollowDisabled: false,
    camera: {
        currentLocation: undefined,
        targetLocation: undefined,
        targetObjectLocation: new Vector3d(),
        limitedLocation: { x: false, y: false },
        centeredLocation: { x: false, y: false },
        screenSize: { w: 0, h: 0 },
        roomSize: { w: 0, h: 0 },
        scale: RoomGeometryScaleType.ZoomedIn,
        moveDistance: 0,
        previousMoveSpeed: 0,
        maintainPreviousMoveSpeed: false,
        geometryUpdateId: -1,
        scaleChanged: false,
        followDuration: 1000
    }
};

const MOVE_SPEED_DENOMINATOR: number = 12;

export type RoomCameraSlice = State & Actions;

export const createRoomCameraSlice: StateCreator<RoomCameraSlice, [], [], RoomCameraSlice> = (set, get, store) => ({
    ...initialState,
    resetCamera: () => {
        get().camera.geometryUpdateId = -1;
    },
    initializeCameraLocation: (location: IVector3D) => {
        const camera = get().camera;

        if (camera.currentLocation !== undefined) return;

        camera.currentLocation = new Vector3d();
        camera.currentLocation.assign(location);
    },
    resetCameraLocation: (location: IVector3D) => {
        const camera = get().camera;

        if (!camera.currentLocation) camera.currentLocation = new Vector3d();

        camera.currentLocation.assign(location);
    },
    setCameraTarget: (target: IVector3D) => {
        const camera = get().camera;

        if (!camera.targetLocation) camera.targetLocation = new Vector3d();

        if (camera.targetLocation.x === target.x && camera.targetLocation.y === target.y && camera.targetLocation.z === target.z) return;

        camera.targetLocation.assign(target);

        const diff = Vector3d.dif(camera.targetLocation, camera.currentLocation);

        camera.moveDistance = diff.length;
        camera.maintainPreviousMoveSpeed = true;
    },
    setTargetObjectLocation: (target: IVector3D) => {
        const camera = get().camera;

        if (!camera.targetObjectLocation) camera.targetObjectLocation = new Vector3d();

        camera.targetObjectLocation.assign(target);
    },
    setCameraLimitedLocation: (x: boolean, y: boolean) => {
        const camera = get().camera;

        camera.limitedLocation.x = x;
        camera.limitedLocation.y = y;
    },
    setCameraCenteredLocation: (x: boolean, y: boolean) => {
        const camera = get().camera;

        camera.centeredLocation.x = x;
        camera.centeredLocation.y = y;
    },
    setCameraScale: (scale: RoomGeometryScaleType) => {
        const camera = get().camera;

        if (scale === camera.scale) return;

        camera.scale = scale;
        camera.scaleChanged = true;
    },
    setCameraScreenSize: (w: number, h: number) => {
        const camera = get().camera;

        camera.screenSize.w = w;
        camera.screenSize.h = h;
    },
    setCameraRoomSize: (w: number, h: number) => {
        const camera = get().camera;

        camera.roomSize.w = w;
        camera.roomSize.h = h;
    },
    setGeometryUpdateId: (id: number) => {
        get().camera.geometryUpdateId = id;
    },
    updateCamera: (time: number, threshold: number) => {
        const camera = get().camera;

        if (camera.followDuration <= 0 || !camera.targetLocation || !camera.currentLocation) return;

        if (camera.scaleChanged) {
            camera.scaleChanged = false;
            camera.currentLocation = camera.targetLocation;
            camera.targetLocation = undefined;

            return;
        }

        const diff = Vector3d.dif(camera.targetLocation, camera.currentLocation);

        if (diff.length > camera.moveDistance) camera.moveDistance = diff.length;

        if (diff.length <= threshold) {
            camera.currentLocation = camera.targetLocation;
            camera.targetLocation = undefined;
            camera.previousMoveSpeed = 0;
        } else {
            const sinFactor = Math.sin((Math.PI * diff.length) / camera.moveDistance);
            const minSpeed = threshold * 0.5;
            const maxSpeed = camera.moveDistance / MOVE_SPEED_DENOMINATOR;
            let speed = minSpeed + (maxSpeed - minSpeed) * sinFactor;

            if (camera.maintainPreviousMoveSpeed) {
                if (speed < camera.previousMoveSpeed) {
                    speed = Math.min(camera.previousMoveSpeed, diff.length);
                } else {
                    camera.maintainPreviousMoveSpeed = false;
                }
            }

            camera.previousMoveSpeed = speed;

            diff.divide(diff.length);
            diff.multiply(speed);

            camera.currentLocation = Vector3d.sum(camera.currentLocation, diff);
        }
    }
});