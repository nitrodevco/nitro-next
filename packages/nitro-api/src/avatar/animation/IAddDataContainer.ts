import { AvatarBodyPartType, AvatarFigurePartType } from "../enum";

export interface IAddDataContainer {
    readonly id: AvatarFigurePartType | string;
    readonly align: AvatarBodyPartType | undefined;
    readonly base: string;
    readonly ink: number;
    readonly blend: number;
    readonly isBlended: boolean;
}