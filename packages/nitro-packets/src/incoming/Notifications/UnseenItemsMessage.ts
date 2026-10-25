// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type UnseenItemsMessageType = {
    /**
     * The ids that became unseen, by unseen item category (`UnseenItemsParser.getCategories` /
     * `getItemsByCategory`): 1 owned furni, 2 rented furni, 3 pets, 4 badges, 5 bots, 6 games,
     * 7 collectibles, 8 habbicons. What arrives is added to what the client already tracks.
     */
    items: Map<number, number[]>;
};

/** Flash `UnseenItemsParser`: a count of categories, each a category id and a list of ints. */
export class UnseenItemsMessage implements IIncomingPacket<UnseenItemsMessageType> {
    public parse(wrapper: IMessageDataWrapper): UnseenItemsMessageType {
        const items = new Map<number, number[]>();
        const categoryCount = wrapper.readInt();

        for (let i = 0; i < categoryCount; i++) {
            const category = wrapper.readInt();
            const ids: number[] = [];
            const idCount = wrapper.readInt();

            for (let j = 0; j < idCount; j++) ids.push(wrapper.readInt());

            items.set(category, ids);
        }

        return { items };
    }
}
