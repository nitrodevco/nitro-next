import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type SetChatStylePreferenceComposerType = {
    param1: number;
    chatFontSizeMode: number;
};

export class SetChatStylePreferenceComposer implements IOutgoingPacket<SetChatStylePreferenceComposerType> {
    public constructor(private params: SetChatStylePreferenceComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.param1,
            this.params.chatFontSizeMode,
        ];
    }
}
