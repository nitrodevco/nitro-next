import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { INewUserExperienceGiftOfferProductOfferList } from './INewUserExperienceGiftOfferProductOfferList';

export const NewUserExperienceGiftOfferProductOfferListParser = (wrapper: IMessageDataWrapper): INewUserExperienceGiftOfferProductOfferList => {
    let localizationKey: string | undefined;
    const productCode = wrapper.readString();
    localizationKey = wrapper.readString();
    if (localizationKey === '') {
        localizationKey = undefined;
    }
    return { productCode, localizationKey };
};
