import { AvatarGenderType, IAvatarImage, IAvatarImageListener, RoomGeometryScaleType } from '@nitrodevco/nitro-api';

import { AvatarVisualizationData } from '../avatar';
import { FurnitureVisualizationData } from './FurnitureVisualizationData';

/**
 * Flash `AvatarFurnitureVisualizationData`: a furniture's visualization data that can also draw an
 * avatar, through the `AvatarVisualizationData` it wraps - the mannequin's outfit.
 */
export class FurnitureMannequinVisualizationData extends FurnitureVisualizationData {
    private _avatarData: AvatarVisualizationData = new AvatarVisualizationData();

    /** Flash `getAvatar`: no gender leaves the figure as it is, without the mandatory parts filled in. */
    public createAvatarImage(figure: string, scale: RoomGeometryScaleType, gender: AvatarGenderType | undefined, listener: IAvatarImageListener): IAvatarImage | undefined {
        return this._avatarData.createAvatarImage(figure, scale, gender, listener);
    }
}
