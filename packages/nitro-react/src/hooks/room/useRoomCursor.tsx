import { RoomControllerLevelEnum, RoomObjectCategoryEnum } from "@nitrodevco/nitro-api";
import { RoomObjectFurnitureActionEvent } from "@nitrodevco/nitro-shared";
import { useRef } from "react";
import { useRoomContext } from "../context";

export const useRoomCursor = () => {
    const room = useRoomContext(x => x.room);
    const controllerLevel = useRoomContext(x => x.controllerLevel);
    const hasCursorUpdate = useRef<boolean>(false);
    const cursorOwners = useRef<string[]>([]);

    const hasCursorOwners = () => cursorOwners.current.length > 0;

    const setMouseButton = (objectId: number, category: RoomObjectCategoryEnum) => {
        if (
            (category !== RoomObjectCategoryEnum.Floor && category !== RoomObjectCategoryEnum.Wall) ||
            controllerLevel >= RoomControllerLevelEnum.Guest
        ) {
            const index = cursorOwners.current.indexOf(`${category}_${objectId}`);

            if (index === -1) {
                cursorOwners.current.push(`${category}_${objectId}`);

                hasCursorUpdate.current = true;
            }
        }
    }

    const setMouseDefault = (objectId: number, category: RoomObjectCategoryEnum) => {
        const index = cursorOwners.current.indexOf(`${category}_${objectId}`);

        if (index >= 0) {
            cursorOwners.current.splice(index, 1);

            hasCursorUpdate.current = true;
        }
    }

    const updateMousePointer = (type: string, objectId: number, objectType: string) => {
        const category = room.getRoomObjectCategoryForType(objectType);

        switch (type) {
            case RoomObjectFurnitureActionEvent.MOUSE_BUTTON:
                setMouseButton(objectId, category);
                return;
            default:
                setMouseDefault(objectId, category);
                return;
        }
    }

    return { hasCursorUpdate, hasCursorOwners, setMouseButton, setMouseDefault, updateMousePointer };
}