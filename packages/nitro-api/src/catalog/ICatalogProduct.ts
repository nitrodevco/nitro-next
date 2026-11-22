import { FurnitureTypeEnum } from '../session/enum/FurnitureTypeEnum';

export interface ICatalogProduct {
    productType: FurnitureTypeEnum;
    spriteId: number;
    extraParam: string;
    quantity: number;
    isUnique: boolean;
    uniqueSize: number;
    uniqueRemaining: number;
}
