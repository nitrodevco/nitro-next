import { RoomControllerLevelEnum } from '@nitrodevco/nitro-api';

import { ObjectStateUpdateMessage } from './ObjectStateUpdateMessage';

export class ObjectAvatarFlatControlUpdateMessage extends ObjectStateUpdateMessage {
    private _level: RoomControllerLevelEnum;

    constructor(level: RoomControllerLevelEnum = RoomControllerLevelEnum.None) {
        super();

        this._level = level;
    }

    public get level(): RoomControllerLevelEnum {
        return this._level;
    }
}
