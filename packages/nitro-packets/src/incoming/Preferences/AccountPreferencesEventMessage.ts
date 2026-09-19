// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type AccountPreferencesEventMessageType = {
    uiVolume: number;
    furniVolume: number;
    traxVolume: number;
    freeFlowChatDisabled: boolean;
    roomInvitesIgnored: boolean;
    roomCameraFollowDisabled: boolean;
    uiFlags: number;
    preferedChatStyle: number;
    wiredMenuButton: boolean;
    wiredInspectButton: boolean;
    playTestMode: boolean;
    variableSyntaxMode: number;
    wiredWhisperDisabled: boolean;
    showAllNotifications: boolean;
    wiredUIStyle: string;
    chatSizePreference: number;
    chatMode: number;
    chatBubbleWidth: number;
    chatScrollSpeed: number;
    /** Who sees you as online in the messenger; 0 is everyone. */
    onlineIndicatorPreference: number;
};

export class AccountPreferencesEventMessage implements IIncomingPacket<AccountPreferencesEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): AccountPreferencesEventMessageType {
        const packet: AccountPreferencesEventMessageType = {
            uiVolume: wrapper.readInt(),
            furniVolume: wrapper.readInt(),
            traxVolume: wrapper.readInt(),
            freeFlowChatDisabled: wrapper.readBoolean(),
            roomInvitesIgnored: wrapper.readBoolean(),
            roomCameraFollowDisabled: wrapper.readBoolean(),
            uiFlags: wrapper.readInt(),
            preferedChatStyle: wrapper.readInt(),
            wiredMenuButton: wrapper.readBoolean(),
            wiredInspectButton: wrapper.readBoolean(),
            playTestMode: wrapper.readBoolean(),
            variableSyntaxMode: wrapper.readInt(),
            wiredWhisperDisabled: wrapper.readBoolean(),
            showAllNotifications: false,
            wiredUIStyle: '',
            chatSizePreference: 0,
            chatMode: 0,
            chatBubbleWidth: 1,
            chatScrollSpeed: 1,
            onlineIndicatorPreference: 0,
        };

        // Everything from here on was added to the packet over time; Flash reads each only while
        // bytes remain and otherwise keeps the default above, so an older server still parses.
        if (wrapper.bytesAvailable) packet.showAllNotifications = wrapper.readBoolean();
        if (wrapper.bytesAvailable) packet.wiredUIStyle = wrapper.readString();
        if (wrapper.bytesAvailable) packet.chatSizePreference = wrapper.readInt();
        if (wrapper.bytesAvailable) packet.chatMode = wrapper.readInt();
        if (wrapper.bytesAvailable) packet.chatBubbleWidth = wrapper.readInt();
        if (wrapper.bytesAvailable) packet.chatScrollSpeed = wrapper.readInt();
        if (wrapper.bytesAvailable) packet.onlineIndicatorPreference = wrapper.readInt();

        return packet;
    }
}
