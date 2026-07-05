import { AvatarGenderType } from '#api/avatar/enum';
import type { IFigureDataHiddenLayer } from './IFigureDataHiddenLayer';
import type { IFigureDataPart } from './IFigureDataPart';

export interface IFigureDataSet {
    id: number;
    gender?: AvatarGenderType;
    club?: number;
    colorable?: boolean;
    selectable?: boolean;
    preselectable?: boolean;
    sellable?: boolean;
    parts?: IFigureDataPart[];
    hiddenLayers?: IFigureDataHiddenLayer[];
}
