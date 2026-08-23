import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type LimitedEditionSoldOutEventMessageType = object;

export class LimitedEditionSoldOutEventMessage implements IIncomingPacket<LimitedEditionSoldOutEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): LimitedEditionSoldOutEventMessageType {
        const packet: LimitedEditionSoldOutEventMessageType = {
        };

        return packet;
    }
}
