import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type ClubGiftSelectedEventMessageType = object;

export class ClubGiftSelectedEventMessage implements IIncomingPacket<ClubGiftSelectedEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): ClubGiftSelectedEventMessageType {
        const packet: ClubGiftSelectedEventMessageType = {
        };

        return packet;
    }
}
