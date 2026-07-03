import { AvatarFigurePartType } from "#api/avatar/enum";

export interface IFigureDataPart {
    id: number;
    type: AvatarFigurePartType;
    colorable?: boolean;
    index: number;
    colorindex?: number;
}
