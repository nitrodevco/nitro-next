import { GetObjectDataFromWrapper, IChestStorage, IMessageDataWrapper, ReadLong } from '@nitrodevco/nitro-api';

import { ChestItemTypeParser } from './ChestItemTypeParser';

/** Flash `ChestStorage`: one stored item; the extra int only follows floor items. */
export const ChestStorageParser = (wrapper: IMessageDataWrapper): IChestStorage => {
    const inventoryId = wrapper.readInt();
    const lockState = wrapper.readInt();
    const transactionId = ReadLong(wrapper);
    const type = ChestItemTypeParser(wrapper);
    const groupable = wrapper.readBoolean();
    const specialType = wrapper.readInt();
    const stuffData = GetObjectDataFromWrapper(wrapper);
    const extra = type.isWallItem ? 0 : wrapper.readInt();

    return {
        inventoryId,
        lockState,
        transactionId,
        type,
        groupable,
        specialType,
        stuffData,
        extra,
    };
};
