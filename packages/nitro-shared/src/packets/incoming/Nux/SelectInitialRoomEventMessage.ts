import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type SelectInitialRoomEventMessageType = {
  // no fields

};

export class SelectInitialRoomEventMessage implements IIncomingPacket<SelectInitialRoomEventMessageType>
{
  public parse(wrapper: IMessageDataWrapper): SelectInitialRoomEventMessageType
  {

    const packet: SelectInitialRoomEventMessageType = {
    };

    return packet;
  }
}
