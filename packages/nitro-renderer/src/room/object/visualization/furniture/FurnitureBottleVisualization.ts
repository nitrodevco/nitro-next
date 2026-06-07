import type { RoomGeometryScaleType } from '@nitrodevco/nitro-api';

import { FurnitureAnimatedVisualization } from './FurnitureAnimatedVisualization';

export class FurnitureBottleVisualization extends FurnitureAnimatedVisualization {
    private static ANIMATION_ID_OFFSET_SLOW1: number = 20;
    private static ANIMATION_ID_OFFSET_SLOW2: number = 9;
    private static ANIMATION_ID_ROLL: number = -1;

    private _stateQueue: number[] = [];
    private _running: boolean = false;

    protected override setAnimation(animationId: number): void {
        if (animationId === -1 && !this._running) {
            this._running = true;
            this._stateQueue = [];

            this._stateQueue.push(FurnitureBottleVisualization.ANIMATION_ID_ROLL);

            return;
        }

        if (animationId >= 0 && animationId <= 7) {
            if (this._running) {
                this._running = false;
                this._stateQueue = [];

                this._stateQueue.push(FurnitureBottleVisualization.ANIMATION_ID_OFFSET_SLOW1);
                this._stateQueue.push(FurnitureBottleVisualization.ANIMATION_ID_OFFSET_SLOW2 + animationId);
                this._stateQueue.push(animationId);

                return;
            }

            super.setAnimation(animationId);
        }
    }

    protected override updateAnimation(scale: RoomGeometryScaleType): number {
        if (this.getLastFramePlayed(0) && this._stateQueue.length > 0)
            super.setAnimation(this._stateQueue.shift() as number);

        return super.updateAnimation(scale);
    }
}
