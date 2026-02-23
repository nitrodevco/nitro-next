import type { IFigureData } from '../figuredata';

export interface IFigureSetData {
    parse(data: any): boolean;
    appendJSON(data: IFigureData): boolean;
}
