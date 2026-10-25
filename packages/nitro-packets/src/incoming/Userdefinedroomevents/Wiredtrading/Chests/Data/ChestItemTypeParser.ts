// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IChestItemType, IMessageDataWrapper } from '@nitrodevco/nitro-api';

/** Flash `ChestItemType.readFromMessage`. */
export const ChestItemTypeParser = (wrapper: IMessageDataWrapper): IChestItemType => {
    const isWallItem = wrapper.readBoolean();
    const typeId = wrapper.readInt();
    const legacyPosterId = wrapper.readString();

    return {
        isWallItem,
        typeId,
        legacyPosterId,
    };
};
