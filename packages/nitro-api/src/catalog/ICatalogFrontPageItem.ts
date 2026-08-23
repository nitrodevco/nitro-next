import { CatalogFrontPageItemType } from './CatalogFrontPageItemType';

export interface ICatalogFrontPageItem {
    position: number;
    itemName: string;
    itemPromoImage: string;
    type: CatalogFrontPageItemType;
    value: string | number;
    expiresInSeconds: number;
}
