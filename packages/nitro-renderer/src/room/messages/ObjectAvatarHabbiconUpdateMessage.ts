/**
 * Ports `RoomObjectAvatarHabbiconUpdateMessage`: the habbicon a user plays in the room, by id.
 */
import { ObjectStateUpdateMessage } from './ObjectStateUpdateMessage';

export class ObjectAvatarHabbiconUpdateMessage extends ObjectStateUpdateMessage {
    private _habbiconId: number;

    constructor(habbiconId: number) {
        super();

        this._habbiconId = habbiconId;
    }

    public get habbiconId(): number {
        return this._habbiconId;
    }
}
