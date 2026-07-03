import { IFigureDataSetType } from '#api/asset/index';
import type { IAdvancedMap } from '#api/utils';

import type { IFigurePartSet } from './IFigurePartSet';

export interface ISetType {
    dispose(): void;
    cleanUp(data: IFigureDataSetType): void;
    append(setType: IFigureDataSetType): void;
    getDefaultPartSet(gender: string): IFigurePartSet | undefined;
    getPartSet(id: number): IFigurePartSet | undefined;
    isMandatory(gender: string, _arg_2: number): boolean;
    optionalFromClubLevel(_arg_1: string): number;
    readonly type: string;
    readonly paletteId: number;
    readonly partSets: Map<number, IFigurePartSet>;
}
