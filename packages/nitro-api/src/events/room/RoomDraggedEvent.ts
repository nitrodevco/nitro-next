import { RoomEngineEvent } from "./RoomEngineEvent";

export class RoomDraggedEvent extends RoomEngineEvent {
    public static ROOM_DRAGGED: string = 'RDE_ROOM_DRAGGED' as const;

    private _offsetX: number;
    private _offsetY: number;

    constructor(roomId: number, offsetX: number, offsetY: number) {
        super(RoomDraggedEvent.ROOM_DRAGGED, roomId);

        this._offsetX = offsetX;
        this._offsetY = offsetY;
    }

    public get offsetX(): number {
        return this._offsetX;
    }

    public get offsetY(): number {
        return this._offsetY;
    }
}