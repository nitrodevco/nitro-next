import { ObjectStateUpdateMessage } from './ObjectStateUpdateMessage';

/** Port of Flash `RoomObjectAvatarPetGestureUpdateMessage`. */
export class ObjectAvatarPetGestureUpdateMessage extends ObjectStateUpdateMessage {
    private _gesture: string;

    constructor(gesture: string) {
        super();

        this._gesture = gesture;
    }

    public get gesture(): string {
        return this._gesture;
    }
}
