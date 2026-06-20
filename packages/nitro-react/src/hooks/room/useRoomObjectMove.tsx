import type { IRoomObjectController, ISelectedRoomObjectData, IVector3D } from "@nitrodevco/nitro-api";
import { RoomObjectCategoryEnum, Vector3d } from "@nitrodevco/nitro-api";
import type { RoomObjectMouseEvent } from "@nitrodevco/nitro-shared";
import { RoomObjectTileMouseEvent, RoomObjectWallMouseEvent } from "@nitrodevco/nitro-shared";

import { useRoomSelector } from "#base/selectors";

import { useRoomObjectValidation } from "./useRoomObjectValidation";

export const useRoomObjectMove = () => {
    const room = useRoomSelector();
    const { setFurnitureAlphaMultiplier, validateFurnitureLocation, validateWallItemLocation, getValidRoomObjectDirection } = useRoomObjectValidation();

    const handleFurnitureMove = (
        roomObject: IRoomObjectController,
        selectedObjectData: ISelectedRoomObjectData,
        x: number,
        y: number,
    ) => {
        if (!roomObject || !selectedObjectData) return false;

        const realDir = new Vector3d();
        realDir.assign(roomObject.getDirection());

        roomObject.setDirection(selectedObjectData.dir);

        const newLoc = new Vector3d(x, y, 0);
        const newDir = new Vector3d();
        newDir.assign(roomObject.getDirection());

        let loc = validateFurnitureLocation(roomObject, newLoc, selectedObjectData.loc, selectedObjectData.dir);

        if (!loc) {
            newDir.x = getValidRoomObjectDirection(roomObject, true);
            roomObject.setDirection(newDir);
            loc = validateFurnitureLocation(roomObject, newLoc, selectedObjectData.loc, selectedObjectData.dir);
        }

        if (!loc) {
            roomObject.setDirection(realDir);
            return false;
        }

        roomObject.setLocation(loc);
        roomObject.setDirection(newDir);

        return true;
    };

    const handleWallItemMove = (
        roomObject: IRoomObjectController,
        selectedObjectData: ISelectedRoomObjectData,
        wallLocation: IVector3D,
        wallWidth: IVector3D,
        wallHeight: IVector3D,
        posX: number,
        posY: number,
        direction: number,
    ) => {
        if (!roomObject || !selectedObjectData) return false;

        const newLocation = validateWallItemLocation(roomObject, wallLocation, wallWidth, wallHeight, posX, posY, selectedObjectData);

        if (!newLocation) return false;

        roomObject.setLocation(newLocation);
        roomObject.setDirection(new Vector3d(direction));

        return true;
    };

    const handleObjectMove = (event: RoomObjectMouseEvent, selectedObject: ISelectedRoomObjectData | undefined) => {
        if (!event || !selectedObject) return;

        const roomObject = room.getRoomObject(selectedObject.objectId, selectedObject.category);

        if (!roomObject) return;

        let added = true;

        if (selectedObject.category === RoomObjectCategoryEnum.Floor || selectedObject.category === RoomObjectCategoryEnum.Unit) {
            if (!(event instanceof RoomObjectTileMouseEvent && handleFurnitureMove(roomObject, selectedObject, Math.trunc(event.tileX + 0.5), Math.trunc(event.tileY + 0.5)))) {
                added = false;
            }
        } else if (selectedObject.category === RoomObjectCategoryEnum.Wall) {
            added = false;

            if (event instanceof RoomObjectWallMouseEvent) {
                if (handleWallItemMove(roomObject, selectedObject, event.wallLocation, event.wallWidth, event.wallHeight, event.x, event.y, event.direction))
                    added = true;
            }

            if (!added) {
                roomObject.setLocation(selectedObject.loc);
                roomObject.setDirection(selectedObject.dir);
            }

            room.updateRoomObjectMask(selectedObject.objectId, added);
        }

        if (added) {
            setFurnitureAlphaMultiplier(roomObject, 0.5);

            room.setRoomOverlayIconSpriteVisibility(false);
        } else {
            setFurnitureAlphaMultiplier(roomObject, 0);

            room.setRoomOverlayIconSpriteVisibility(true);
        }
    };

    return { handleFurnitureMove, handleWallItemMove, handleObjectMove };
}