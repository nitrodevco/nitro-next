// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IObjectIdAndValuePair } from '../../Data/ObjectIdAndValuePairParser';
import { IWiredVariable } from './IWiredVariable';

export interface IVariableInfoAndHolders {
    variable: IWiredVariable;
    holders: IObjectIdAndValuePair[];
}
