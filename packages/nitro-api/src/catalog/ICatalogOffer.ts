import { ICatalogProduct } from './ICatalogProduct';

export interface ICatalogOffer {
    readonly id: number;
    readonly localizationId: string;
    readonly rentable: boolean;
    readonly costCredits: number;
    readonly costCurrency: number;
    readonly costCurrencyType: number;
    readonly costSilver: number;
    readonly canGift: boolean;
    readonly products: ICatalogProduct[];
    readonly clubLevel: number;
    readonly canBundle: boolean;
    readonly unknown1: boolean;
    readonly previewImage: string;
}
