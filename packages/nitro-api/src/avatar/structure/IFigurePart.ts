import { AvatarFigurePartType } from "../enum";

export interface IFigurePart {
    dispose(): void;
    readonly id: number;
    readonly type: AvatarFigurePartType;
    readonly index: number;
    readonly colorLayerIndex: number;
    readonly paletteMap: number;
    readonly breed: number;
}
