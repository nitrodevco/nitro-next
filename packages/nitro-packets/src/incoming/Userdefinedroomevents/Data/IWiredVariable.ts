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
    /**
     * Flash's `requiresExecutionContext`: kept out of the pickers that use a variable outside a
     * running stack (Echo, Variable Changed, the fx rows). Habbo sends it false for every
     * variable today, the context ones included (official client capture, WIN63-202610121709).
     */
    requiresExecutionContext: boolean;
    canReadCreationTime: boolean;
    canReadLastUpdateTime: boolean;
    /** The texts a value is shown as, by value. Absent when the server sent none - Flash's `hasTextConnector`. */
    textConnector?: Map<number, string>;
    /** What a value without a label of its own is shown as (a text connector's `_=` line) - Flash's `textConnectorFallback`. */
    textConnectorFallback?: string;
}
