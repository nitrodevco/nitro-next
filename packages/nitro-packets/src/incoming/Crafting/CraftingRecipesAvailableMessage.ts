// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type CraftingRecipesAvailableMessageType = {
    /** How many recipes the ingredients in the mixer could still become. */
    count: number;
    /** Whether they already make one exactly. */
    recipeComplete: boolean;
};

export class CraftingRecipesAvailableMessage implements IIncomingPacket<CraftingRecipesAvailableMessageType> {
    public parse(wrapper: IMessageDataWrapper): CraftingRecipesAvailableMessageType {
        const packet: CraftingRecipesAvailableMessageType = {
            count: wrapper.readInt(),
            recipeComplete: wrapper.readBoolean(),
        };

        return packet;
    }
}
