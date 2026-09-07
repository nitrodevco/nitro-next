import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { ChatLinksParser, IChatLink } from './Data/ChatLinkParser';

export type ChatMessageType = {
    objectId: number;
    text: string;
    gesture: number;
    styleId: number;
    links: IChatLink[];
    trackingId: number;
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
        };

        return packet;
    }
}
