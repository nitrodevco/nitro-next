import type { IVector3D } from "@nitrodevco/nitro-api";
import { RoomGeometryScaleType, RoomObjectCategoryEnum, RoomObjectVariableEnum, Vector3d } from "@nitrodevco/nitro-api";
import { Room } from "@nitrodevco/nitro-renderer";
import { RoomDraggedEvent } from "@nitrodevco/nitro-shared";
import { Matrix, Point, Rectangle } from "pixi.js";
import { useRef } from "react";

import { useRoomCameraSelector } from "#base/selectors/room";

import { useRoomContext } from "../context";
import { useConfigValue } from "../useConfigValue";
import { useRoomEventDispatcher } from "./useRoomEventDispatcher";

export const useRoomCamera = () => {
    const room = useRoomContext(x => x.room);
    const { targetId, targetCategory, cameraFollowDisabled, followDuration } = useRoomCameraSelector();
    const moveSpeedDenominator = useConfigValue<number>('camera.move.speed', 12);
    const cameraDataRef = useRef<{
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
    }>({
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
        scaleChanged: false
    });

    const setCameraTarget = (target: IVector3D) => {
        const cameraData = cameraDataRef.current;

        if (!cameraData.targetLocation) cameraData.targetLocation = new Vector3d();

        if (cameraData.targetLocation.x === target.x && cameraData.targetLocation.y === target.y && cameraData.targetLocation.z === target.z) return;

        cameraData.targetLocation.assign(target);

        const diff = Vector3d.dif(cameraData.targetLocation, cameraData.currentLocation);

        cameraData.moveDistance = diff.length;
        cameraData.maintainPreviousMoveSpeed = true;
    }

    const adjustCamera = (time: number, threshold: number) => {
        const cameraData = cameraDataRef.current;

        if (followDuration <= 0 || !cameraData.targetLocation || !cameraData.currentLocation) return;

        if (cameraData.scaleChanged) {
            cameraData.scaleChanged = false;
            cameraData.currentLocation = Vector3d.from(cameraData.targetLocation);
            cameraData.targetLocation = undefined;

            return;
        }

        const diff = Vector3d.dif(cameraData.targetLocation, cameraData.currentLocation);

        if (diff.length > cameraData.moveDistance) cameraData.moveDistance = diff.length;

        if (diff.length <= threshold) {
            cameraData.currentLocation = Vector3d.from(cameraData.targetLocation);
            cameraData.targetLocation = undefined;
            cameraData.previousMoveSpeed = 0;

            return;
        }

        const sinFactor = Math.sin((Math.PI * diff.length) / cameraData.moveDistance);
        const minSpeed = threshold * 0.5;
        const maxSpeed = cameraData.moveDistance / moveSpeedDenominator!;

        let speed = minSpeed + (maxSpeed - minSpeed) * sinFactor;

        if (cameraData.maintainPreviousMoveSpeed) {
            if (speed < cameraData.previousMoveSpeed) {
                speed = Math.min(cameraData.previousMoveSpeed, diff.length);
            } else {
                cameraData.maintainPreviousMoveSpeed = false;
            }
        }

        cameraData.previousMoveSpeed = speed;

        diff.divide(diff.length);
        diff.multiply(speed);

        cameraData.currentLocation = Vector3d.sum(cameraData.currentLocation, diff);
    }

    const updateRoomCamera = (time: number) => {
        const canvas = room.instance.canvas;

        if (!canvas) return;

        const cameraData = cameraDataRef.current;
        const viewport = new Rectangle(0, 0, canvas.width, canvas.height);
        const roomBounds = room.getRoomObjectBoundingRectangle(Room.ROOM_OBJECT_ID, RoomObjectCategoryEnum.Room);

        if (roomBounds && (roomBounds.right < 0 || roomBounds.bottom < 0 || roomBounds.left >= viewport.width || roomBounds.top >= viewport.height)) cameraData.geometryUpdateId = -1;

        const targetObject = room.getRoomObject(targetId, targetCategory);
        const goalLocation = targetObject?.getLocation() ?? new Vector3d();

        const needsUpdate =
            cameraData.screenSize.w !== viewport.width ||
            cameraData.screenSize.h !== viewport.height ||
            cameraData.scale !== canvas.geometry.scale ||
            cameraData.geometryUpdateId !== canvas.geometry.updateId ||
            !Vector3d.isEqual(goalLocation, cameraData.targetObjectLocation) ||
            (cameraData.targetLocation !== undefined && cameraData.currentLocation !== undefined);

        if (!needsUpdate) {
            cameraData.limitedLocation = { x: false, y: false };
            cameraData.centeredLocation = { x: false, y: false };

            return;
        }

        cameraData.targetObjectLocation = goalLocation;

        let targetZ = Math.floor(goalLocation.z) + 1;

        const finalLocation = new Vector3d();

        finalLocation.assign(goalLocation);
        finalLocation.x = Math.round(finalLocation.x);
        finalLocation.y = Math.round(finalLocation.y);

        const minX = room.getRoomValue<number>(RoomObjectVariableEnum.RoomMinX) - 0.5;
        const maxX = room.getRoomValue<number>(RoomObjectVariableEnum.RoomMaxX) + 0.5;
        const minY = room.getRoomValue<number>(RoomObjectVariableEnum.RoomMinY) - 0.5;
        const maxY = room.getRoomValue<number>(RoomObjectVariableEnum.RoomMaxY) + 0.5;

        const centerX = Math.round((minX + maxX) / 2);
        const centerY = Math.round((minY + maxY) / 2);

        let offset = new Point(finalLocation.x - centerX, finalLocation.y - centerY);

        const scaleX = canvas.geometry.scale / Math.sqrt(2);
        const scaleY = scaleX / 2;
        const rotMatrix = new Matrix();

        rotMatrix.rotate((-(canvas.geometry.direction.x + 90) / 180) * Math.PI);

        offset = rotMatrix.apply(offset);
        offset.y = offset.y * (scaleY / scaleX);

        const halfViewRangeX = viewport.width / 2 / scaleX - 1;
        const halfViewRangeY = viewport.height / 2 / scaleY - 1;
        const centerScreen = canvas.geometry.getScreenPoint(new Vector3d(centerX, centerY, 2));

        if (!centerScreen) return;

        centerScreen.x += Math.round(viewport.width / 2);
        centerScreen.y += Math.round(viewport.height / 2);

        if (!roomBounds) {
            canvas.geometry.adjustLocation(new Vector3d(0, 0), 25);

            return;
        }

        roomBounds.x -= canvas.screenOffsetX;
        roomBounds.y -= canvas.screenOffsetY;

        if (roomBounds.width <= 1 || roomBounds.height <= 1) {
            canvas.geometry.adjustLocation(new Vector3d(-30, -30), 25);

            return;
        }

        const boundsMinX = (roomBounds.left - centerScreen.x - canvas.geometry.scale * 0.25) / scaleX;
        const boundsMaxX = (roomBounds.right - centerScreen.x + canvas.geometry.scale * 0.25) / scaleX;
        const boundsMinY = (roomBounds.top - centerScreen.y - canvas.geometry.scale * 0.5) / scaleY;
        const boundsMaxY = (roomBounds.bottom - centerScreen.y + canvas.geometry.scale * 0.5) / scaleY;

        let clampedX = false;
        let clampedY = false;
        let fitsHorizontally = false;
        let fitsVertically = false;

        if (Math.round((boundsMaxX - boundsMinX) * scaleX) < viewport.width) {
            targetZ = 2;
            offset.x = (boundsMaxX + boundsMinX) / 2;
            fitsHorizontally = true;
        } else {
            if (offset.x > boundsMaxX - halfViewRangeX) {
                offset.x = boundsMaxX - halfViewRangeX;
                clampedX = true;
            }
            if (offset.x < boundsMinX + halfViewRangeX) {
                offset.x = boundsMinX + halfViewRangeX;
                clampedX = true;
            }
        }

        if (Math.round((boundsMaxY - boundsMinY) * scaleY) < viewport.height) {
            targetZ = 2;
            offset.y = (boundsMaxY + boundsMinY) / 2;
            fitsVertically = true;
        } else {
            if (offset.y > boundsMaxY - halfViewRangeY) {
                offset.y = boundsMaxY - halfViewRangeY;
                clampedY = true;
            }

            if (offset.y < boundsMinY + halfViewRangeY) {
                offset.y = boundsMinY + halfViewRangeY;
                clampedY = true;
            }

            if (clampedY) offset.y = offset.y / (scaleY / scaleX);
        }

        rotMatrix.invert();

        offset = rotMatrix.apply(offset);
        offset.x += centerX;
        offset.y += centerY;

        let marginTop = 0.35;
        let marginBottom = 0.2;
        let marginX = 0.2;

        if (marginX * viewport.width > 100) marginX = 100 / viewport.width;
        if (marginTop * viewport.height > 150) marginTop = 150 / viewport.height;
        if (marginBottom * viewport.height > 150) marginBottom = 150 / viewport.height;

        if (cameraData.limitedLocation.x && cameraData.screenSize.w === viewport.width && cameraData.screenSize.h === viewport.height) marginX = 0;

        if (cameraData.limitedLocation.y && cameraData.screenSize.w === viewport.width && cameraData.screenSize.h === viewport.height) {
            marginTop = 0;
            marginBottom = 0;
        }

        viewport.width = Math.max(viewport.width * (1 - marginX * 2), 10);
        viewport.height = Math.max(viewport.height * (1 - (marginTop + marginBottom)), 10);
        viewport.x = -viewport.width / 2;
        viewport.y = (marginTop + marginBottom > 0)
            ? -(viewport.height * (marginBottom / (marginTop + marginBottom)))
            : -viewport.height / 2;

        const targetScreen = canvas.geometry.getScreenPoint(finalLocation);

        if (!targetScreen) return;

        targetScreen.x += canvas.screenOffsetX;
        targetScreen.y += canvas.screenOffsetY;

        finalLocation.z = targetZ;
        finalLocation.x = Math.round(offset.x * 2) / 2;
        finalLocation.y = Math.round(offset.y * 2) / 2;

        if (cameraData.currentLocation === undefined) {
            canvas.geometry.setLocation(finalLocation);
            cameraData.currentLocation = new Vector3d(0, 0, 0);
        }

        const finalScreen = canvas.geometry.getScreenPoint(finalLocation);
        const currentPosition = new Vector3d(finalScreen.x, finalScreen.y);

        const outOfActiveZoneX = targetObject !== undefined && (targetScreen.x < viewport.left || targetScreen.x > viewport.right) && !cameraData.centeredLocation.x;
        const outOfActiveZoneY = targetObject !== undefined && (targetScreen.y < viewport.top || targetScreen.y > viewport.bottom) && !cameraData.centeredLocation.y;
        const horizontalFitChanged = fitsHorizontally && !cameraData.centeredLocation.x && cameraData.screenSize.w !== viewport.width;
        const verticalFitChanged = fitsVertically && !cameraData.centeredLocation.y && cameraData.screenSize.h !== viewport.height;
        const roomSizeChanged = cameraData.roomSize.w !== roomBounds.width || cameraData.roomSize.h !== roomBounds.height;
        const activeZoneChanged = cameraData.screenSize.w !== viewport.width || cameraData.screenSize.h !== viewport.height;

        if (outOfActiveZoneX || outOfActiveZoneY || horizontalFitChanged || verticalFitChanged || roomSizeChanged || activeZoneChanged || cameraData.geometryUpdateId === -1) {
            cameraData.limitedLocation = { x: clampedX, y: clampedY };

            setCameraTarget(currentPosition);
        } else {
            if (!clampedX) cameraData.limitedLocation = { x: false, y: cameraData.limitedLocation.y };
            if (!clampedY) cameraData.limitedLocation = { x: cameraData.limitedLocation.x, y: false };
        }

        cameraData.centeredLocation = { x: fitsHorizontally, y: fitsVertically };
        cameraData.screenSize = { w: canvas.width, h: canvas.height };
        cameraData.roomSize = { w: roomBounds.width, h: roomBounds.height };
        cameraData.geometryUpdateId = canvas.geometry.updateId;

        if (cameraData.scale !== canvas.geometry.scale) {
            cameraData.scaleChanged = true;
            cameraData.scale = canvas.geometry.scale;
        }

        if (!cameraFollowDisabled) adjustCamera(time, 8);

        room.setRoomInstanceRenderingCanvasOffset(new Point(-(cameraData.currentLocation?.x ?? 0), -(cameraData.currentLocation?.y ?? 0)));
    }

    useRoomEventDispatcher<RoomDraggedEvent>(RoomDraggedEvent.ROOM_DRAGGED, event => {
        const cameraData = cameraDataRef.current;

        if (cameraData.currentLocation === undefined || cameraData.targetLocation === undefined) cameraData.centeredLocation = { x: false, y: false };

        cameraData.currentLocation = new Vector3d(event.offsetX, event.offsetY);
    });

    return { updateRoomCamera };
}