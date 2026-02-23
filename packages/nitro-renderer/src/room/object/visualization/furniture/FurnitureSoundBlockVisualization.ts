import { RoomObjectVariableEnum } from '@nitrodevco/nitro-api';

import { FurnitureAnimatedVisualization } from './FurnitureAnimatedVisualization';

export class FurnitureSoundBlockVisualization extends FurnitureAnimatedVisualization {
    private _internalFrameIncreaseCounter: number = 0;

    protected override updateAnimations(scale: number): number {
        this._internalFrameIncreaseCounter =
            this._internalFrameIncreaseCounter +
            this.object.model.getValue<number>(RoomObjectVariableEnum.FurnitureSoundblockRelativeAnimationSpeed);
        this._frameIncrease = this._internalFrameIncreaseCounter;
        this._internalFrameIncreaseCounter = this._internalFrameIncreaseCounter - this._frameIncrease;

        return super.updateAnimations(scale);
    }
}
