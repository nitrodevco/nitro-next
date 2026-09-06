import { CatalogTypeEnum, ICatalogPage, IMessageDataWrapper, ParseArray } from '@nitrodevco/nitro-api';

import { CatalogFrontPageItemParser } from './CatalogFrontPageItemParser';
import { CatalogOfferParser } from './CatalogOfferParser';
import { CatalogPageLocalizationParser } from './CatalogPageLocalizationParser';

export const CatalogPageParser = (wrapper: IMessageDataWrapper): ICatalogPage => {
    const result = {
        pageId: wrapper.readInt(),
        catalogType: wrapper.readString() as CatalogTypeEnum,
        layout: wrapper.readString(),
        localization: CatalogPageLocalizationParser(wrapper),
        offers: ParseArray(wrapper, CatalogOfferParser),
        offerId: wrapper.readInt(),
        acceptSeasonCurrencyAsCredits: wrapper.readBoolean(),
        frontPageItems: [],
    } as ICatalogPage;

    if (wrapper.bytesAvailable) result.frontPageItems = ParseArray(wrapper, CatalogFrontPageItemParser);

    return result;
};
