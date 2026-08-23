import { FurnitureTypeEnum } from '@nitrodevco/nitro-api';

export interface ICatalogProduct {
    productType: FurnitureTypeEnum;
    spriteId: number;
    extraParam: string;
    quantity: number;
    isUnique: boolean;
    uniqueSize: number;
    uniqueRemaining: number;
}
