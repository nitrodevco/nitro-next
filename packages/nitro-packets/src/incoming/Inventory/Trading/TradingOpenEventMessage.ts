import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type TradingOpenEventMessageType = object;

export class TradingOpenEventMessage implements IIncomingPacket<TradingOpenEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): TradingOpenEventMessageType {
        const packet: TradingOpenEventMessageType = {
        };

        return packet;
    }
}
