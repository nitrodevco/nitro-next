import { RoomObjectUpdateMessage } from './RoomObjectUpdateMessage';

/** Port of Flash `RoomObjectUpdateStateMessage`. */
export class ObjectStateUpdateMessage extends RoomObjectUpdateMessage {
    constructor() {
        super(undefined, undefined);
    }
}
