import { ObjectStateUpdateMessage } from './ObjectStateUpdateMessage';

/** Port of Flash `RoomObjectAvatarSignUpdateMessage`. */
export class ObjectAvatarSignUpdateMessage extends ObjectStateUpdateMessage {
    private _signType: number;

    constructor(signType: number = 0) {
        super();

        this._signType = signType;
    }

    public get signType(): number {
        return this._signType;
    }
}
