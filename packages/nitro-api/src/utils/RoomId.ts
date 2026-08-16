export class RoomId {
    public static TEMP_ROOM_CATALOG: number = 1;
    public static TEMP_ROOM_COUNTER: number = 0;

    private static PREVIEW_ROOM_ID_BASE: number = 0x7FFF0000;

    public static makeRoomPreviewerId(roomId: number): number {
        return (roomId & 0xFFFF) + RoomId.PREVIEW_ROOM_ID_BASE;
    }

    public static isRoomPreviewerId(roomId: number): boolean {
        return (roomId >= RoomId.PREVIEW_ROOM_ID_BASE);
    }
}
