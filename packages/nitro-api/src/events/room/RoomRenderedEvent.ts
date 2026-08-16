import { RoomEngineEvent } from './RoomEngineEvent';

export class RoomRenderedEvent extends RoomEngineEvent {
    public static ROOM_RENDERED: string = 'RER_ROOM_RENDERED' as const;

    private _time: number = -1;

    constructor(roomId: number, time: number) {
        super(RoomRenderedEvent.ROOM_RENDERED, roomId);

        this._time = time;
    }

    public get time(): number {
        return this._time;
    }
}
