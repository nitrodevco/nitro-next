import type { AvatarGenderType, IAvatarEffectListener, IAvatarImage, IAvatarImageListener } from '@nitrodevco/nitro-api';

import { AvatarVisualizationData } from '../avatar';
import { FurnitureVisualizationData } from './FurnitureVisualizationData';

export class FurnitureMannequinVisualizationData extends FurnitureVisualizationData {
    private _avatarData: AvatarVisualizationData = new AvatarVisualizationData();

    public createAvatarImage(
        figure: string,
        size: number,
        gender: AvatarGenderType,
        avatarListener: IAvatarImageListener,
        effectListener: IAvatarEffectListener,
    ): IAvatarImage | undefined {
        return this._avatarData.createAvatarImage(figure, size, gender, avatarListener, effectListener);
    }
}
