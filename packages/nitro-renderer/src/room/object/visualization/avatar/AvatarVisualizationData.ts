import {
    AvatarScaleType,
    type IAssetData,
    type IAvatarEffectListener,
    type IAvatarImage,
    type IAvatarImageListener,
    type IObjectVisualizationData,
} from '@nitrodevco/nitro-api';

import { GetAvatarRenderManager } from '../../../../avatar';

export class AvatarVisualizationData implements IObjectVisualizationData {
    public initialize(asset: IAssetData): boolean {
        return true;
    }

    public dispose(): void {}

    public createAvatarImage(
        figure: string,
        size: number,
        gender?: string,
        avatarListener?: IAvatarImageListener,
        effectListener?: IAvatarEffectListener,
    ): IAvatarImage {
        let avatarImage: IAvatarImage;

        if (size > 48)
            avatarImage = GetAvatarRenderManager().createAvatarImage(
                figure,
                AvatarScaleType.LARGE,
                gender,
                avatarListener,
                effectListener,
            );
        else
            avatarImage = GetAvatarRenderManager().createAvatarImage(
                figure,
                AvatarScaleType.SMALL,
                gender,
                avatarListener,
                effectListener,
            );

        return avatarImage;
    }

    public get layerCount(): number {
        return 0;
    }
}
