import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type FriendFurniStartConfirmationMessageType = {
  // no fields

};

export class FriendFurniStartConfirmationMessage implements IIncomingPacket<FriendFurniStartConfirmationMessageType>
{
  public parse(wrapper: IMessageDataWrapper): FriendFurniStartConfirmationMessageType
  {

    const packet: FriendFurniStartConfirmationMessageType = {
    };

    return packet;
  }
}
