import type { IFigureDataPalette } from './IFigureDataPalette';
import type { IFigureDataSetType } from './IFigureDataSetType';

export interface IFigureData {
    palettes?: IFigureDataPalette[];
    setTypes?: IFigureDataSetType[];
}
