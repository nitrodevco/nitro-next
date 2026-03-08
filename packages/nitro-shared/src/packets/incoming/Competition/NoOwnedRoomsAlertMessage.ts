import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type NoOwnedRoomsAlertMessageType = {
  // no fields

};

export class NoOwnedRoomsAlertMessage implements IIncomingPacket<NoOwnedRoomsAlertMessageType>
{
  public parse(wrapper: IMessageDataWrapper): NoOwnedRoomsAlertMessageType
  {

    const packet: NoOwnedRoomsAlertMessageType = {
    };

    return packet;
  }
}
