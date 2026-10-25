// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { ISharedVariable } from './ISharedVariable';
import { IWiredVariable } from './IWiredVariable';

/** Flash `_-315.SharedVariableList`: the variables other rooms share with this one. */
export interface ISharedVariableList {
    sharedVariables: ISharedVariable[];
    /** The `wiredVariable` of each entry, in the same order - the list Flash hands to a variable picker. */
    variables: IWiredVariable[];
}
