import { RoomObjectCategoryEnum, Vector3d } from "@nitrodevco/nitro-api";
import { ObjectTileCursorUpdateMessage } from "@nitrodevco/nitro-renderer";
import type { RoomObjectMouseEvent } from "@nitrodevco/nitro-shared";
import { RoomObjectTileMouseEvent } from "@nitrodevco/nitro-shared";

import { useRoomContext } from "../context"
import { useRoomObjectValidation } from "./useRoomObjectValidation";

export const useRoomCursorUpdate = () => {
    const room = useRoomContext(x => x.room);
    const { getActiveSurfaceLocation } = useRoomObjectValidation();

    const handleMouseOverTile = (event: RoomObjectTileMouseEvent) =>
        new ObjectTileCursorUpdateMessage(
            new Vector3d(event.tileXAsInt, event.tileYAsInt, event.tileZAsInt),
            0, true, event.eventId,
        );

    const handleMouseOverObject = (category: RoomObjectCategoryEnum, event: RoomObjectMouseEvent) => {
        if (category !== RoomObjectCategoryEnum.Floor) return undefined;

        const roomObject = room.getRoomObject(event.objectId, RoomObjectCategoryEnum.Floor);

        if (!roomObject) return undefined;

        const location = getActiveSurfaceLocation(roomObject, event);

        if (!location || !room.instance.furnitureStackingHeightMap) return undefined;

        return new ObjectTileCursorUpdateMessage(
            new Vector3d(location.x, location.y, roomObject.getLocation().z),
            location.z, true, event.eventId,
        );
    };

    const updateCursorForEvent = (event: RoomObjectMouseEvent, clear: boolean = false) => {
        const category = room.getRoomObjectCategoryForType(event.objectType);
        const roomCursor = room.getRoomObjectCursor();

        if (!roomCursor?.logic) return;

        let cursorEvent: ObjectTileCursorUpdateMessage | undefined = undefined;

        if (event instanceof RoomObjectTileMouseEvent) {
            cursorEvent = handleMouseOverTile(event);
        } else if (event.object?.id !== -1) {
            cursorEvent = handleMouseOverObject(category, event);
        } else if (clear) cursorEvent = new ObjectTileCursorUpdateMessage(undefined, 0, false, event.eventId);

        if (cursorEvent) roomCursor.processUpdateMessage(cursorEvent);
    };

    return { handleMouseOverTile, handleMouseOverObject, updateCursorForEvent };
}