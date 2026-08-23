import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type TradingCompletedEventMessageType = object;

export class TradingCompletedEventMessage implements IIncomingPacket<TradingCompletedEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): TradingCompletedEventMessageType {
        const packet: TradingCompletedEventMessageType = {
        };

        return packet;
    }
}
