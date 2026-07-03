import { IFigureDataSetType } from '#api/asset/index';
import type { IAdvancedMap } from '#api/utils';
import { AvatarFigurePartType, AvatarGenderType } from '../enum';

import type { IFigurePartSet } from './IFigurePartSet';

export interface ISetType {
    dispose(): void;
    cleanUp(data: IFigureDataSetType): void;
    append(setType: IFigureDataSetType): void;
    getDefaultPartSet(gender: AvatarGenderType): IFigurePartSet | undefined;
    getPartSet(id: number): IFigurePartSet | undefined;
    isMandatory(gender: AvatarGenderType, count: number): boolean;
    optionalFromClubLevel(gender: AvatarGenderType): number;
    readonly type: AvatarFigurePartType;
    readonly paletteId: number;
    readonly partSets: Map<number, IFigurePartSet>;
}
