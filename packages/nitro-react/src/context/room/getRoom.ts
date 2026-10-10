import { RoomObjectOperationType, RoomObjectVariableEnum } from '@nitrodevco/nitro-api';

import { roomStore } from './store/RoomStore';

/**
 * The room as it is right now, for code that runs outside React - packet handlers above all.
 * Read it when the packet lands, never at registration: packets arrive in batches with no render
 * between them, and a room captured earlier can be the one that was just left.
 */
export const getRoom = () => roomStore.getState().room;

/**
 * The selected object while it follows the pointer - being placed from the inventory or the
 * catalogue, or moved - read at the moment of a pointer event or frame; undefined otherwise.
 */
export const getRoomObjectBeingPlaced = () => {
    const selected = roomStore.getState().selectedObject;
    const operation = selected?.operation;

    return ((operation === RoomObjectOperationType.OBJECT_PLACE) || (operation === RoomObjectOperationType.OBJECT_MOVE)) ? selected : undefined;
};

/** The patterns Flash falls back to for a room with none of its own. */
const DEFAULT_WALL_TYPE = '101';
const DEFAULT_FLOOR_TYPE = '101';
const DEFAULT_LANDSCAPE_TYPE = '1.1';

/**
 * The current room's wallpaper, floor and landscape patterns, each defaulting as Flash's
 * catalogue `updateRoom`, `ProductViewCatalogWidget.onPreviewProduct` and the inventory's
 * `FurniView.updateItemView` do - for previewing a paper over the room's own.
 */
export const getRoomPatterns = () => {
    const room = getRoom();

    return {
        wallType: room?.getRoomValue<string>(RoomObjectVariableEnum.RoomWallType) || DEFAULT_WALL_TYPE,
        floorType: room?.getRoomValue<string>(RoomObjectVariableEnum.RoomFloorType) || DEFAULT_FLOOR_TYPE,
        landscapeType: room?.getRoomValue<string>(RoomObjectVariableEnum.RoomLandscapeType) || DEFAULT_LANDSCAPE_TYPE,
    };
};
