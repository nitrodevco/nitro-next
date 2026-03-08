import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type SlideObjectBundleMessageType = {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  rollerItemId: number;
};

export class SlideObjectBundleMessage implements IIncomingPacket<SlideObjectBundleMessageType>
{
  public parse(wrapper: IMessageDataWrapper): SlideObjectBundleMessageType
  {

    const packet: SlideObjectBundleMessageType = {
      fromX: wrapper.readInt(),
      fromY: wrapper.readInt(),
      toX: wrapper.readInt(),
      toY: wrapper.readInt(),
      rollerItemId: wrapper.readInt(),
    };

    return packet;
  }
}
