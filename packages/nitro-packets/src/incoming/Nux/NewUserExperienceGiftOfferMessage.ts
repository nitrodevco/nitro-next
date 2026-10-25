import { IIncomingPacket, IMessageDataWrapper, ParseArray } from '@nitrodevco/nitro-api';

import { INewUserExperienceGiftOfferGiftOption } from './Data/INewUserExperienceGiftOfferGiftOption';
import { NewUserExperienceGiftOfferGiftOptionParser } from './Data/NewUserExperienceGiftOfferGiftOptionParser';

export type NewUserExperienceGiftOfferMessageType = {
    giftOptions: INewUserExperienceGiftOfferGiftOption[];
};

export class NewUserExperienceGiftOfferMessage implements IIncomingPacket<NewUserExperienceGiftOfferMessageType> {
    public parse(wrapper: IMessageDataWrapper): NewUserExperienceGiftOfferMessageType {
        const giftOptions = ParseArray(wrapper, NewUserExperienceGiftOfferGiftOptionParser);
        return { giftOptions };
    }
}
