import { AvatarFigurePartType } from '../enum';
import type { IFigurePartSet } from './IFigurePartSet';
import type { IPalette } from './IPalette';
import type { ISetType } from './ISetType';

export interface IStructureData {
    parse(data: object): boolean;
    appendJSON(data: object): boolean;
    getSetType(type: string): ISetType | undefined;
    getPalette(paletteId: number): IPalette | undefined;
    getFigurePartSet(id: number): IFigurePartSet | undefined;
}
