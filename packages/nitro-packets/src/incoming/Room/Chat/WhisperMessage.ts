import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { ChatLinksParser, IChatLink } from './Data/ChatLinkParser';

export type WhisperMessageType = {
    objectId: number;
    text: string;
    gesture: number;
    styleId: number;
    links: IChatLink[];
    trackingId: number;
};

/** Mirrors the Flash `RoomUserWhisperMessageParser`: user index, text, gesture, style, links, tracking id. */
export class WhisperMessage implements IIncomingPacket<WhisperMessageType> {
    public parse(wrapper: IMessageDataWrapper): WhisperMessageType {
        const packet: WhisperMessageType = {
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
