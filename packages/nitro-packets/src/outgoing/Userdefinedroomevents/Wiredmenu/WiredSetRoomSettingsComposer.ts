// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type WiredSetRoomSettingsComposerType = {
    /** Who may modify wired: the bit mask `WiredRoomSettingsMessage.modifyPermissionMask` came in as. */
    modifyPermissionMask: number;
    /** Who may read wired, in the same bits. */
    readPermissionMask: number;
    /** The room's timezone id, as chosen in the settings tab. */
    timezone: string;
};

/** Flash `WiredSetRoomSettingsMessageComposer`, sent by `WiredMenuSettingsTab`; the same three fields `WiredRoomSettingsMessage` delivers. */
export class WiredSetRoomSettingsComposer implements IOutgoingPacket<WiredSetRoomSettingsComposerType> {
    public constructor(private params: WiredSetRoomSettingsComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.modifyPermissionMask,
            this.params.readPermissionMask,
            this.params.timezone,
        ];
    }
}
