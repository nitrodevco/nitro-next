import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type UserChatlogEventMessageType = {
  // no fields

};

export class UserChatlogEventMessage implements IIncomingPacket<UserChatlogEventMessageType>
{
  public parse(wrapper: IMessageDataWrapper): UserChatlogEventMessageType
  {

    const packet: UserChatlogEventMessageType = {
    };

    return packet;
  }
}
