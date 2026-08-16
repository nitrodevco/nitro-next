import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type FriendFurniCancelLockMessageType = {
  // no fields

};

export class FriendFurniCancelLockMessage implements IIncomingPacket<FriendFurniCancelLockMessageType>
{
  public parse(wrapper: IMessageDataWrapper): FriendFurniCancelLockMessageType
  {

    const packet: FriendFurniCancelLockMessageType = {
    };

    return packet;
  }
}
