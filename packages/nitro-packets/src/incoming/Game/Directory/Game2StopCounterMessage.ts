import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type Game2StopCounterMessageType = object;

export class Game2StopCounterMessage implements IIncomingPacket<Game2StopCounterMessageType> {
    public parse(_wrapper: IMessageDataWrapper): Game2StopCounterMessageType {
        return {};
    }
}
