import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type TradingConfirmationEventMessageType = object;

export class TradingConfirmationEventMessage implements IIncomingPacket<TradingConfirmationEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): TradingConfirmationEventMessageType {
        const packet: TradingConfirmationEventMessageType = {
        };

        return packet;
    }
}
