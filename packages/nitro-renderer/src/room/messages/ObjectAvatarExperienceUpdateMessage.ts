import { ObjectStateUpdateMessage } from './ObjectStateUpdateMessage';

/** Port of Flash `RoomObjectAvatarExperienceUpdateMessage`. */
export class ObjectAvatarExperienceUpdateMessage extends ObjectStateUpdateMessage {
    private _gainedExperience: number;

    constructor(amount: number) {
        super();

        this._gainedExperience = amount;
    }

    public get gainedExperience(): number {
        return this._gainedExperience;
    }
}
