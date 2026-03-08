import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type FriendFurniOtherLockConfirmedMessageType = {
  // no fields

};

export class FriendFurniOtherLockConfirmedMessage implements IIncomingPacket<FriendFurniOtherLockConfirmedMessageType>
{
  public parse(wrapper: IMessageDataWrapper): FriendFurniOtherLockConfirmedMessageType
  {

    const packet: FriendFurniOtherLockConfirmedMessageType = {
    };

    return packet;
  }
}
