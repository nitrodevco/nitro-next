// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type WiredUpdateRoomComposerType = {
    /** True rolls the room back to its saved state (after a confirm); false only reloads the wired. */
    rollback: boolean;
};

/** Flash `WiredUpdateRoomComposer`, sent by `WiredMenuSettingsTab` and by the `:wired` chat commands in `ChatInputWidgetHandler`. */
export class WiredUpdateRoomComposer implements IOutgoingPacket<WiredUpdateRoomComposerType> {
    public constructor(private params: WiredUpdateRoomComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.rollback,
        ];
    }
}
