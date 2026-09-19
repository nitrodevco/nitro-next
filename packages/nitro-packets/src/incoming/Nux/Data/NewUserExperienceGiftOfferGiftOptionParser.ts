// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IMessageDataWrapper, ParseArray } from '@nitrodevco/nitro-api';

import { INewUserExperienceGiftOfferGiftOption } from './INewUserExperienceGiftOfferGiftOption';
import { NewUserExperienceGiftOfferOptionParser } from './NewUserExperienceGiftOfferOptionParser';

export const NewUserExperienceGiftOfferGiftOptionParser = (wrapper: IMessageDataWrapper): INewUserExperienceGiftOfferGiftOption => {
    const dayIndex = wrapper.readInt();
    const stepIndex = wrapper.readInt();
    const options = ParseArray(wrapper, NewUserExperienceGiftOfferOptionParser);
    return { dayIndex, stepIndex, options };
};
