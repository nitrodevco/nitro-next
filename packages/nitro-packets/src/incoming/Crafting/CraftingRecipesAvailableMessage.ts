import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type CraftingRecipesAvailableMessageType = {
  // no fields

};

export class CraftingRecipesAvailableMessage implements IIncomingPacket<CraftingRecipesAvailableMessageType>
{
  public parse(wrapper: IMessageDataWrapper): CraftingRecipesAvailableMessageType
  {

    const packet: CraftingRecipesAvailableMessageType = {
    };

    return packet;
  }
}
