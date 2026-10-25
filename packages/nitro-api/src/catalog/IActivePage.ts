import { ICatalogPageLocalization } from './ICatalogPageLocalization';
import { IPurchasableOffer } from './IPurchasableOffer';

export interface IActivePage {
    readonly pageId: number;
    readonly layoutCode: string;
    readonly localization: ICatalogPageLocalization;
    readonly offers: IPurchasableOffer[];
    readonly acceptSeasonCurrencyAsCredits: boolean;
    readonly mode: number;
}
