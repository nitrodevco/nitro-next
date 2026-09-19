// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { ChatLinksParser, IChatLink } from './Data/ChatLinkParser';

export type ChatMessageType = {
    objectId: number;
    text: string;
    gesture: number;
    styleId: number;
    links: IChatLink[];
    trackingId: number;
    /** Whom the line is addressed to, when the server says; -1 otherwise. */
    receiverRoomIndex: number;
    /** A bubble width the server forces for this line; 0 leaves it to the user's setting. */
    chatBubbleWidthOverride: number;
};

/** Mirrors the Flash `RoomUserChatMessageParser`: user index, text, gesture, style, links, tracking id. */
export class ChatMessage implements IIncomingPacket<ChatMessageType> {
    public parse(wrapper: IMessageDataWrapper): ChatMessageType {
        const packet: ChatMessageType = {
            objectId: wrapper.readInt(),
            text: wrapper.readString(),
            gesture: wrapper.readInt(),
            styleId: wrapper.readInt(),
            links: ChatLinksParser(wrapper),
            trackingId: wrapper.readInt(),
            receiverRoomIndex: -1,
            chatBubbleWidthOverride: 0,
        };

        if (wrapper.bytesAvailable) packet.receiverRoomIndex = wrapper.readInt();
        if (wrapper.bytesAvailable) packet.chatBubbleWidthOverride = wrapper.readInt();

        return packet;
    }
}
