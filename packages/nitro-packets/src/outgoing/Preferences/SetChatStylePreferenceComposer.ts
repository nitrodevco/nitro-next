// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

/**
 * `HabboFreeFlowChat.preferedChatStyle` / `chatFontSizeMode` setters: both send the pair, the
 * bubble style the user's messages go out in and the chat font size mode (0-4).
 */
export type SetChatStylePreferenceComposerType = {
    preferredChatStyle: number;
    chatFontSizeMode: number;
};

export class SetChatStylePreferenceComposer implements IOutgoingPacket<SetChatStylePreferenceComposerType> {
    public constructor(private params: SetChatStylePreferenceComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.preferredChatStyle,
            this.params.chatFontSizeMode,
        ];
    }
}
