import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type BadgePointLimitsEventMessageType = object;

export class BadgePointLimitsEventMessage implements IIncomingPacket<BadgePointLimitsEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): BadgePointLimitsEventMessageType {
        const packet: BadgePointLimitsEventMessageType = {
        };

        return packet;
    }
}
