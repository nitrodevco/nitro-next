import { IAllVariablesInRoom } from './IAllVariablesInRoom';
import { ISharedGlobalPlaceholderList } from './ISharedGlobalPlaceholderList';
import { ISharedVariableList } from './ISharedVariableList';
import { IVariableInfoAndHolders } from './IVariableInfoAndHolders';
import { IVariableInfoAndValue } from './IVariableInfoAndValue';
import { IVariableList } from './IVariableList';

export interface IWiredContext {
    roomVariablesList?: IAllVariablesInRoom;
    furniVariableInfo?: IVariableInfoAndHolders;
    userVariableInfo?: IVariableInfoAndHolders;
    globalVariableInfo?: IVariableInfoAndValue;
    rulesetVariables?: IVariableList;
    referenceVariablesList?: ISharedVariableList;
    referencePlaceholderList?: ISharedGlobalPlaceholderList;
}
