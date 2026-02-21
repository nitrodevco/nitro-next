import { RoomObjectUpdateMessage } from './RoomObjectUpdateMessage';

export class ObjectVisibilityUpdateMessage extends RoomObjectUpdateMessage {
    public static ENABLED: string = 'ROVUM_ENABLED';
    public static DISABLED: string = 'ROVUM_DISABLED';

    private _type: string;

    constructor(type: string) {
        super(undefined, undefined);

        this._type = type;
    }

    public get type(): string {
        return this._type;
    }
}
