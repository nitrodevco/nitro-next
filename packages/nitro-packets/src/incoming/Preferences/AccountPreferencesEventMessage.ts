import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

// TODO(UIFlags: UIFlags): Unknown type 'UIFlags'. Add override mapping.

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
            showAllNotifications: wrapper.readBoolean(),
            wiredUIStyle: wrapper.readString(),
            chatSizePreference: wrapper.readInt(),
            chatMode: wrapper.readInt(),
            chatBubbleWidth: wrapper.readInt(),
            chatScrollSpeed: wrapper.readInt(),
        };

        return packet;
    }
}
