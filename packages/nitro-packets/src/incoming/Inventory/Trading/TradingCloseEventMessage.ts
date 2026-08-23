import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type TradingCloseEventMessageType = object;

export class TradingCloseEventMessage implements IIncomingPacket<TradingCloseEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): TradingCloseEventMessageType {
        const packet: TradingCloseEventMessageType = {
        };

        return packet;
    }
}
