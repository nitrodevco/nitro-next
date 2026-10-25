import { IWiredFurniActionDefBase } from './IWiredFurniActionDefBase';
import { QuantifierType } from './QuantifierType';

export interface IWiredFurniConditionDef extends IWiredFurniActionDefBase {
    quantifierCode: number;
    quantifierType: QuantifierType;
    isInvert: boolean;
}
