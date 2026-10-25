import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type Game2StartCounterMessageType = {
    countDownLength: number;
};

export class Game2StartCounterMessage implements IIncomingPacket<Game2StartCounterMessageType> {
    public parse(wrapper: IMessageDataWrapper): Game2StartCounterMessageType {
        const countDownLength = wrapper.readInt();
        return { countDownLength };
    }
}
