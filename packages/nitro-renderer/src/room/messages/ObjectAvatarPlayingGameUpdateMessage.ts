import { ObjectStateUpdateMessage } from './ObjectStateUpdateMessage';

/** Port of Flash `RoomObjectAvatarPlayingGameMessage`. */
export class ObjectAvatarPlayingGameUpdateMessage extends ObjectStateUpdateMessage {
    private _isPlayingGame: boolean;

    constructor(flag: boolean) {
        super();

        this._isPlayingGame = flag;
    }

    public get isPlayingGame(): boolean {
        return this._isPlayingGame;
    }
}
