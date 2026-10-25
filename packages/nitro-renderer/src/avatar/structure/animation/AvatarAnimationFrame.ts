import { IAssetAvatarAnimationFrame } from '@nitrodevco/nitro-api';

/** Port of Flash `AnimationFrame` (the avatar's, `com.sulake.habbo.avatar.structure.animation`). */
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
