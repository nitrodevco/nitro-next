import type { IAnimation, IAnimationLayerData, IAnimationManager, IAssetAnimation } from '@nitrodevco/nitro-api';

import type { AvatarStructure } from '../AvatarStructure';
import { Animation } from './Animation';

export class AnimationManager implements IAnimationManager {
    private _animations: Map<string, IAnimation> = new Map();

    public registerAnimations(structure: AvatarStructure, animations: IAssetAnimation[]): boolean {
        if (!animations) return false;

        for (const animation of animations) this._animations.set(animation.name, new Animation(structure, animation));

        return true;
    }

    public getAnimation(name: string): IAnimation | undefined {
        return this._animations.get(name);
    }

    public getLayerData(name: string, frameCount: number, spriteId: string): IAnimationLayerData | undefined {
        return this._animations.get(name)?.getLayerData(frameCount, spriteId);
    }

    public get animations(): Map<string, IAnimation> {
        return this._animations;
    }
}
