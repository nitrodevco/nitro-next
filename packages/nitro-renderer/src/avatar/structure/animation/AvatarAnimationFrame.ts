import type { IAssetAvatarAnimationFrame } from "@nitrodevco/nitro-api";

export class AvatarAnimationFrame {
    private _number: number;
    private _assetPartDefinition: string;

    constructor(data: IAssetAvatarAnimationFrame) {
        this._number = data.number;
        this._assetPartDefinition = data.assetPartDefinition ?? '';
    }

    public get number(): number {
        return this._number;
    }

    public get assetPartDefinition(): string {
        return this._assetPartDefinition;
    }
}
