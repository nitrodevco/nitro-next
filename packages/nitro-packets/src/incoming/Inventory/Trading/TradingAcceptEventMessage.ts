import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type TradingAcceptEventMessageType = object;

export class TradingAcceptEventMessage implements IIncomingPacket<TradingAcceptEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): TradingAcceptEventMessageType {
        const packet: TradingAcceptEventMessageType = {
        };

        return packet;
    }
}
