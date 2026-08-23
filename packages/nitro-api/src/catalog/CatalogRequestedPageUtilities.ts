import { CatalogPageRequestType } from './CatalogPageRequestType';
import { ICatalogRequestedPage } from './ICatalogRequestedPage';

export class CatalogRequestedPageUtilities {
    public static getEmpty() {
        return {
            type: CatalogPageRequestType.None,
        } as ICatalogRequestedPage;
    }

    public static getForPageId(pageId: number) {
        return {
            type: CatalogPageRequestType.PageId,
            pageId,
        } as ICatalogRequestedPage;
    }

    public static getForOfferId(offerId: number) {
        return {
            type: CatalogPageRequestType.OfferId,
            offerId,
        } as ICatalogRequestedPage;
    }

    public static getForPageName(pageName: string) {
        return {
            type: CatalogPageRequestType.PageName,
            pageName,
        } as ICatalogRequestedPage;
    }
}
