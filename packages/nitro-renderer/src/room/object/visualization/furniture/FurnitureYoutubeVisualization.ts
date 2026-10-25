import { RoomObjectVariableEnum } from '@nitrodevco/nitro-api';

import { ExternalIsometricImageFurniVisualization } from './ExternalIsometricImageFurniVisualization';

/**
 * Port of Flash's obfuscated `§_-AD§`, the visualization `RoomObjectVisualizationFactory` builds
 * for `furniture_youtube`.
 */
export class FurnitureYoutubeVisualization extends ExternalIsometricImageFurniVisualization {
    protected static THUMBNAIL_URL: string = 'THUMBNAIL_URL';

    protected override getThumbnailURL(): string | undefined {
        const furnitureData = this.object.model.getValue<{ [index: string]: string }>(
            RoomObjectVariableEnum.FurnitureData,
        );

        if (furnitureData) return furnitureData[FurnitureYoutubeVisualization.THUMBNAIL_URL] || undefined;

        return undefined;
    }
}
