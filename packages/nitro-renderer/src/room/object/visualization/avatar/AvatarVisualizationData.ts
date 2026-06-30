import {
    AvatarScaleType,
    type IAssetData,
    type IAvatarEffectListener,
    type IAvatarImage,
    type IAvatarImageListener,
    type IObjectVisualizationData,
    RoomGeometryScaleType,
} from '@nitrodevco/nitro-api';

import { GetAvatarRenderManager } from '../../../../avatar';

export class AvatarVisualizationData implements IObjectVisualizationData {
    public initialize(asset: IAssetData | undefined): boolean {
        return true;
    }

    public dispose(): void { }

    public createAvatarImage(
        figure: string,
        size: RoomGeometryScaleType,
        gender?: string,
        avatarListener?: IAvatarImageListener,
        effectListener?: IAvatarEffectListener,
    ): IAvatarImage | undefined {
        return undefined;

        let avatarImage: IAvatarImage;

        if (size > RoomGeometryScaleType.AvatarSizeNormal)
            avatarImage = GetAvatarRenderManager().createAvatarImage(
                figure,
                AvatarScaleType.LARGE,
                gender ?? 'm', // TODO FIX
                avatarListener,
                effectListener,
            );
        else
            avatarImage = GetAvatarRenderManager().createAvatarImage(
                figure,
                AvatarScaleType.SMALL,
                gender ?? 'm', // TODO FIX
                avatarListener,
                effectListener,
            );

        return avatarImage;
    }

    public get layerCount(): number {
        return 0;
    }
}
