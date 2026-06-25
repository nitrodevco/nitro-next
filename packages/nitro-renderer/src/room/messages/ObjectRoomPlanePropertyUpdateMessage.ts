import { RoomObjectUpdateMessage } from './RoomObjectUpdateMessage';

export class ObjectRoomPlanePropertyUpdateMessage extends RoomObjectUpdateMessage {
    public static WALL_THICKNESS: string = 'RORPPUM_WALL_THICKNESS' as const;
    public static FLOOR_THICKNESS: string = 'RORPVUM_FLOOR_THICKNESS' as const;

    private _type: string;
    private _value: number;

    constructor(type: string, value: number) {
        super(undefined, undefined);

        this._type = type;
        this._value = value;
    }

    public get type(): string {
        return this._type;
    }

    public get value(): number {
        return this._value;
    }
}
