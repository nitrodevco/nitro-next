import { FurnitureTypeEnum, IFurnitureData, IProductData } from '../session';

/**
 * A product of a catalogue offer - Flash's `Product` (`com/sulake/habbo/catalog/viewer/Product.as`).
 * `HabboCatalog.onCatalogPage` builds one for every product the offer carries, whatever its type:
 * furniture (`s`, `i`) has `furnitureData`, while an effect (`e`), badge (`b`), bot (`r`), club
 * (`h`), chat style (`chat_style`) or habbicon has none and is told apart by `productType`,
 * `classId` and `extraParam`.
 */
export interface IProduct {
    readonly productType: FurnitureTypeEnum;
    readonly classId: number;
    readonly extraParam: string;
    readonly productCount: number;
    readonly productData: IProductData | undefined;
    /** `Product.furnitureData`: `HabboCatalog.getFurnitureData`, only for a floor or wall item the furni data knows. */
    readonly furnitureData: IFurnitureData | undefined;
    readonly isUnique: boolean;
    readonly uniqueSize: number;
    readonly uniqueLeft: number;
}
