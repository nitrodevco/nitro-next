import { IWiredFurniActionDefBase } from './IWiredFurniActionDefBase';

export interface ISelectorDefinition extends IWiredFurniActionDefBase {
    isFilter: boolean;
    isInvert: boolean;
}
