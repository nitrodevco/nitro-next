// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IMessageDataWrapper, ParseArray } from '@nitrodevco/nitro-api';

import { IWiredUserPermanentVariablesList } from './IWiredUserPermanentVariablesList';
import { WiredVariableStorageParameterParser } from './WiredVariableStorageParameterParser';

/** Flash `WiredUserPermanentVariablesList`. */
export const WiredUserPermanentVariablesListParser = (wrapper: IMessageDataWrapper): IWiredUserPermanentVariablesList => {
    const entityType = wrapper.readInt();
    const entityId = wrapper.readInt();
    const entityName = wrapper.readString();
    const entityFigure = wrapper.readString();
    const list: IWiredUserPermanentVariablesList = { entityType, entityId, entityName, entityFigure, variableStorage: [] };

    if (entityType !== 1) {
        list.ownerId = wrapper.readInt();
        list.ownerName = wrapper.readString();
        list.ownerFigure = wrapper.readString();
    }

    list.variableStorage = ParseArray(wrapper, wrapper => WiredVariableStorageParameterParser(wrapper, true));

    return list;
};
