import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type FlatControllersEventMessageType = {
  // no fields

};

export class FlatControllersEventMessage implements IIncomingPacket<FlatControllersEventMessageType>
{
  public parse(wrapper: IMessageDataWrapper): FlatControllersEventMessageType
  {

    const packet: FlatControllersEventMessageType = {
    };

    return packet;
  }
}
