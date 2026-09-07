import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type SetChatPreferencesComposerType = {
    chatMode: number;
    chatBubbleWidth: number;
    param3: number;
};

export class SetChatPreferencesComposer implements IOutgoingPacket<SetChatPreferencesComposerType> {
    public constructor(private params: SetChatPreferencesComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            false,
            this.params.chatMode,
            this.params.chatBubbleWidth,
            this.params.param3,
        ];
    }
}
