import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type Game2UserLeftGameMessageType = {
    userId: number;
};

export class Game2UserLeftGameMessage implements IIncomingPacket<Game2UserLeftGameMessageType> {
    public parse(wrapper: IMessageDataWrapper): Game2UserLeftGameMessageType {
        const userId = wrapper.readInt();
        return { userId };
    }
}
