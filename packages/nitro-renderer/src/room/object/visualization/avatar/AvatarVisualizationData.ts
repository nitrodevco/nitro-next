import type {
    AvatarGenderType
} from '@nitrodevco/nitro-api';
import {
    AvatarScaleType,
    type IAssetData,
    type IAvatarEffectListener,
    type IAvatarImage,
    type IAvatarImageListener,
    type IObjectVisualizationData,
    RoomGeometryScaleType,
} from '@nitrodevco/nitro-api';

import { GetAvatarRenderManager } from '#renderer/avatar';

export class AvatarVisualizationData implements IObjectVisualizationData {
    public initialize(asset: IAssetData | undefined): boolean {
        return true;
    }

    public dispose(): void { }

    public createAvatarImage(
        figure: string,
        size: RoomGeometryScaleType,
        gender: AvatarGenderType,
        avatarListener: IAvatarImageListener,
        effectListener: IAvatarEffectListener | undefined = undefined,
    ): IAvatarImage | undefined {
        if (size > RoomGeometryScaleType.AvatarSizeNormal)
            return GetAvatarRenderManager().createAvatarImage(
                figure,
                AvatarScaleType.Large,
                gender,
                avatarListener,
                effectListener,
            );

        return GetAvatarRenderManager().createAvatarImage(
            figure,
            AvatarScaleType.Small,
            gender,
            avatarListener,
            effectListener,
        );
    }

    public get layerCount(): number {
        return 0;
    }
}
