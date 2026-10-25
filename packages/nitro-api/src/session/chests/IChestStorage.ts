import { IObjectData } from '../../room/object/data/IObjectData';
import { IChestItemType } from './IChestItemType';

/** One item stored in a wired furni chest (Flash `ChestStorage`). */
export interface IChestStorage {
    inventoryId: number;
    /** 0..3; the client only distinguishes locked from unlocked when listing withdrawable items. */
    lockState: number;
    transactionId: number;
    type: IChestItemType;
    groupable: boolean;
    specialType: number;
    stuffData: IObjectData;
    /** Floor items only. */
    extra: number;
}
