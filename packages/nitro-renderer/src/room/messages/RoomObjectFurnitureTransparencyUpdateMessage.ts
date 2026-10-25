import { RoomObjectUpdateMessage } from './RoomObjectUpdateMessage';

/**
 * Port of Flash `RoomObjectFurnitureTransparencyUpdateMessage` (WIN63-202610201032): a WIRED Set Visibility
 * for one furni, user, pet or bot. `initialize` (a room-entry state, a restored object) skips the easing.
 */
export class RoomObjectFurnitureTransparencyUpdateMessage extends RoomObjectUpdateMessage {
    constructor(
        public readonly transparency: number,
        public readonly allowClickThrough: boolean,
        public readonly easingMode: number,
        public readonly initialize: boolean = false,
    ) {
        super(undefined, undefined);
    }
}
