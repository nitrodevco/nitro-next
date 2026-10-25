import { RoomObjectUpdateMessage } from './RoomObjectUpdateMessage';

/** Port of Flash `RoomObjectItemDataUpdateMessage`. */
export class ObjectItemDataUpdateMessage extends RoomObjectUpdateMessage {
    private _data: string;

    constructor(data: string) {
        super(undefined, undefined);

        this._data = data;
    }

    public get data(): string {
        return this._data;
    }
}
