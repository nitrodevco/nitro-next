import {
    AvatarGenderType,
    AvatarScaleType,
    type IAssetData,
    type IAvatarEffectListener,
    type IAvatarImage,
    type IAvatarImageListener,
    type IObjectVisualizationData,
    RoomGeometryScaleType,
} from '@nitrodevco/nitro-api';

import { GetAvatarRenderManager } from '#renderer/avatar';

/**
 * Flash `AvatarVisualizationData`: where an avatar visualization gets its image from - the
 * user's own figure, or the generic blocked figure when the user behind it is blocked.
 */
export class AvatarVisualizationData implements IObjectVisualizationData {
    public initialize(asset: IAssetData | undefined): boolean {
        return true;
    }

    public dispose(): void { }

    public createAvatarImage(
        figure: string,
        size: RoomGeometryScaleType,
        gender: AvatarGenderType | undefined,
        avatarListener: IAvatarImageListener,
        effectListener: IAvatarEffectListener | undefined = undefined,
        blocked: boolean = false,
    ): IAvatarImage | undefined {
        const scale = (size > RoomGeometryScaleType.AvatarSizeNormal) ? AvatarScaleType.Large : AvatarScaleType.Small;

        if (blocked) return GetAvatarRenderManager().createBlockedAvatarImage(figure, scale);

        return GetAvatarRenderManager().createAvatarImage(figure, scale, gender, avatarListener, effectListener);
    }

    public get layerCount(): number {
        return 0;
    }
}
