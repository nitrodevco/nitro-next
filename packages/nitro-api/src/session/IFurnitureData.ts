import type { FurnitureType } from './enum';

export interface IFurnitureData {
    readonly type: FurnitureType;
    readonly id: number;
    readonly fullName: string;
    className: string;
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
    readonly specialType: number;
    readonly canStandOn: boolean;
    readonly canSitOn: boolean;
    readonly canLayOn: boolean;
    readonly excludeDynamic: boolean;
    readonly furniLine: string;
    readonly environment: string;
    readonly rare: boolean;
    readonly isExternalImage: boolean;
}
