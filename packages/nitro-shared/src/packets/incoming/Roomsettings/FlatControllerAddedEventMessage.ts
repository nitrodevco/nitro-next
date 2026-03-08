import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type FlatControllerAddedEventMessageType = {
  // no fields

};

export class FlatControllerAddedEventMessage implements IIncomingPacket<FlatControllerAddedEventMessageType>
{
  public parse(wrapper: IMessageDataWrapper): FlatControllerAddedEventMessageType
  {

    const packet: FlatControllerAddedEventMessageType = {
    };

    return packet;
  }
}
