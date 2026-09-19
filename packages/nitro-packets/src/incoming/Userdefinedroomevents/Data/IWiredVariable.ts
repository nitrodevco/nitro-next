import { VariableType } from '../Wiredmenu/Data/VariableType';

export interface IWiredVariable {
    variableId: string;
    variableType: VariableType;
    variableName: string;
    availabilityType: number;
    variableTarget: number;
    alwaysAvailable: boolean;
    canCreateAndDelete: boolean;
    hasValue: boolean;
    canWriteValue: boolean;
    canInterceptChanges: boolean;
    isInvisible: boolean;
    canReadCreationTime: boolean;
    canReadLastUpdateTime: boolean;
    textConnector: Map<number, string>;
}
