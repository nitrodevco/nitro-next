import { RoomObjectUpdateMessage } from './RoomObjectUpdateMessage';

/**
 * Port of Flash `RoomObjectFurnitureHighlightUpdateMessage` (WIN63-202610201032): a WIRED Set Highlight
 * for one furni, user, pet or bot. `initialize` (a room-entry state, a restored object) skips the easing.
 */
export class RoomObjectFurnitureHighlightUpdateMessage extends RoomObjectUpdateMessage {
    constructor(
        public readonly highlightType: number,
        public readonly strength: number,
        public readonly color: number,
        public readonly animationMode: number,
        public readonly easingMode: number,
        public readonly initialize: boolean = false,
    ) {
        super(undefined, undefined);
    }
}
