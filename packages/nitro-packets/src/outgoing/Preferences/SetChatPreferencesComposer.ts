import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type SetChatPreferencesComposerType = object;

export class SetChatPreferencesComposer implements IOutgoingPacket<SetChatPreferencesComposerType> {
    public constructor(private params: SetChatPreferencesComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
