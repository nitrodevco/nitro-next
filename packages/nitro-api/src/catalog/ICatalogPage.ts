import { CatalogTypeEnum } from './CatalogTypeEnum';
import { ICatalogFrontPageItem } from './ICatalogFrontPageItem';
import { ICatalogOffer } from './ICatalogOffer';
import { ICatalogPageLocalization } from './ICatalogPageLocalization';

export interface ICatalogPage {
    readonly pageId: number;
    readonly catalogType: CatalogTypeEnum;
    readonly layout: string;
    readonly localization: ICatalogPageLocalization;
    readonly offers: ICatalogOffer[];
    readonly offerId: number;
    readonly acceptSeasonCurrencyAsCredits: boolean;
    readonly frontPageItems: ICatalogFrontPageItem[];
}
