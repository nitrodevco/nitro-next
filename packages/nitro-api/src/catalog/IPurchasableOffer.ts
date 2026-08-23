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
    readonly giftable: boolean;
    readonly isRentOffer: boolean;
    readonly clubLevel: number;
    readonly products: IProduct[];
    readonly bundlePurchaseAllowed: boolean;
    readonly isLazy: boolean;
    badgeCode: string | undefined;
    page: IActivePage | undefined;
}
