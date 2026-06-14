import { RoomObjectCategoryEnum, RoomObjectVariableEnum, Vector3d } from "@nitrodevco/nitro-api";
import { Room } from "@nitrodevco/nitro-renderer";
import { Matrix, Point, Rectangle } from "pixi.js";
import { useShallow } from "zustand/shallow";

import { useRoomContext } from "../context";

export const useRoomCamera = () => {
    const [room, targetId, targetCategory, cameraFollowDisabled, camera, resetCamera, initializeCameraLocation, setCameraTarget, setTargetObjectLocation, setCameraLimitedLocation, setCameraCenteredLocation, setCameraScale, setCameraScreenSize, setCameraRoomSize, setGeometryUpdateId, updateCamera] = useRoomContext(useShallow(x => [
        x.room,
        x.targetId,
        x.targetCategory,
        x.cameraFollowDisabled,
        x.camera,
        x.resetCamera,
        x.initializeCameraLocation,
        x.setCameraTarget,
        x.setTargetObjectLocation,
        x.setCameraLimitedLocation,
        x.setCameraCenteredLocation,
        x.setCameraScale,
        x.setCameraScreenSize,
        x.setCameraRoomSize,
        x.setGeometryUpdateId,
        x.updateCamera
    ]));

    const updateRoomCamera = (time: number) => {
        const canvas = room.instance.canvas;

        if (!canvas) return;

        const viewport = new Rectangle(0, 0, canvas.width, canvas.height);
        const roomBounds = room.getRoomObjectBoundingRectangle(Room.ROOM_OBJECT_ID, RoomObjectCategoryEnum.Room);

        if (roomBounds && (roomBounds.right < 0 || roomBounds.bottom < 0 || roomBounds.left >= viewport.width || roomBounds.top >= viewport.height)) resetCamera();

        const targetObject = room.getRoomObject(targetId, targetCategory);
        const goalLocation = targetObject?.getLocation() ?? new Vector3d();

        const needsUpdate =
            camera.screenSize.w !== viewport.width ||
            camera.screenSize.h !== viewport.height ||
            camera.scale !== canvas.geometry.scale ||
            camera.geometryUpdateId !== canvas.geometry.updateId ||
            !Vector3d.isEqual(goalLocation, camera.targetObjectLocation) ||
            (camera.targetLocation !== undefined && camera.currentLocation !== undefined);

        if (!needsUpdate) {
            setCameraLimitedLocation(false, false);
            setCameraCenteredLocation(false, false);

            return;
        }

        setTargetObjectLocation(goalLocation);

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

        if (camera.limitedLocation.x && camera.screenSize.w === viewport.width && camera.screenSize.h === viewport.height) marginX = 0;

        if (camera.limitedLocation.y && camera.screenSize.w === viewport.width && camera.screenSize.h === viewport.height) {
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

        if (camera.currentLocation === undefined) {
            canvas.geometry.setLocation(finalLocation);
            initializeCameraLocation(new Vector3d(0, 0, 0));
        }

        const finalScreen = canvas.geometry.getScreenPoint(finalLocation);
        const currentPosition = new Vector3d(finalScreen.x, finalScreen.y);

        const outOfActiveZoneX = targetObject !== undefined && (targetScreen.x < viewport.left || targetScreen.x > viewport.right) && !camera.centeredLocation.x;
        const outOfActiveZoneY = targetObject !== undefined && (targetScreen.y < viewport.top || targetScreen.y > viewport.bottom) && !camera.centeredLocation.y;
        const horizontalFitChanged = fitsHorizontally && !camera.centeredLocation.x && camera.screenSize.w !== viewport.width;
        const verticalFitChanged = fitsVertically && !camera.centeredLocation.y && camera.screenSize.h !== viewport.height;
        const roomSizeChanged = camera.roomSize.w !== roomBounds.width || camera.roomSize.h !== roomBounds.height;
        const activeZoneChanged = camera.screenSize.w !== viewport.width || camera.screenSize.h !== viewport.height;

        if (outOfActiveZoneX || outOfActiveZoneY || horizontalFitChanged || verticalFitChanged || roomSizeChanged || activeZoneChanged || camera.geometryUpdateId === -1) {
            setCameraLimitedLocation(clampedX, clampedY);
            setCameraTarget(currentPosition);
        } else {
            if (!clampedX) setCameraLimitedLocation(false, camera.limitedLocation.y);
            if (!clampedY) setCameraLimitedLocation(camera.limitedLocation.x, false);
        }

        setCameraCenteredLocation(fitsHorizontally, fitsVertically);
        setCameraScreenSize(viewport.width, viewport.height);
        setCameraScale(canvas.geometry.scale);
        setGeometryUpdateId(canvas.geometry.updateId);
        setCameraRoomSize(roomBounds.width, roomBounds.height);

        if (!cameraFollowDisabled) updateCamera(time, 8);

        room.setRoomInstanceRenderingCanvasOffset(new Point(-(camera.currentLocation?.x ?? 0), -(camera.currentLocation?.y ?? 0)));
    }

    return { updateRoomCamera, resetCamera, setCameraTarget };
}