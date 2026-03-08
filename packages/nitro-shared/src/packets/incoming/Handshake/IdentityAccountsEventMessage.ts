import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type IdentityAccountsEventMessageType = {
  // no fields

};

export class IdentityAccountsEventMessage implements IIncomingPacket<IdentityAccountsEventMessageType>
{
  public parse(wrapper: IMessageDataWrapper): IdentityAccountsEventMessageType
  {

    const packet: IdentityAccountsEventMessageType = {
    };

    return packet;
  }
}
