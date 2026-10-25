import { IAllVariablesInRoom } from './IAllVariablesInRoom';
import { ISharedGlobalPlaceholderList } from './ISharedGlobalPlaceholderList';
import { ISharedVariableList } from './ISharedVariableList';
import { ITextPlaceholders } from './ITextPlaceholders';
import { IVariableInfoAndHolders } from './IVariableInfoAndHolders';
import { IVariableInfoAndValue } from './IVariableInfoAndValue';
import { IVariableLeaderboardContext } from './IVariableLeaderboard';
import { IVariableList } from './IVariableList';

export interface IWiredContext {
    roomVariablesList?: IAllVariablesInRoom;
    furniVariableInfo?: IVariableInfoAndHolders;
    userVariableInfo?: IVariableInfoAndHolders;
    globalVariableInfo?: IVariableInfoAndValue;
    rulesetVariables?: IVariableList;
    referenceVariablesList?: ISharedVariableList;
    referencePlaceholderList?: ISharedGlobalPlaceholderList;
    /** Section 7: what the message editor's "Add placeholder" button lists. */
    textPlaceholders?: ITextPlaceholders;
    /** Section 8: the Leaderboard add-on's overlay, tile and stacked variables. */
    variableLeaderboardContext?: IVariableLeaderboardContext;
}
