import type { IMessageDataWrapper } from '@nitrodevco/nitro-api';

export interface ISnowWarGameTokenOffer {
    offerId: number;
    localizationId: string;
    priceInCredits: number;
    priceInActivityPoints: number;
    activityPointType: number;
}

export const SnowWarGameTokenOfferParser = (wrapper: IMessageDataWrapper): ISnowWarGameTokenOffer => {
    const data: ISnowWarGameTokenOffer = {
        offerId: 0,
        localizationId: '',
        priceInCredits: 0,
        priceInActivityPoints: 0,
        activityPointType: 0,
    };

    data.offerId = wrapper.readInt();
    data.localizationId = wrapper.readString();
    data.priceInCredits = wrapper.readInt();
    data.priceInActivityPoints = wrapper.readInt();
    data.activityPointType = wrapper.readInt();

    return data;
};
