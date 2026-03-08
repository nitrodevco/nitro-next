import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type ElementPointerMessageType = {
  // no fields

};

export class ElementPointerMessage implements IIncomingPacket<ElementPointerMessageType>
{
  public parse(wrapper: IMessageDataWrapper): ElementPointerMessageType
  {

    const packet: ElementPointerMessageType = {
    };

    return packet;
  }
}
