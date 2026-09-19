import { IObjectData } from '@nitrodevco/nitro-api';

export interface IFurniListAddOrUpdateFurni {
    itemId: number;
    isRented?: boolean;
    itemType: string;
    roomItemId: number;
    itemTypeId: number;
    category: number;
    stuffData: IObjectData;
    isGroupable: boolean;
    isRecyclable: boolean;
    isTradeable: boolean;
    isSellable: boolean;
    secondsToExpiration: number;
    extra?: number;
    flatId: number;
    isWallItem: boolean;
    hasRentPeriodStarted: boolean;
    expirationTimeStamp: number;
    slotId?: string;
}
