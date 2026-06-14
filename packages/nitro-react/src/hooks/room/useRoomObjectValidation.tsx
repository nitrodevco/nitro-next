import type { IRoomObject, IRoomObjectController, ISelectedRoomObjectData, IVector3D } from "@nitrodevco/nitro-api";
import { RoomGeometryScaleType, RoomObjectUserTypeName, RoomObjectVariableEnum, Vector3d } from "@nitrodevco/nitro-api";
import type { RoomObjectMouseEvent } from "@nitrodevco/nitro-shared";

import { useFurnitureDataStore } from "#base/stores";

import { useRoomContext } from "../context"

export const useRoomObjectValidation = () => {
    const room = useRoomContext(x => x.room);
    const floorItems = useFurnitureDataStore(x => x.floorItems);

    const setFurnitureAlphaMultiplier = (object: IRoomObjectController, multiplier: number) => {
        object?.model.setValue(RoomObjectVariableEnum.FurnitureAlphaMultiplier, multiplier);
    };

    const getActiveSurfaceLocation = (roomObject: IRoomObject, event: RoomObjectMouseEvent) => {
        if (!roomObject || !event) return undefined;

        const furniData = floorItems.get(roomObject.type);

        if (!furniData || (!furniData.canStandOn && !furniData.canSitOn && !furniData.canLayOn)) return undefined;

        const location = roomObject.getLocation();
        const direction = roomObject.getDirection();

        let sizeX = roomObject.model.getValue<number>(RoomObjectVariableEnum.FurnitureSizeX);
        let sizeY = roomObject.model.getValue<number>(RoomObjectVariableEnum.FurnitureSizeY);
        const sizeZ = roomObject.model.getValue<number>(RoomObjectVariableEnum.FurnitureSizeZ);

        if (direction.x === 90 || direction.x === 270) [sizeX, sizeY] = [sizeY, sizeX];

        if (sizeX < 1) sizeX = 1;
        if (sizeY < 1) sizeY = 1;

        const scale = room.getGeometry()?.scale ?? RoomGeometryScaleType.ZoomedIn;
        const sitOffset = furniData.canSitOn ? 0.5 : 0;
        const scaledX = (scale / 2 + event.spriteOffsetX + event.localX) / (scale / 4);
        const scaledY = (event.spriteOffsetY + event.localY + ((sizeZ - sitOffset) * scale) / 2) / (scale / 4);
        const gridX = (scaledX + 2 * scaledY) / 4;
        const gridY = (scaledX - 2 * scaledY) / 4;
        const x = Math.floor(location.x + gridX);
        const y = Math.floor(location.y - gridY + 1);

        const outOfBounds = x < location.x || x >= location.x + sizeX || y < location.y || y >= location.y + sizeY;

        if (outOfBounds) return undefined;

        return new Vector3d(x, y, furniData.canSitOn ? sizeZ - 0.5 : sizeZ);
    };

    const validateFurnitureLocation = (roomObject: IRoomObject, loc: IVector3D, prevLoc: IVector3D, prevDir: IVector3D) => {
        if (!roomObject?.model || !loc || !prevLoc || !prevDir) return undefined;

        if (loc.x === prevLoc.x && loc.y === prevLoc.y && roomObject.getDirection().x === prevDir.x) {
            const vec = new Vector3d();
            vec.assign(prevLoc);
            return vec;
        }

        let sizeX = roomObject.model.getValue<number>(RoomObjectVariableEnum.FurnitureSizeX);
        let sizeY = roomObject.model.getValue<number>(RoomObjectVariableEnum.FurnitureSizeY);

        if (sizeX < 1) sizeX = 1;
        if (sizeY < 1) sizeY = 1;

        let prevSizeX = sizeX;
        let prevSizeY = sizeY;

        const curQuadrant = Math.trunc((Math.trunc(roomObject.getDirection().x + 45) % 360) / 90);
        if (curQuadrant === 1 || curQuadrant === 3) [sizeX, sizeY] = [sizeY, sizeX];

        const prevQuadrant = Math.trunc((Math.trunc(prevDir.x + 45) % 360) / 90);
        if (prevQuadrant === 1 || prevQuadrant === 3) [prevSizeX, prevSizeY] = [prevSizeY, prevSizeX];

        const stackable = roomObject.model.getValue<number>(RoomObjectVariableEnum.FurnitureAlwaysStackable) === 1;

        if (!room.instance.furnitureStackingHeightMap.validateLocation(loc.x, loc.y, sizeX, sizeY, prevLoc.x, prevLoc.y, prevSizeX, prevSizeY, stackable))
            return undefined;

        return new Vector3d(loc.x, loc.y, room.instance.furnitureStackingHeightMap.getTileHeight(loc.x, loc.y));
    };

    const validateWallItemLocation = (
        roomObject: IRoomObject,
        origin: IVector3D,
        wallWidth: IVector3D,
        wallHeight: IVector3D,
        posX: number,
        posY: number,
        selectedObjectData: ISelectedRoomObjectData,
    ) => {
        if (!roomObject?.model || !origin || !wallWidth || !wallHeight || !selectedObjectData) return undefined;

        const furniSizeX = roomObject.model.getValue<number>(RoomObjectVariableEnum.FurnitureSizeX);
        const furniSizeZ = roomObject.model.getValue<number>(RoomObjectVariableEnum.FurnitureSizeZ);
        const furniCenterZ = roomObject.model.getValue<number>(RoomObjectVariableEnum.FurnitureCenterZ);

        const halfW = furniSizeX / 2;
        const maxX = wallWidth.length - halfW;
        const maxY = wallHeight.length - (furniSizeZ - furniCenterZ);

        if (posX < halfW || posX > maxX || posY < furniCenterZ || posY > maxY) {
            if (posX < halfW && posX <= maxX) posX = halfW;
            else if (posX >= halfW && posX > maxX) posX = maxX;

            if (posY < furniCenterZ && posY <= maxY) posY = furniCenterZ;
            else if (posY >= furniCenterZ && posY > maxY) posY = maxY;
        }

        if (posX < halfW || posX > maxX || posY < furniCenterZ || posY > maxY) return undefined;

        return Vector3d.sum(origin, Vector3d.sum(
            Vector3d.product(wallWidth, posX / wallWidth.length),
            Vector3d.product(wallHeight, posY / wallHeight.length),
        ));
    };

    const isValidLocation = (object: IRoomObject, goalDirection: IVector3D) => {
        if (!object?.model || !goalDirection) return false;

        const direction = object.getDirection();
        const location = object.getLocation();

        if (!direction || !location) return false;

        if (direction.x % 180 === goalDirection.x % 180) return true;

        let sizeX = object.model.getValue<number>(RoomObjectVariableEnum.FurnitureSizeX);
        let sizeY = object.model.getValue<number>(RoomObjectVariableEnum.FurnitureSizeY);

        if (sizeX < 1) sizeX = 1;
        if (sizeY < 1) sizeY = 1;

        let prevSizeX = sizeX;
        let prevSizeY = sizeY;

        const goalQuadrant = Math.trunc((Math.trunc(goalDirection.x + 45) % 360) / 90);
        if (goalQuadrant === 1 || goalQuadrant === 3) [sizeX, sizeY] = [sizeY, sizeX];

        const dirQuadrant = Math.trunc((Math.trunc(direction.x + 45) % 360) / 90);
        if (dirQuadrant === 1 || dirQuadrant === 3) [prevSizeX, prevSizeY] = [prevSizeY, prevSizeX];

        const alwaysStackable = object.model.getValue<number>(RoomObjectVariableEnum.FurnitureAlwaysStackable) === 1;

        return room.instance.furnitureStackingHeightMap.validateLocation(
            location.x, location.y, sizeX, sizeY,
            location.x, location.y, prevSizeX, prevSizeY,
            alwaysStackable, location.z,
        );
    };

    const getValidRoomObjectDirection = (roomObject: IRoomObjectController, forward: boolean) => {
        if (!roomObject?.model) return 0;

        const allowedDirections: number[] = roomObject.type === RoomObjectUserTypeName.MonsterPlant
            ? roomObject.model.getValue<number[]>(RoomObjectVariableEnum.PetAllowedDirections)
            : roomObject.model.getValue<number[]>(RoomObjectVariableEnum.FurnitureAllowedDirections);

        const direction = roomObject.getDirection().x;

        if (!allowedDirections?.length) return direction;

        let dirIndex = allowedDirections.indexOf(direction);

        if (dirIndex < 0) {
            const insertAt = allowedDirections.findIndex(d => direction <= d);
            dirIndex = insertAt < 0 ? 0 : insertAt;
        }

        dirIndex = forward
            ? (dirIndex + 1) % allowedDirections.length
            : (dirIndex - 1 + allowedDirections.length) % allowedDirections.length;

        return allowedDirections[dirIndex];
    };

    return { setFurnitureAlphaMultiplier, getActiveSurfaceLocation, validateFurnitureLocation, validateWallItemLocation, isValidLocation, getValidRoomObjectDirection };
}