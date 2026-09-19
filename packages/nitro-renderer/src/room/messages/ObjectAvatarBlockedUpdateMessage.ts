import { ObjectStateUpdateMessage } from './ObjectStateUpdateMessage';

/**
 * Flash `RoomObjectAvatarBlockedUpdateMessage`: the user behind this avatar was blocked or
 * unblocked, so the avatar swaps between its own figure and the generic blocked one.
 */
export class ObjectAvatarBlockedUpdateMessage extends ObjectStateUpdateMessage {
    private _isBlocked: boolean;

    constructor(flag: boolean) {
        super();

        this._isBlocked = flag;
    }

    public get isBlocked(): boolean {
        return this._isBlocked;
    }
}
