import { CatalogPricingModelEnum } from './CatalogPricingModelEnum';
import { CatalogPricingTypeEnum } from './CatalogPricingTypeEnum';
import { IActivePage } from './IActivePage';
import { IProduct } from './IProduct';

export interface IPurchasableOffer {
    readonly pricingModel: CatalogPricingModelEnum;
    readonly pricingType: CatalogPricingTypeEnum;
    readonly offerId: number;
    readonly localizationId: string;
    readonly priceInCredits: number;
    readonly priceInActivityPoints: number;
    readonly activityPointType: number;
    /** `Offer.priceInSilver`: the offer's price in silver, 0 for none. */
    readonly priceInSilver: number;
    readonly giftable: boolean;
    readonly isRentOffer: boolean;
    readonly clubLevel: number;
    readonly products: IProduct[];
    readonly bundlePurchaseAllowed: boolean;
    readonly isLazy: boolean;
    /** `Offer.badgeCode`: the extraParam of the offer's first badge product. */
    badgeCode: string | undefined;
    /** `Offer.extraChatStyleCode`: the extraParam of a chat style that comes along with other products. */
    readonly extraChatStyleCode?: string;
    /** `Offer.isSingleChatStyle`: the offer is one chat style, alone or with a badge. */
    readonly isSingleChatStyle?: boolean;
    page: IActivePage | undefined;
}
