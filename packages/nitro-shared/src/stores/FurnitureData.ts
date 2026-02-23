import type { FurnitureType, IFurnitureData } from '@nitrodevco/nitro-api';

export class FurnitureData implements IFurnitureData {
    constructor(
        public readonly type: FurnitureType,
        public readonly id: number,
        public readonly fullName: string,
        public className: string,
        public readonly category: string,
        public readonly localizedName: string,
        public readonly description: string,
        public readonly revision: number,
        public readonly tileSizeX: number,
        public readonly tileSizeY: number,
        public readonly tileSizeZ: number,
        public readonly colors: number[],
        public readonly hasIndexedColor: boolean,
        public readonly colorIndex: number,
        public readonly adUrl: string,
        public readonly purchaseOfferId: number,
        public readonly purchaseCouldBeUsedForBuyout: boolean,
        public readonly rentOfferId: number,
        public readonly rentCouldBeUsedForBuyout: boolean,
        public readonly availableForBuildersClub: boolean,
        public readonly customParams: string,
        public readonly specialType: number,
        public readonly canStandOn: boolean,
        public readonly canSitOn: boolean,
        public readonly canLayOn: boolean,
        public readonly excludeDynamic: boolean,
        public readonly furniLine: string,
        public readonly environment: string,
        public readonly rare: boolean,
    ) {}

    public get isExternalImage(): boolean {
        return !(this.className.indexOf('external_image') === -1);
    }
}
