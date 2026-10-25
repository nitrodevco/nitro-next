import { RoomGeometryScaleType, RoomObjectVariableEnum } from '@nitrodevco/nitro-api';

import { AnimatedFurnitureVisualization } from './AnimatedFurnitureVisualization';

/**
 * Port of Flash's obfuscated `§_-726§`, the visualization `RoomObjectVisualizationFactory` builds
 * for `furniture_soundblock`.
 */
export class FurnitureSoundBlockVisualization extends AnimatedFurnitureVisualization {
    private _internalFrameIncreaseCounter: number = 0;

    protected override updateAnimations(scale: RoomGeometryScaleType): number {
        this._internalFrameIncreaseCounter
            = this._internalFrameIncreaseCounter
                + this.object.model.getValue<number>(RoomObjectVariableEnum.FurnitureSoundblockRelativeAnimationSpeed);
        this._frameIncrease = this._internalFrameIncreaseCounter;
        this._internalFrameIncreaseCounter = this._internalFrameIncreaseCounter - this._frameIncrease;

        return super.updateAnimations(scale);
    }
}
