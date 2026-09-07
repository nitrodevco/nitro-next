import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { ChatLinksParser, IChatLink } from './Data/ChatLinkParser';

export type ShoutMessageType = {
    objectId: number;
    text: string;
    gesture: number;
    styleId: number;
    links: IChatLink[];
    trackingId: number;
};

/** Mirrors the Flash `RoomUserShoutMessageParser`: user index, text, gesture, style, links, tracking id. */
export class ShoutMessage implements IIncomingPacket<ShoutMessageType> {
    public parse(wrapper: IMessageDataWrapper): ShoutMessageType {
        const packet: ShoutMessageType = {
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
