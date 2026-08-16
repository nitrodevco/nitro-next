import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type GiftWrappingConfigurationEventMessageType = object;

export class GiftWrappingConfigurationEventMessage implements IIncomingPacket<GiftWrappingConfigurationEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): GiftWrappingConfigurationEventMessageType {
        const packet: GiftWrappingConfigurationEventMessageType = {
        };

        return packet;
    }
}
