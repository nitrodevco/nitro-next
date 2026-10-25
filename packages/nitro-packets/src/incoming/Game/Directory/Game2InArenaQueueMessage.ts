import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type Game2InArenaQueueMessageType = {
    position: number;
};

export class Game2InArenaQueueMessage implements IIncomingPacket<Game2InArenaQueueMessageType> {
    public parse(wrapper: IMessageDataWrapper): Game2InArenaQueueMessageType {
        const position = wrapper.readInt();
        return { position };
    }
}
