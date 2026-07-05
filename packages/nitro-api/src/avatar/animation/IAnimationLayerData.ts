import type { IActiveActionData } from '../actions';
import { AvatarFigurePartType } from '../enum';

export interface IAnimationLayerData {
    readonly id: string;
    readonly animationFrame: number;
    readonly dx: number;
    readonly dy: number;
    readonly dz: number;
    readonly dd: number;
    readonly type: string;
    readonly base: number;
    readonly action: IActiveActionData;
    readonly items: Map<AvatarFigurePartType, number>;
}
