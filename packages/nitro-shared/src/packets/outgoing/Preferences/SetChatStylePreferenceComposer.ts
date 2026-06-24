import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type SetChatStylePreferenceComposerType = object;

export class SetChatStylePreferenceComposer implements IOutgoingPacket<SetChatStylePreferenceComposerType> {
    public constructor(private params: SetChatStylePreferenceComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
