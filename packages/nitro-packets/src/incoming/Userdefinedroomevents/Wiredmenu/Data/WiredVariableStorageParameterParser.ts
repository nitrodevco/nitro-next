// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IMessageDataWrapper, ReadLong } from '@nitrodevco/nitro-api';

import { IWiredVariableStorageParameter } from './IWiredVariableStorageParameter';

/** Flash `WiredVariableStorageParameter(wrapper, readVariableId = false)`: the id leads only where the caller asks for it. */
export const WiredVariableStorageParameterParser = (wrapper: IMessageDataWrapper, readVariableId: boolean = false): IWiredVariableStorageParameter => {
    const variableId = readVariableId ? wrapper.readString() : undefined;
    const value = wrapper.readInt();
    const creationTime = ReadLong(wrapper);
    const creationTimeStr = wrapper.readString();
    const lastUpdateTime = ReadLong(wrapper);
    const lastUpdateTimeStr = wrapper.readString();

    return { variableId, value, creationTime, creationTimeStr, lastUpdateTime, lastUpdateTimeStr };
};
