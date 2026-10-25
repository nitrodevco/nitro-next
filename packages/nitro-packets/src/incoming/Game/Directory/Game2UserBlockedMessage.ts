import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type Game2UserBlockedMessageType = {
    playerBlockLength: number;
};

export class Game2UserBlockedMessage implements IIncomingPacket<Game2UserBlockedMessageType> {
    public parse(wrapper: IMessageDataWrapper): Game2UserBlockedMessageType {
        const playerBlockLength = wrapper.readInt();
        return { playerBlockLength };
    }
}
