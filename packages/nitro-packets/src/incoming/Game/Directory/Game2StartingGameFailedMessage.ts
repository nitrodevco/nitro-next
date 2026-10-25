import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type Game2StartingGameFailedMessageType = {
    reason: number;
};

export class Game2StartingGameFailedMessage implements IIncomingPacket<Game2StartingGameFailedMessageType> {
    public parse(wrapper: IMessageDataWrapper): Game2StartingGameFailedMessageType {
        const reason = wrapper.readInt();
        return { reason };
    }
}
