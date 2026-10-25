import { IWiredFurniActionRulesetVariablesBase } from './IWiredFurniActionRulesetVariablesBase';
import { IWiredVariable } from './IWiredVariable';

export interface IVariableList extends IWiredFurniActionRulesetVariablesBase {
    variables: IWiredVariable[];
}
