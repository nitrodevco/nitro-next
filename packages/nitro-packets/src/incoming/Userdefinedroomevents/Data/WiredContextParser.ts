// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { AllVariablesInRoomParser } from './AllVariablesInRoomParser';
import { IAllVariablesInRoom } from './IAllVariablesInRoom';
import { ISharedGlobalPlaceholderList } from './ISharedGlobalPlaceholderList';
import { ISharedVariableList } from './ISharedVariableList';
import { IVariableInfoAndHolders } from './IVariableInfoAndHolders';
import { IVariableInfoAndValue } from './IVariableInfoAndValue';
import { IVariableList } from './IVariableList';
import { IWiredContext } from './IWiredContext';
import { SharedGlobalPlaceholderListParser } from './SharedGlobalPlaceholderListParser';
import { SharedVariableListParser } from './SharedVariableListParser';
import { VariableInfoAndHoldersParser } from './VariableInfoAndHoldersParser';
import { VariableInfoAndValueParser } from './VariableInfoAndValueParser';
import { VariableListParser } from './VariableListParser';
import { WiredFurniActionEnum } from './WiredFurniActionEnum';

export const WiredContextParser = (wrapper: IMessageDataWrapper): IWiredContext => {
    let roomVariablesList: IAllVariablesInRoom | undefined;
    let furniVariableInfo: IVariableInfoAndHolders | undefined;
    let userVariableInfo: IVariableInfoAndHolders | undefined;
    let globalVariableInfo: IVariableInfoAndValue | undefined;
    let rulesetVariables: IVariableList | undefined;
    let referenceVariablesList: ISharedVariableList | undefined;
    let referencePlaceholderList: ISharedGlobalPlaceholderList | undefined;
    const count = wrapper.readInt();
    for (let i2 = 0; i2 < count; i2++) {
        const section: WiredFurniActionEnum = wrapper.readInt();

        switch (section) {
            case WiredFurniActionEnum.RoomVariables:
                roomVariablesList = AllVariablesInRoomParser(wrapper);
                break;
            case WiredFurniActionEnum.FurniVariableInfo:
                furniVariableInfo = VariableInfoAndHoldersParser(wrapper);
                break;
            case WiredFurniActionEnum.UserVariableInfo:
                userVariableInfo = VariableInfoAndHoldersParser(wrapper);
                break;
            case WiredFurniActionEnum.GlobalVariableInfo:
                globalVariableInfo = VariableInfoAndValueParser(wrapper);
                break;
            case WiredFurniActionEnum.ReferenceVariables:
                referenceVariablesList = SharedVariableListParser(wrapper);
                break;
            case WiredFurniActionEnum.RulesetVariables:
                rulesetVariables = VariableListParser(wrapper);
                break;
            case WiredFurniActionEnum.ReferencePlaceholders:
                referencePlaceholderList = SharedGlobalPlaceholderListParser(wrapper);
        }
    }
    return { roomVariablesList, furniVariableInfo, userVariableInfo, globalVariableInfo, rulesetVariables, referenceVariablesList, referencePlaceholderList };
};
