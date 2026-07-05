import { AvatarFigurePartType, AvatarGenderType } from '../enum';
import type { IFigurePart } from './IFigurePart';

export interface IFigurePartSet {
    dispose(): void;
    getPart(type: string, id: number): IFigurePart | undefined;
    readonly id: number;
    readonly type: AvatarFigurePartType;
    readonly gender: AvatarGenderType;
    readonly clubLevel: number;
    readonly isColorable: boolean;
    readonly isSelectable: boolean;
    readonly parts: IFigurePart[];
    readonly hiddenLayers: string[];
    readonly isPreSelectable: boolean;
    readonly isSellable: boolean;
}
