import { AvatarFigurePartType } from '#api/avatar';

export interface IFigureMapLibraryPart {
    /** Numeric for figure parts; `hh_human_fx` carries names (`fx97`, `sd`), which Flash keys as written. */
    id: number | string;
    type: AvatarFigurePartType;
}
