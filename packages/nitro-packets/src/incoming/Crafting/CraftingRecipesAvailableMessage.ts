import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type CraftingRecipesAvailableMessageType = object;

export class CraftingRecipesAvailableMessage implements IIncomingPacket<CraftingRecipesAvailableMessageType> {
    public parse(wrapper: IMessageDataWrapper): CraftingRecipesAvailableMessageType {
        const packet: CraftingRecipesAvailableMessageType = {
        };

        return packet;
    }
}
