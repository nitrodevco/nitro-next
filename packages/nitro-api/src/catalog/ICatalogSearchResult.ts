import { ICatalogNode } from './ICatalogNode';
import { IPurchasableOffer } from './IPurchasableOffer';

export interface ICatalogSearchResult {
    readonly searchValue: string;
    readonly offers: IPurchasableOffer[];
    readonly nodes: ICatalogNode[];
}
