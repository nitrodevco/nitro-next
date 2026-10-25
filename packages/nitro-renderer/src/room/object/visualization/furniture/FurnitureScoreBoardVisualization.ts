import { RoomGeometryScaleType } from '@nitrodevco/nitro-api';

import { AnimatedFurnitureVisualization } from './AnimatedFurnitureVisualization';

/**
 * Port of Flash's obfuscated `§_-52b§`, the visualization `RoomObjectVisualizationFactory` builds
 * for `furniture_score_board`.
 */
export class FurnitureScoreBoardVisualization extends AnimatedFurnitureVisualization {
    private static ONES_SPRITE: string = 'ones_sprite';
    private static TENS_SPRITE: string = 'tens_sprite';
    private static HUNDREDS_SPRITE: string = 'hundreds_sprite';
    private static THOUSANDS_SPRITE: string = 'thousands_sprite';

    protected override getFrameNumber(scale: RoomGeometryScaleType, layerId: number): number {
        const tag = this.getLayerTag(scale, this.direction, layerId);
        const animation = this.object.getState(0);

        switch (tag) {
            case FurnitureScoreBoardVisualization.ONES_SPRITE:
                return Math.floor(animation % 10);
            case FurnitureScoreBoardVisualization.TENS_SPRITE:
                return Math.floor((animation / 10) % 10);
            case FurnitureScoreBoardVisualization.HUNDREDS_SPRITE:
                return Math.floor((animation / 100) % 10);
            case FurnitureScoreBoardVisualization.THOUSANDS_SPRITE:
                return Math.floor((animation / 1000) % 10);
            default:
                return super.getFrameNumber(scale, layerId);
        }
    }
}
