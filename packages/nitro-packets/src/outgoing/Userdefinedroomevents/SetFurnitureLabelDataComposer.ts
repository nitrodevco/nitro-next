import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type SetFurnitureLabelDataComposerType = {
    furnitureId: number;
    text: string;
};

/**
 * Flash `SetFurnitureLabelDataMessageComposer` (WIN63-202610121624): a label's text, sent by
 * `FurnitureLabelWidgetHandler.saveLabel` when the bubble closes or loses focus with new text.
 */
export class SetFurnitureLabelDataComposer implements IOutgoingPacket<SetFurnitureLabelDataComposerType> {
    public constructor(private params: SetFurnitureLabelDataComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [ this.params.furnitureId, this.params.text ];
    }
}
