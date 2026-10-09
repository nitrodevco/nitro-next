import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IRaidProtectionSettings } from './Data/IRaidProtectionSettings';
import { RaidProtectionSettingsParser } from './Data/RaidProtectionSettingsParser';

export type RaidProtectionSettingsMessageType = {
    settings: IRaidProtectionSettings;
};

export class RaidProtectionSettingsMessage implements IIncomingPacket<RaidProtectionSettingsMessageType> {
    public parse(wrapper: IMessageDataWrapper): RaidProtectionSettingsMessageType {
        const packet: RaidProtectionSettingsMessageType = {
            settings: RaidProtectionSettingsParser(wrapper),
        };

        return packet;
    }
}
