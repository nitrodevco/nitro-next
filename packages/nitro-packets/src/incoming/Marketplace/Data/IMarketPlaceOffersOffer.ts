import { IObjectData } from '@nitrodevco/nitro-api';

export interface IMarketPlaceOffersOffer {
    offerId: number;
    furniId: number;
    furniType: number;
    extraData: string;
    stuffData?: IObjectData;
    price: number;
    status: number;
    timeLeftMinutes: number;
    averagePrice: number;
    offerCount: number;
    statusTime?: number;
    isUsable?: boolean;
    isUsed?: boolean;
}
