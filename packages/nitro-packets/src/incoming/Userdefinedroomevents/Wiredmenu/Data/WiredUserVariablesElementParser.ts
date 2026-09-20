// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IWiredUserVariablesElement } from './IWiredUserVariablesElement';
import { WiredVariableStorageParameterParser } from './WiredVariableStorageParameterParser';

/** Flash `WiredUserVariablesElement`. */
export const WiredUserVariablesElementParser = (wrapper: IMessageDataWrapper): IWiredUserVariablesElement => {
    return {
        entityType: wrapper.readInt(),
        entityId: wrapper.readInt(),
        entityName: wrapper.readString(),
        storage: WiredVariableStorageParameterParser(wrapper),
    };
};
