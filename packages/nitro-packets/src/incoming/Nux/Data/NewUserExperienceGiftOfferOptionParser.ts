import { IMessageDataWrapper, ParseArray } from '@nitrodevco/nitro-api';

import { INewUserExperienceGiftOfferOption } from './INewUserExperienceGiftOfferOption';
import { NewUserExperienceGiftOfferProductOfferListParser } from './NewUserExperienceGiftOfferProductOfferListParser';

export const NewUserExperienceGiftOfferOptionParser = (wrapper: IMessageDataWrapper): INewUserExperienceGiftOfferOption => {
    let thumbnailUrl: string | undefined;
    thumbnailUrl = wrapper.readString();
    if (thumbnailUrl === '') {
        thumbnailUrl = undefined;
    }
    const productOfferList = ParseArray(wrapper, NewUserExperienceGiftOfferProductOfferListParser);
    return { productOfferList, thumbnailUrl };
};
