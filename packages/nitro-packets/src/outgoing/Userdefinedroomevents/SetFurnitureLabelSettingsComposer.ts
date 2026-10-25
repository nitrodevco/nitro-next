import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type SetFurnitureLabelSettingsComposerType = {
    furnitureId: number;
    bubbleColor: number;
    /** 0 everyone, 1 users with wired inspection rights. */
    visibility: number;
    alwaysOpen: boolean;
};

/**
 * Flash `SetFurnitureLabelSettingsMessageComposer` (WIN63-202610121624): the label settings
 * window's Save (`FurnitureLabelWidgetHandler.saveLabelSettings`).
 */
export class SetFurnitureLabelSettingsComposer implements IOutgoingPacket<SetFurnitureLabelSettingsComposerType> {
    public constructor(private params: SetFurnitureLabelSettingsComposerType) { }

    public compose(): (number | string | boolean)[] {
        const { furnitureId, bubbleColor, visibility, alwaysOpen } = this.params;

        return [ furnitureId, bubbleColor, visibility, alwaysOpen ];
    }
}
