import { VariableExtraSourceTypes } from './VariableExtraSourceTypes';

export interface IWiredObjectInspectionData {
    type: VariableExtraSourceTypes;
    userIndex?: number;
    objectId?: number;
    variableValues: Map<string, number>;
    configuredInWireds: number[];
}
