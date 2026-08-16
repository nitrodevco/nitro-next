import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type CreditBalanceEventMessageType = {
    balance: number;
};

export class CreditBalanceEventMessage implements IIncomingPacket<CreditBalanceEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): CreditBalanceEventMessageType {
        const packet: CreditBalanceEventMessageType = {
            balance: parseFloat(wrapper.readString())
        };

        return packet;
    }
}
