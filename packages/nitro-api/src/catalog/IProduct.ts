import { FurnitureTypeEnum, IFurnitureData, IProductData } from '../session';

export interface IProduct {
    readonly productType: FurnitureTypeEnum;
    readonly classId: number;
    readonly extraParam: string;
    readonly productCount: number;
    readonly productData: IProductData | undefined;
    readonly furnitureData: IFurnitureData;
    readonly isUnique: boolean;
    readonly uniqueSize: number;
    readonly uniqueLeft: number;
}
