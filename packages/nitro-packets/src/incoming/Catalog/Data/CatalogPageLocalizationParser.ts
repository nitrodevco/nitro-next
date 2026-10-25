import { ICatalogPageLocalization, IMessageDataWrapper, ParseStrings } from '@nitrodevco/nitro-api';

export const CatalogPageLocalizationParser = (wrapper: IMessageDataWrapper): ICatalogPageLocalization => {
    return {
        imageDatas: ParseStrings(wrapper),
        textDatas: ParseStrings(wrapper),
    };
};
