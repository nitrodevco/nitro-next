import { IObjectIdAndValuePair } from '../../Data/ObjectIdAndValuePairParser';
import { IWiredVariable } from './IWiredVariable';

export interface IVariableInfoAndHolders {
    variable: IWiredVariable;
    holders: IObjectIdAndValuePair[];
}
