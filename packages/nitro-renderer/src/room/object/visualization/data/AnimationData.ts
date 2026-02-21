import type {
    IAssetVisualAnimation,
    IAssetVisualAnimationLayer,
    IAssetVisualAnimationSequenceFrame,
} from '@nitrodevco/nitro-api';

import type { AnimationFrame } from './AnimationFrame';
import { AnimationLayerData } from './AnimationLayerData';
import { DirectionalOffsetData } from './DirectionalOffsetData';

export class AnimationData {
    private static TRANSITION_TO_ANIMATION_OFFSET: number = 1000000;
    private static TRANSITION_FROM_ANIMATION_OFFSET: number = 2000000;

    public static DEFAULT_FRAME_NUMBER: number = 0;

    private _layers: Map<number, AnimationLayerData> = new Map();
    private _frameCount: number = -1;
    private _randomStart: boolean = false;
    private _immediateChanges: number[] = [];

    public static getTransitionToAnimationId(animationId: number): number {
        return AnimationData.TRANSITION_TO_ANIMATION_OFFSET + animationId;
    }

    public static getTransitionFromAnimationId(animationId: number): number {
        return AnimationData.TRANSITION_FROM_ANIMATION_OFFSET + animationId;
    }

    public static isTransitionToAnimation(animationId: number): boolean {
        return (
            animationId >= AnimationData.TRANSITION_TO_ANIMATION_OFFSET &&
            animationId < AnimationData.TRANSITION_FROM_ANIMATION_OFFSET
        );
    }

    public static isTransitionFromAnimation(animationId: number): boolean {
        return animationId >= AnimationData.TRANSITION_FROM_ANIMATION_OFFSET;
    }

    public dispose(): void {
        for (const layer of this._layers.values()) layer?.dispose();

        this._layers.clear();

        this._immediateChanges = [];
    }

    public setImmediateChanges(animationIds: number[]): void {
        this._immediateChanges = animationIds;
    }

    public isImmediateChange(animationId: number): boolean {
        return this._immediateChanges.indexOf(animationId) >= 0 || false;
    }

    public getStartFrame(direction: number): number {
        return !this._randomStart ? 0 : Math.random() * this._frameCount;
    }

    public initialize(animation: IAssetVisualAnimation): boolean {
        if (animation.randomStart) this._randomStart = true;

        if (animation.layers) {
            for (const key in animation.layers) {
                const layer = animation.layers[key];

                if (!layer) return false;

                const animationId = parseInt(key);

                const loopCount = layer.loopCount !== undefined ? layer.loopCount : 1;
                const frameRepeat = layer.frameRepeat !== undefined ? layer.frameRepeat : 1;
                const isRandom = layer.random !== undefined && layer.random !== 0 ? true : false;

                if (!this.addLayer(animationId, loopCount, frameRepeat, isRandom, layer)) return false;
            }
        }

        return true;
    }

    private addLayer(
        animationId: number,
        loopCount: number,
        frameRepeat: number,
        isRandom: boolean,
        layer: IAssetVisualAnimationLayer,
    ): boolean {
        const layerData = new AnimationLayerData(loopCount, frameRepeat, isRandom);

        if (layer.frameSequences) {
            for (const key in layer.frameSequences) {
                const animationSequence = layer.frameSequences[key];

                if (!animationSequence) continue;

                const loopCount = animationSequence.loopCount ?? 1;
                const isSequenceRandom =
                    animationSequence.random !== undefined && animationSequence.random !== 0 ? true : false;

                const frame = layerData.addFrameSequence(loopCount, isSequenceRandom);

                if (animationSequence.frames) {
                    for (const key in animationSequence.frames) {
                        const animationFrame = animationSequence.frames[key];

                        if (!animationFrame) {
                            layerData.dispose();

                            return false;
                        }

                        frame.addFrame(
                            animationFrame.id,
                            animationFrame.x ?? 0,
                            animationFrame.y ?? 0,
                            animationFrame.randomX ?? 0,
                            animationFrame.randomY ?? 0,
                            this.readDirectionalOffsets(animationFrame),
                        );
                    }
                }

                frame.initialize();
            }
        }

        layerData.calculateLength();

        this._layers.set(animationId, layerData);

        const frameCount: number = layerData.frameCount;

        if (frameCount > this._frameCount) this._frameCount = frameCount;

        return true;
    }

    private readDirectionalOffsets(frame: IAssetVisualAnimationSequenceFrame): DirectionalOffsetData | undefined {
        let directionalOffset: DirectionalOffsetData | undefined = undefined;

        if (frame && frame.offsets) {
            for (const directionId in frame.offsets) {
                const offset = frame.offsets[directionId];

                if (!offset) continue;

                if (!directionalOffset) directionalOffset = new DirectionalOffsetData();

                directionalOffset.setDirection(offset.direction, offset.x, offset.y);
            }
        }

        return directionalOffset;
    }

    public getFrame(direction: number, layerId: number, frameCount: number): AnimationFrame | undefined {
        return this._layers.get(layerId)?.getFrame(direction, frameCount) ?? undefined;
    }

    public getFrameFromSequence(
        direction: number,
        layerId: number,
        sequenceId: number,
        offset: number,
        frameCount: number,
    ): AnimationFrame | undefined {
        return this._layers.get(layerId)?.getFrameFromSequence(direction, sequenceId, offset, frameCount);
    }
}
