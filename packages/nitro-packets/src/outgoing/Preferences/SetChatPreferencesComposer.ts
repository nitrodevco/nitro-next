// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

/**
 * `HabboFreeFlowChat.sendChatPreferences`. The leading `false` is a field the Flash composer
 * pushes ahead of the three settings and never fills from an argument; it is sent as Flash sends it.
 */
export type SetChatPreferencesComposerType = {
    /** `RoomChatModeType`. */
    chatMode: number;
    /** `RoomChatBubbleWidthType`. */
    chatBubbleWidth: number;
    /** `RoomChatScrollSpeedType`. */
    chatScrollSpeed: number;
};

export class SetChatPreferencesComposer implements IOutgoingPacket<SetChatPreferencesComposerType> {
    public constructor(private params: SetChatPreferencesComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            false,
            this.params.chatMode,
            this.params.chatBubbleWidth,
            this.params.chatScrollSpeed,
        ];
    }
}
