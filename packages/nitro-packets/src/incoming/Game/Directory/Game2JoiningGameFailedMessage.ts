import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type Game2JoiningGameFailedMessageType = {
    reason: number;
};

export class Game2JoiningGameFailedMessage implements IIncomingPacket<Game2JoiningGameFailedMessageType> {
    public parse(wrapper: IMessageDataWrapper): Game2JoiningGameFailedMessageType {
        const reason = wrapper.readInt();
        return { reason };
    }
}
