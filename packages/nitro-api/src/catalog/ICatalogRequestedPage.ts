import { CatalogPageRequestType } from './CatalogPageRequestType';

export interface ICatalogRequestedPage {
    type: CatalogPageRequestType;
    pageId?: number;
    offerId?: number;
    pageName?: string;
}
