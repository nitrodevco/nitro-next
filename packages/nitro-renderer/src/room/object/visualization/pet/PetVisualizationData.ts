import type { IAssetVisualizationData, RoomGeometryScaleType } from '@nitrodevco/nitro-api';

import type { AnimationSizeData, SizeData } from '../data';
import { PetSizeData } from '../data';
import { FurnitureAnimatedVisualizationData } from '../furniture';

export class PetVisualizationData extends FurnitureAnimatedVisualizationData {
    private _isAllowedToTurnHead: boolean = true;

    protected override getSizeData(size: RoomGeometryScaleType): PetSizeData | undefined {
        return super.getSizeData(size) as PetSizeData | undefined;
    }

    protected override createSizeData(scale: RoomGeometryScaleType, layerCount: number, angle: number): AnimationSizeData {
        return new PetSizeData(layerCount, angle);
    }

    protected override defineVisualizations(visualizations: IAssetVisualizationData[]): boolean {
        this._isAllowedToTurnHead = true; //check visualization for '@disableheadturn'

        return super.defineVisualizations(visualizations);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    protected override processVisualElement(sizeData: SizeData, key: string, data: any): boolean {
        if (!sizeData || !key || !data) return false;

        switch (key) {
            case 'postures':
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                if (!(sizeData instanceof PetSizeData) || !sizeData.processPostures(data)) return false;
                break;
            case 'gestures':
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                if (!(sizeData instanceof PetSizeData) || !sizeData.processGestures(data)) return false;
                break;
            default:
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                if (!super.processVisualElement(sizeData, key, data)) return false;
                break;
        }

        return true;
    }

    public postureToAnimation(scale: RoomGeometryScaleType, posture: string): number {
        return this.getSizeData(scale)?.getAnimationForPosture(posture) ?? PetSizeData.DEFAULT;
    }

    public getGestureDisabled(scale: RoomGeometryScaleType, posture: string): boolean {
        return this.getSizeData(scale)?.getGestureDisabled(posture) ?? false;
    }

    public gestureToAnimation(scale: RoomGeometryScaleType, gesture: string): number {
        return this.getSizeData(scale)?.getAnimationForGesture(gesture) ?? PetSizeData.DEFAULT;
    }

    public animationToPosture(scale: RoomGeometryScaleType, index: number, useDefault: boolean): string | undefined {
        return this.getSizeData(scale)?.getPostureForAnimation(index, useDefault) ?? undefined;
    }

    public animationToGesture(scale: RoomGeometryScaleType, index: number): string | undefined {
        return this.getSizeData(scale)?.getGestureForAnimation(index) ?? undefined;
    }

    public getGestureForAnimationId(scale: RoomGeometryScaleType, id: number): string | undefined {
        return this.getSizeData(scale)?.getGestureForAnimationId(id) ?? undefined;
    }

    public totalPostures(scale: RoomGeometryScaleType): number {
        return this.getSizeData(scale)?.totalPostures ?? 0;
    }

    public totalGestures(scale: RoomGeometryScaleType): number {
        return this.getSizeData(scale)?.totalGestures ?? 0;
    }

    public get isAllowedToTurnHead(): boolean {
        return this._isAllowedToTurnHead;
    }
}
