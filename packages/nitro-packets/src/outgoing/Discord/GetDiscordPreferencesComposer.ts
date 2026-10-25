import { IOutgoingPacket } from '@nitrodevco/nitro-api';

/** Flash `GetDiscordPreferencesMessageComposer`, sent once by `DiscordSettingsController.initComponent`. */
export type GetDiscordPreferencesComposerType = object;

export class GetDiscordPreferencesComposer implements IOutgoingPacket<GetDiscordPreferencesComposerType> {
    public constructor(private params: GetDiscordPreferencesComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
