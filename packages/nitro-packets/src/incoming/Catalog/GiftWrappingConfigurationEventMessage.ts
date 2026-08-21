import type { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type GiftWrappingConfigurationEventMessageType = {
  isWrappingEnabled: boolean;
  wrappingPrice: number;
  stuffTypes: number[];
  boxTypes: number[];
  ribbonTypes: number[];
  defaultStuffTypes: number[];
};

export class GiftWrappingConfigurationEventMessage implements IIncomingPacket<GiftWrappingConfigurationEventMessageType>
{
  public parse(wrapper: IMessageDataWrapper): GiftWrappingConfigurationEventMessageType
  {
    const packet: GiftWrappingConfigurationEventMessageType = {
      isWrappingEnabled: false,
      wrappingPrice: 0,
      stuffTypes: [],
      boxTypes: [],
      ribbonTypes: [],
      defaultStuffTypes: [],
    };

    packet.isWrappingEnabled = wrapper.readBoolean();
    packet.wrappingPrice = wrapper.readInt();
    let v1 = wrapper.readInt();
    while (v1 > 0) {
        packet.stuffTypes.push(wrapper.readInt());
        v1--;
    }
    let v2 = wrapper.readInt();
    while (v2 > 0) {
        packet.boxTypes.push(wrapper.readInt());
        v2--;
    }
    let v3 = wrapper.readInt();
    while (v3 > 0) {
        packet.ribbonTypes.push(wrapper.readInt());
        v3--;
    }
    let v4 = wrapper.readInt();
    while (v4 > 0) {
        packet.defaultStuffTypes.push(wrapper.readInt());
        v4--;
    }

    return packet;
  }
}
