import { IFigurePartSet } from './IFigurePartSet';
import { IPalette } from './IPalette';
import { ISetType } from './ISetType';

export interface IStructureData {
    parse(data: object): boolean;
    appendJSON(data: object): boolean;
    getSetType(type: string): ISetType | undefined;
    getPalette(paletteId: number): IPalette | undefined;
    getFigurePartSet(id: number): IFigurePartSet | undefined;
}
