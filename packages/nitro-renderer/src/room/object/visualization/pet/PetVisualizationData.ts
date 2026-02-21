import type { IAssetVisualizationData } from '@nitrodevco/nitro-api';

import type { SizeData } from '../data';
import { AnimationSizeData, PetSizeData } from '../data';
import { FurnitureAnimatedVisualizationData } from '../furniture';

export class PetVisualizationData extends FurnitureAnimatedVisualizationData {
    private _isAllowedToTurnHead: boolean = true;

    protected override getSizeData(size: number): PetSizeData | undefined {
        return super.getSizeData(size) as PetSizeData | undefined;
    }

    protected override createSizeData(scale: number, layerCount: number, angle: number): AnimationSizeData {
        if (scale > 1) return new PetSizeData(layerCount, angle);

        return new AnimationSizeData(layerCount, angle);
    }

    protected override defineVisualizations(visualizations: IAssetVisualizationData[]): boolean {
        this._isAllowedToTurnHead = true; //check visualization for '@disableheadturn'

        return super.defineVisualizations(visualizations);
    }

    protected override processVisualElement(sizeData: SizeData, key: string, data: any): boolean {
        if (!sizeData || !key || !data) return false;

        switch (key) {
            case 'postures':
                if (!(sizeData instanceof PetSizeData) || !sizeData.processPostures(data)) return false;
                break;
            case 'gestures':
                if (!(sizeData instanceof PetSizeData) || !sizeData.processGestures(data)) return false;
                break;
            default:
                if (!super.processVisualElement(sizeData, key, data)) return false;
                break;
        }

        return true;
    }

    public postureToAnimation(scale: number, posture: string): number {
        return this.getSizeData(scale)?.getAnimationForPosture(posture) ?? PetSizeData.DEFAULT;
    }

    public getGestureDisabled(scale: number, posture: string): boolean {
        return this.getSizeData(scale)?.getGestureDisabled(posture) ?? false;
    }

    public gestureToAnimation(scale: number, gesture: string): number {
        return this.getSizeData(scale)?.getAnimationForGesture(gesture) ?? PetSizeData.DEFAULT;
    }

    public animationToPosture(scale: number, index: number, useDefault: boolean): string | undefined {
        return this.getSizeData(scale)?.getPostureForAnimation(index, useDefault) ?? undefined;
    }

    public animationToGesture(scale: number, index: number): string | undefined {
        return this.getSizeData(scale)?.getGestureForAnimation(index) ?? undefined;
    }

    public getGestureForAnimationId(scale: number, id: number): string | undefined {
        return this.getSizeData(scale)?.getGestureForAnimationId(id) ?? undefined;
    }

    public totalPostures(scale: number): number {
        return this.getSizeData(scale)?.totalPostures ?? 0;
    }

    public totalGestures(scale: number): number {
        return this.getSizeData(scale)?.totalGestures ?? 0;
    }

    public get isAllowedToTurnHead(): boolean {
        return this._isAllowedToTurnHead;
    }
}
