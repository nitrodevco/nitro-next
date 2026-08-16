import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type UserNftChatStylesMessageType = {
  // no fields

};

export class UserNftChatStylesMessage implements IIncomingPacket<UserNftChatStylesMessageType>
{
  public parse(wrapper: IMessageDataWrapper): UserNftChatStylesMessageType
  {

    const packet: UserNftChatStylesMessageType = {
    };

    return packet;
  }
}
