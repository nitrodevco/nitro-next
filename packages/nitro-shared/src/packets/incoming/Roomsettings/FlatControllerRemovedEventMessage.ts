import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type FlatControllerRemovedEventMessageType = {
  // no fields

};

export class FlatControllerRemovedEventMessage implements IIncomingPacket<FlatControllerRemovedEventMessageType>
{
  public parse(wrapper: IMessageDataWrapper): FlatControllerRemovedEventMessageType
  {

    const packet: FlatControllerRemovedEventMessageType = {
    };

    return packet;
  }
}
