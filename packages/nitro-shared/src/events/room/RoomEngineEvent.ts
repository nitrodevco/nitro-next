import { NitroEvent } from '../common';

export class RoomEngineEvent extends NitroEvent {
    public static INITIALIZED: string = 'REE_INITIALIZED' as const;
    public static ENGINE_INITIALIZED: string = 'REE_ENGINE_INITIALIZED' as const;
    public static OBJECTS_INITIALIZED: string = 'REE_OBJECTS_INITIALIZED' as const;
    public static NORMAL_MODE: string = 'REE_NORMAL_MODE' as const;
    public static GAME_MODE: string = 'REE_GAME_MODE' as const;
    public static ROOM_ZOOMED: string = 'REE_ROOM_ZOOMED' as const;
    public static DISPOSED: string = 'REE_DISPOSED' as const;

    private _roomId: number;

    constructor(type: string, roomId: number) {
        super(type);

        this._roomId = roomId;
    }

    public get roomId(): number {
        return this._roomId;
    }
}
