import { FurnitureSpecialType, FurnitureTypeEnum } from './enum';

export interface IFurnitureData {
    readonly type: FurnitureTypeEnum;
    readonly id: number;
    readonly fullName: string;
    readonly className: string;
    readonly category: string;
    readonly localizedName: string;
    readonly description: string;
    readonly revision: number;
    readonly tileSizeX: number;
    readonly tileSizeY: number;
    readonly tileSizeZ: number;
    readonly colors: number[];
    readonly hasIndexedColor: boolean;
    readonly colorIndex: number;
    readonly adUrl: string;
    readonly purchaseOfferId: number;
    readonly purchaseCouldBeUsedForBuyout: boolean;
    readonly rentOfferId: number;
    readonly rentCouldBeUsedForBuyout: boolean;
    readonly availableForBuildersClub: boolean;
    readonly customParams: string;
    readonly specialType: FurnitureSpecialType;
    readonly canStandOn: boolean;
    readonly canSitOn: boolean;
    readonly canLayOn: boolean;
    readonly excludeDynamic: boolean;
    readonly furniLine: string;
    readonly environment: string;
    readonly rare: boolean;
    /** Furnidata `tradeable`: `AddEditContractElement.validate` refuses a furni type that cannot be traded. */
    readonly tradeable: boolean;
    /** Furnidata `recyclable`: the catalogue's product view marks a furni the recycler refuses (`updateAvailabilityIndicators`). */
    readonly recyclable: boolean;
    readonly isExternalImage: boolean;
}
