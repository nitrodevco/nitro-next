import { AvatarGenderType } from '#api/avatar/enum';

import { IFigureDataHiddenLayer } from './IFigureDataHiddenLayer';
import { IFigureDataPart } from './IFigureDataPart';

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
