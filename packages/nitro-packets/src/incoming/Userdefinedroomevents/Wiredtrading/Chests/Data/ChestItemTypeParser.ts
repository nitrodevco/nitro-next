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
