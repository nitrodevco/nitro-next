import type { IAssetAnimationDirection, IDirectionDataContainer } from "@nitrodevco/nitro-api";

export class DirectionDataContainer implements IDirectionDataContainer {
    private _offset: number;

    constructor(data: IAssetAnimationDirection) {
        this._offset = data.offset ?? 0;
    }

    public get offset(): number {
        return this._offset;
    }
}
