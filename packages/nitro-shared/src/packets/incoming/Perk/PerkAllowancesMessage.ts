import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type PerkAllowancesMessageType = {
  // no fields

};

export class PerkAllowancesMessage implements IIncomingPacket<PerkAllowancesMessageType>
{
  public parse(wrapper: IMessageDataWrapper): PerkAllowancesMessageType
  {

    const packet: PerkAllowancesMessageType = {
    };

    return packet;
  }
}
