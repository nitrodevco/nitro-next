// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { GetObjectDataFromWrapper, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IFurniListAddOrUpdateFurni } from './IFurniListAddOrUpdateFurni';

export const FurniListAddOrUpdateFurniParser = (wrapper: IMessageDataWrapper): IFurniListAddOrUpdateFurni => {
    let extra: number | undefined;
    let slotId: string | undefined;
    const itemId = wrapper.readInt();
    const itemType = wrapper.readString();
    const roomItemId = wrapper.readInt();
    const itemTypeId = wrapper.readInt();
    const category = wrapper.readInt();
    const stuffData = GetObjectDataFromWrapper(wrapper);
    const isRecyclable = wrapper.readBoolean();
    const isTradeable = wrapper.readBoolean();
    const isGroupable = wrapper.readBoolean();
    const isSellable = wrapper.readBoolean();
    // anything below zero means the furni is not rented
    const secondsToExpiration = Math.max(wrapper.readInt(), -1);
    const expirationTimeStamp = Date.now();
    const isRented = secondsToExpiration > -1;
    const hasRentPeriodStarted = wrapper.readBoolean();
    const flatId = wrapper.readInt();
    const isWallItem = itemType === 'I';
    if (itemType === 'S') {
        slotId = wrapper.readString();
        extra = wrapper.readInt();
    }
    return { isRented, itemId, itemType, roomItemId, itemTypeId, category, stuffData, isGroupable, isRecyclable, isTradeable, isSellable, secondsToExpiration, extra, flatId, isWallItem, hasRentPeriodStarted, expirationTimeStamp, slotId };
};
