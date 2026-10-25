import { RoomObjectCategoryEnum, RoomObjectMouseEvent, RoomObjectTileMouseEvent, RoomObjectVariableEnum, Vector3d } from '@nitrodevco/nitro-api';
import { ObjectTileCursorUpdateMessage } from '@nitrodevco/nitro-renderer';

import { useRoom } from '#base/context/room';

import { useRoomObjectValidation } from './useRoomObjectValidation';

/**
 * Which cursor the room shows for what is under the mouse - the cursor half of Flash's
 * `RoomObjectEventHandler`: a pointer over furniture you can use or move, the walk cursor over
 * a free tile.
 */
export const useRoomCursorUpdate = () => {
    const room = useRoom();
    const { getActiveSurfaceLocation } = useRoomObjectValidation();

    /**
     * `handleMouseOverTile`. Outside area selection ("where you click, where you go") the cursor
     * sits on the tile; while an area is being picked it rises over variable-height furniture to
     * the stacking height, less the floor's own height.
     */
    const handleMouseOverTile = (event: RoomObjectTileMouseEvent) => {
        const location = new Vector3d(event.tileXAsInt, event.tileYAsInt, event.tileZAsInt);

        if (!room?.isAreaSelectionMode) return new ObjectTileCursorUpdateMessage(location, 0, true, event.eventId);

        const tileObjectMap = room.tileObjectMap;

        if (!tileObjectMap) return undefined;

        const object = tileObjectMap.getObjectIntTile(location.x, location.y);

        if (object?.model && (object.model.getValue<number>(RoomObjectVariableEnum.FurnitureIsVariableHeight) > 0)) {
            const stackingHeight = room.getTileHeight(location.x, location.y);
            const floorHeight = room.legacyGeometry?.getHeight(location.x, location.y) ?? 0;

            return new ObjectTileCursorUpdateMessage(location, (stackingHeight - floorHeight), true, event.eventId);
        }

        return new ObjectTileCursorUpdateMessage(location, 0, true, event.eventId);
    };

    const handleMouseOverObject = (category: RoomObjectCategoryEnum, event: RoomObjectMouseEvent) => {
        if (!room || category !== RoomObjectCategoryEnum.Floor) return undefined;

        const roomObject = room.getRoomObject(event.objectId, RoomObjectCategoryEnum.Floor);

        if (!roomObject) return undefined;

        const location = getActiveSurfaceLocation(roomObject, event);

        if (!location) return undefined;

        return new ObjectTileCursorUpdateMessage(
            new Vector3d(location.x, location.y, roomObject.getLocation().z),
            location.z,
            true,
            event.eventId,
        );
    };

    /*
     * `handleRoomObjectMouseMove`'s cursor half: over a tile it follows the tile, over an object its
     * surface, and over nothing it is hidden. Flash only ran this on a mouse move; the port also
     * runs it on a click, so a tap - which moves no pointer first - still places the cursor.
     */
    const updateCursorForEvent = (event: RoomObjectMouseEvent) => {
        if (!room) return;

        const category = room.getRoomObjectCategoryForType(event.objectType);
        const roomCursor = room.getRoomObjectCursor();

        if (!roomCursor?.logic) return;

        let cursorEvent: ObjectTileCursorUpdateMessage | undefined = undefined;

        if (event instanceof RoomObjectTileMouseEvent) {
            cursorEvent = handleMouseOverTile(event);
        } else if (event.object && (event.object.id !== -1)) {
            if (!room.isAreaSelectionMode) cursorEvent = handleMouseOverObject(category, event);
        } else cursorEvent = new ObjectTileCursorUpdateMessage(undefined, 0, false, event.eventId);

        if (cursorEvent) roomCursor.processUpdateMessage(cursorEvent);
    };

    return { handleMouseOverTile, handleMouseOverObject, updateCursorForEvent };
};
