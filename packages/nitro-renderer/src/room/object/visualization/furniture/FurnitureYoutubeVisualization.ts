import { RoomObjectVariableEnum } from '@nitrodevco/nitro-api';

import { FurnitureDynamicThumbnailVisualization } from './FurnitureDynamicThumbnailVisualization';

export class FurnitureYoutubeVisualization extends FurnitureDynamicThumbnailVisualization {
    protected static THUMBNAIL_URL: string = 'THUMBNAIL_URL';

    protected override getThumbnailURL(): string | undefined {
        const furnitureData = this.object.model.getValue<{ [index: string]: string }>(
            RoomObjectVariableEnum.FurnitureData,
        );

        if (furnitureData) return furnitureData[FurnitureYoutubeVisualization.THUMBNAIL_URL] || undefined;

        return undefined;
    }
}
