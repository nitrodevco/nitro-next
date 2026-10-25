import { IAnimation } from './IAnimation';
import { IAnimationLayerData } from './IAnimationLayerData';

export interface IAnimationManager {
    getAnimation(name: string): IAnimation | undefined;
    getLayerData(name: string, frameCount: number, spriteId: string): IAnimationLayerData | undefined;
    readonly animations: Map<string, IAnimation>;
}
