import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type ClubGiftInfoEventMessageType = object;

export class ClubGiftInfoEventMessage implements IIncomingPacket<ClubGiftInfoEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): ClubGiftInfoEventMessageType {

        const packet: ClubGiftInfoEventMessageType = {
        };

        return packet;
    }
}
