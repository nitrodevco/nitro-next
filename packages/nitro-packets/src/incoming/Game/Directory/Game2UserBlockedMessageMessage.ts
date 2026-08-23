import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type Game2UserBlockedMessageMessageType = object;

export class Game2UserBlockedMessageMessage implements IIncomingPacket<Game2UserBlockedMessageMessageType> {
    public parse(wrapper: IMessageDataWrapper): Game2UserBlockedMessageMessageType {
        const packet: Game2UserBlockedMessageMessageType = {
        };

        return packet;
    }
}
