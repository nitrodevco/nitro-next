import type { IAssetVisualAnimation, RoomGeometryScaleType } from '@nitrodevco/nitro-api';

import type { AnimationFrame, SizeData } from '../data';
import { AnimationSizeData } from '../data';
import { FurnitureVisualizationData } from './FurnitureVisualizationData';

export class FurnitureAnimatedVisualizationData extends FurnitureVisualizationData {
    protected override getSizeData(size: number): AnimationSizeData | undefined {
        return super.getSizeData(size) as AnimationSizeData | undefined;
    }

    protected override createSizeData(scale: RoomGeometryScaleType, layerCount: number, angle: number): AnimationSizeData {
        return new AnimationSizeData(layerCount, angle);
    }

    protected override processVisualElement(sizeData: SizeData, key: string, data: object): boolean {
        if (!sizeData || !key || !data) return false;

        switch (key) {
            case 'animations':
                if (!(sizeData instanceof AnimationSizeData) || !sizeData.defineAnimations(data as IAssetVisualAnimation[])) return false;
                break;
            default:
                if (!super.processVisualElement(sizeData, key, data)) return false;
                break;
        }

        return true;
    }

    public hasAnimation(scale: RoomGeometryScaleType, animationId: number): boolean {
        return this.getSizeData(scale)?.hasAnimation(animationId) ?? false;
    }

    public getAnimationCount(scale: RoomGeometryScaleType): number {
        return this.getSizeData(scale)?.getAnimationCount() ?? 0;
    }

    public getAnimationId(scale: RoomGeometryScaleType, animationId: number): number {
        return this.getSizeData(scale)?.getAnimationId(animationId) ?? 0;
    }

    public isImmediateChange(scale: RoomGeometryScaleType, animationId: number, state: number): boolean {
        return this.getSizeData(scale)?.isImmediateChange(animationId, state) ?? false;
    }

    public getStartFrame(scale: RoomGeometryScaleType, animationId: number, direction: number): number {
        return this.getSizeData(scale)?.getStartFrame(animationId, direction) ?? 0;
    }

    public getFrame(
        scale: RoomGeometryScaleType,
        animationId: number,
        direction: number,
        layerId: number,
        frameCount: number,
    ): AnimationFrame | undefined {
        return this.getSizeData(scale)?.getFrame(animationId, direction, layerId, frameCount) ?? undefined;
    }

    public getFrameFromSequence(
        scale: RoomGeometryScaleType,
        animationId: number,
        direction: number,
        layerId: number,
        sequenceId: number,
        offset: number,
        frameCount: number,
    ): AnimationFrame | undefined {
        return (
            this.getSizeData(scale)?.getFrameFromSequence(
                animationId,
                direction,
                layerId,
                sequenceId,
                offset,
                frameCount,
            ) ?? undefined
        );
    }
}
