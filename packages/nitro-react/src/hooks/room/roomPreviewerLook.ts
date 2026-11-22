/**
 * Not Flash's: `room.previewer`, the hotel variable a theme gives the previewer's room another look
 * with - the room every object showcase draws in (the catalogue's product view, the inventory's
 * preview). Flash's `RoomPreviewer.createRoomForPreviews` lays floor `110` and wall `99999` under the
 * room's planes, which is what stays while the variable is unset. A theme names other plane types of the
 * room's visualization (each its own colour and texture): `{ "floorType": "<id>", "wallType": "<id>", "landscapeType": "<id>" }`,
 * the object or the object as JSON text; a field left out keeps Flash's. Read once, when a previewer
 * room is first made. Kept free of runtime imports, so a test can run it under Node.
 */
export const ROOM_PREVIEWER_KEY = 'room.previewer';

export interface RoomPreviewerLook {
    floorType: string;
    wallType: string;
    landscapeType?: string;
}

/** `RoomPreviewer.as` `updateObjectRoom(PREVIEW_OBJECT_ID, "110", "99999")`. */
export const FLASH_ROOM_PREVIEWER_LOOK: RoomPreviewerLook = { floorType: '110', wallType: '99999' };

const planeType = (value: unknown) => ((typeof value === 'string' && value.trim().length) ? value.trim() : (typeof value === 'number' && Number.isFinite(value)) ? String(value) : undefined);

/** The look a `room.previewer` value asks for: Flash's for anything it leaves out or gets wrong. */
export const readRoomPreviewerLook = (value: unknown): RoomPreviewerLook => {
    let parsed = value;

    if (typeof parsed === 'string') {
        try {
            parsed = JSON.parse(parsed) as unknown;
        } catch {
            return FLASH_ROOM_PREVIEWER_LOOK;
        }
    }

    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return FLASH_ROOM_PREVIEWER_LOOK;

    const entry = parsed as Record<string, unknown>;
    const landscapeType = planeType(entry.landscapeType);

    return {
        floorType: planeType(entry.floorType) ?? FLASH_ROOM_PREVIEWER_LOOK.floorType,
        wallType: planeType(entry.wallType) ?? FLASH_ROOM_PREVIEWER_LOOK.wallType,
        ...(landscapeType !== undefined && { landscapeType }),
    };
};
