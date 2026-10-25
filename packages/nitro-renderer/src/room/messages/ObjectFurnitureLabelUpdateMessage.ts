import { FurnitureLabelData } from '@nitrodevco/nitro-api';

import { RoomObjectUpdateMessage } from './RoomObjectUpdateMessage';

/**
 * Port of Flash `RoomObjectFurnitureLabelUpdateMessage` (WIN63-202610121624): a label's text,
 * bubble colour, visibility and "always open" for a `furniture_label` furni; no text takes the
 * label away.
 */
export class ObjectFurnitureLabelUpdateMessage extends RoomObjectUpdateMessage {
    constructor(
        public readonly text: string | undefined,
        public readonly bubbleColor: number = FurnitureLabelData.DEFAULT_COLOR,
        public readonly visibility: number = FurnitureLabelData.VISIBILITY_WIRED_INSPECTORS,
        public readonly alwaysOpen: boolean = false,
    ) {
        super(undefined, undefined);
    }
}
