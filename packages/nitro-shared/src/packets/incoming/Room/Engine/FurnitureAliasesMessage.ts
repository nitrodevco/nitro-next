import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type FurnitureAliasesMessageType = {
  // no fields

};

export class FurnitureAliasesMessage implements IIncomingPacket<FurnitureAliasesMessageType>
{
  public parse(wrapper: IMessageDataWrapper): FurnitureAliasesMessageType
  {

    const packet: FurnitureAliasesMessageType = {
    };

    return packet;
  }
}
