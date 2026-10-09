import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IRaidProtectionSettings } from './Data/IRaidProtectionSettings';
import { RaidProtectionSettingsAfterRoomIdParser } from './Data/RaidProtectionSettingsParser';

export type RaidProtectionSettingsResultMessageType = {
    /** 0 saved; 1-6 the `raid.protection.settings.save.fail.<code>` reasons. */
    resultCode: number;
    /** The settings in force after the save. */
    settings: IRaidProtectionSettings;
};

/** The room id, then the result code, then the rest of the settings. */
export class RaidProtectionSettingsResultMessage implements IIncomingPacket<RaidProtectionSettingsResultMessageType> {
    public parse(wrapper: IMessageDataWrapper): RaidProtectionSettingsResultMessageType {
        const roomId = wrapper.readInt();
        const resultCode = wrapper.readInt();
        const packet: RaidProtectionSettingsResultMessageType = {
            resultCode,
            settings: RaidProtectionSettingsAfterRoomIdParser(roomId, wrapper),
        };

        return packet;
    }
}
