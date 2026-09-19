import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type Game2StopCounterMessageType = {
    position: number;
};

export class Game2StopCounterMessage implements IIncomingPacket<Game2StopCounterMessageType> {
    public parse(wrapper: IMessageDataWrapper): Game2StopCounterMessageType {
        const position = wrapper.readInt();
        return { position };
    }
}
