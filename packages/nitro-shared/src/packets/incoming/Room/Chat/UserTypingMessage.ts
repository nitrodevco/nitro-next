import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type UserTypingMessageType = {
  // no fields

};

export class UserTypingMessage implements IIncomingPacket<UserTypingMessageType>
{
  public parse(wrapper: IMessageDataWrapper): UserTypingMessageType
  {

    const packet: UserTypingMessageType = {
    };

    return packet;
  }
}
