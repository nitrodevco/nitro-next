import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

/**
 * Flash `DiscordPreferencesMessageEvent` (`parser/discord/DiscordPreferences.readFromData`): the
 * Discord settings window's four boxes and the settings version they were saved under. Version 0
 * is never saved; `DiscordSettingsController.onDiscordPreferences` then ticks every box itself.
 */
export type DiscordPreferencesMessageType = {
    version: number;
    showHabbo: boolean;
    shareActivity: boolean;
    hideInHiddenRooms: boolean;
    allowJoining: boolean;
};

export class DiscordPreferencesMessage implements IIncomingPacket<DiscordPreferencesMessageType> {
    public parse(wrapper: IMessageDataWrapper): DiscordPreferencesMessageType {
        return {
            version: wrapper.readInt(),
            showHabbo: wrapper.readBoolean(),
            shareActivity: wrapper.readBoolean(),
            hideInHiddenRooms: wrapper.readBoolean(),
            allowJoining: wrapper.readBoolean(),
        };
    }
}
