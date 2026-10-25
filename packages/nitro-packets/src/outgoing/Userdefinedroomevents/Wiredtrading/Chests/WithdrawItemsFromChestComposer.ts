// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IChestItemType, IOutgoingPacket } from '@nitrodevco/nitro-api';

export type WithdrawItemsFromChestComposerType = {
    chestId: number;
    type: IChestItemType;
    amount: number;
};

/** Flash `ChestItemType.addToComposer` writes the type as wall flag, type id, legacy poster id. */
export class WithdrawItemsFromChestComposer implements IOutgoingPacket<WithdrawItemsFromChestComposerType> {
    public constructor(private params: WithdrawItemsFromChestComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.chestId,
            this.params.type.isWallItem,
            this.params.type.typeId,
            this.params.type.legacyPosterId,
            this.params.amount,
        ];
    }
}
