import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type CraftingResultMessageType = {
  // no fields

};

export class CraftingResultMessage implements IIncomingPacket<CraftingResultMessageType>
{
  public parse(wrapper: IMessageDataWrapper): CraftingResultMessageType
  {

    const packet: CraftingResultMessageType = {
    };

    return packet;
  }
}
