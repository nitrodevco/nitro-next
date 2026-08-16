import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type CraftingRecipeMessageType = {
  // no fields

};

export class CraftingRecipeMessage implements IIncomingPacket<CraftingRecipeMessageType>
{
  public parse(wrapper: IMessageDataWrapper): CraftingRecipeMessageType
  {

    const packet: CraftingRecipeMessageType = {
    };

    return packet;
  }
}
