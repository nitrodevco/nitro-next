import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type UserBannedMessageType = {
  // no fields

};

export class UserBannedMessage implements IIncomingPacket<UserBannedMessageType>
{
  public parse(wrapper: IMessageDataWrapper): UserBannedMessageType
  {

    const packet: UserBannedMessageType = {
    };

    return packet;
  }
}
