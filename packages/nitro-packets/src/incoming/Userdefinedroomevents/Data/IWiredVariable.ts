// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { VariableType } from '../Wiredmenu/Data/VariableType';
import { WiredVariableAvailability } from './WiredVariableAvailability';
import { WiredVariableTarget } from './WiredVariableTarget';

/** Flash `_-YB.WiredVariable`. */
export interface IWiredVariable {
    variableId: string;
    variableType: VariableType;
    variableName: string;
    availabilityType: WiredVariableAvailability;
    variableTarget: WiredVariableTarget;
    alwaysAvailable: boolean;
    canCreateAndDelete: boolean;
    hasValue: boolean;
    canWriteValue: boolean;
    canInterceptChanges: boolean;
    isInvisible: boolean;
    canReadCreationTime: boolean;
    canReadLastUpdateTime: boolean;
    /** The texts a value is shown as, by value. Absent when the server sent none - Flash's `hasTextConnector`. */
    textConnector?: Map<number, string>;
}
