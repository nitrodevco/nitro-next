import { AvatarFigurePartType } from "./enum";

export interface IAvatarFigureContainer {
    getPartTypeIds(): AvatarFigurePartType[];
    hasPartType(type: AvatarFigurePartType): boolean;
    getPartSetId(type: AvatarFigurePartType): number;
    getPartColorIds(type: AvatarFigurePartType): number[];
    updatePart(type: AvatarFigurePartType, setId: number, colorIds: number[]): void;
    removePart(type: AvatarFigurePartType): void;
    getFigureString(): string;
}
