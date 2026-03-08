import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type AuthenticationOKMessageType = {
  accountId: number;
  identityId: number;
};

export class AuthenticationOKMessage implements IIncomingPacket<AuthenticationOKMessageType>
{
  public parse(wrapper: IMessageDataWrapper): AuthenticationOKMessageType
  {

    const packet: AuthenticationOKMessageType = {
      accountId: wrapper.readInt(),
      identityId: wrapper.readInt(),
    };

    return packet;
  }
}
