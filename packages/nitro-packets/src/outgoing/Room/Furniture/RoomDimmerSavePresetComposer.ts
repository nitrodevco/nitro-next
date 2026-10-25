// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type RoomDimmerSavePresetComposerType = {
    presetNumber: number;
    effectTypeId: number;
    /** `#RRGGBB`, upper case, as `RoomSession.sendRoomDimmerSavePresetMessage` formats it. */
    colorHex: string;
    brightness: number;
    /** Whether to light the room with this preset straight away, or only store it. */
    apply: boolean;
    objectId: number;
};

export class RoomDimmerSavePresetComposer implements IOutgoingPacket<RoomDimmerSavePresetComposerType> {
    public constructor(private params: RoomDimmerSavePresetComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.presetNumber,
            this.params.effectTypeId,
            this.params.colorHex,
            this.params.brightness,
            this.params.apply,
            // Flash sends a second, always-false flag here that the server ignores.
            false,
            this.params.objectId,
        ];
    }
}
