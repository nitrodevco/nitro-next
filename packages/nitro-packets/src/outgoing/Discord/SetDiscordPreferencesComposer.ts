import { IOutgoingPacket } from '@nitrodevco/nitro-api';

/**
 * Flash `DiscordSettingsController.updatePreferences`: the four boxes when the window closes, with
 * `discord_activity.settings.version` (default 1) as the version.
 */
export type SetDiscordPreferencesComposerType = {
    version: number;
    showHabbo: boolean;
    shareActivity: boolean;
    hideInHiddenRooms: boolean;
    allowJoining: boolean;
};

export class SetDiscordPreferencesComposer implements IOutgoingPacket<SetDiscordPreferencesComposerType> {
    public constructor(private params: SetDiscordPreferencesComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.version,
            this.params.showHabbo,
            this.params.shareActivity,
            this.params.hideInHiddenRooms,
            this.params.allowJoining,
        ];
    }
}
