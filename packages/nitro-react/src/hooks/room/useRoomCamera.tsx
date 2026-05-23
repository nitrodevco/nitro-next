import { Matrix, Point, Rectangle } from "pixi.js";
import { useRoomContext } from "../context"
import { Room, RoomCamera } from "@nitrodevco/nitro-renderer";
import { IRoomCamera, RoomObjectCategoryEnum, RoomObjectVariableEnum, Vector3d } from "@nitrodevco/nitro-api";
import { useRef } from "react";

export const useRoomCamera = () => {
    const room = useRoomContext(x => x.room);
    const camera = useRoomContext(x => x.camera);
    const isCameraFollowDisabled = useRef<boolean>(false);

    const updateRoomCamera = (time: number) => {
        const canvas = room.instance.canvas;

        if (!canvas) return;

        const viewport = new Rectangle(0, 0, canvas.width, canvas.height);
        const roomBounds = room.getRoomObjectBoundingRectangle(Room.ROOM_OBJECT_ID, RoomObjectCategoryEnum.Room);

        if (roomBounds && (roomBounds.right < 0 || roomBounds.bottom < 0 || roomBounds.left >= viewport.width || roomBounds.top >= viewport.height)) {
            camera.reset();
            camera.setTarget(new Vector3d(0, 0, 0));
        }

        const targetObject = room.getRoomObject(camera.targetId, camera.targetCategory);
        const targetLocation = targetObject?.getLocation() ?? new Vector3d();

        const needsUpdate =
            camera.screenWd !== viewport.width ||
            camera.screenHt !== viewport.height ||
            camera.scale !== canvas.geometry.scale ||
            camera.geometryUpdateId !== canvas.geometry.updateId ||
            (targetObject !== undefined && !Vector3d.isEqual(targetLocation, camera.targetObjectLoc)) ||
            camera.isMoving;

        if (!needsUpdate) {
            camera.limitedLocationX = false;
            camera.limitedLocationY = false;
            camera.centeredLocX = false;
            camera.centeredLocY = false;

            return;
        }

        camera.targetObjectLoc = targetLocation;

        const finalLocation = new Vector3d();
        let targetZ = Math.floor(targetLocation.z) + 1;

        finalLocation.assign(targetLocation);
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

        if (camera.limitedLocationX && camera.screenWd === viewport.width && camera.screenHt === viewport.height) marginX = 0;

        if (camera.limitedLocationY && camera.screenWd === viewport.width && camera.screenHt === viewport.height) {
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

        if (!camera.currentLoc) {
            canvas.geometry.location = finalLocation;
            camera.initializeLocation(new Vector3d(0, 0, 0));
        }

        const finalScreen = canvas.geometry.getScreenPoint(finalLocation);
        const currentPosition = new Vector3d(finalScreen?.x ?? 0, finalScreen?.y ?? 0, 0);

        const outOfActiveZoneX = targetObject !== undefined && (targetScreen.x < viewport.left || targetScreen.x > viewport.right) && !camera.centeredLocX;
        const outOfActiveZoneY = targetObject !== undefined && (targetScreen.y < viewport.top || targetScreen.y > viewport.bottom) && !camera.centeredLocY;
        const horizontalFitChanged = fitsHorizontally && !camera.centeredLocX && camera.screenWd !== viewport.width;
        const verticalFitChanged = fitsVertically && !camera.centeredLocY && camera.screenHt !== viewport.height;
        const roomSizeChanged = camera.roomWd !== roomBounds.width || camera.roomHt !== roomBounds.height;
        const activeZoneChanged = camera.screenWd !== viewport.width || camera.screenHt !== viewport.height;

        if (outOfActiveZoneX || outOfActiveZoneY || horizontalFitChanged || verticalFitChanged || roomSizeChanged || activeZoneChanged) {
            camera.limitedLocationX = clampedX;
            camera.limitedLocationY = clampedY;
            camera.setTarget(currentPosition);
        } else {
            if (!clampedX) camera.limitedLocationX = false;
            if (!clampedY) camera.limitedLocationY = false;
        }

        camera.centeredLocX = fitsHorizontally;
        camera.centeredLocY = fitsVertically;
        camera.screenWd = viewport.width;
        camera.screenHt = viewport.height;
        camera.scale = canvas.geometry.scale;
        camera.geometryUpdateId = canvas.geometry.updateId;
        camera.roomWd = roomBounds.width;
        camera.roomHt = roomBounds.height;

        if (!isCameraFollowDisabled.current) camera.update(time, 8);

        if (camera.currentLoc) room.setRoomInstanceRenderingCanvasOffset(new Point(-camera.currentLoc.x, -camera.currentLoc.y));
    }

    return { updateRoomCamera };
}