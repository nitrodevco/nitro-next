// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IWiredVariable } from './IWiredVariable';

/** Flash `_-YB.WiredVariable`: the text connector map sits behind a flag. */
export const WiredVariableParser = (wrapper: IMessageDataWrapper): IWiredVariable => {
    let textConnector: Map<number, string> | undefined;
    const variableId = wrapper.readString();
    const variableType = wrapper.readInt();
    const variableName = wrapper.readString();
    const availabilityType = wrapper.readInt();
    const variableTarget = wrapper.readInt();
    const alwaysAvailable = wrapper.readBoolean();
    const canCreateAndDelete = wrapper.readBoolean();
    const hasValue = wrapper.readBoolean();
    const canWriteValue = wrapper.readBoolean();
    const canInterceptChanges = wrapper.readBoolean();
    const isInvisible = wrapper.readBoolean();
    const canReadCreationTime = wrapper.readBoolean();
    const canReadLastUpdateTime = wrapper.readBoolean();
    const hasTextConnector = wrapper.readBoolean();
    if (hasTextConnector) {
        textConnector = new Map();
        const count = wrapper.readInt();
        for (let i = 0; i < count; i++) {
            const value = wrapper.readInt();
            const text = wrapper.readString();
            textConnector.set(value, text);
        }
    }
    return { variableId, variableType, variableName, availabilityType, variableTarget, alwaysAvailable, canCreateAndDelete, hasValue, canWriteValue, canInterceptChanges, isInvisible, canReadCreationTime, canReadLastUpdateTime, textConnector };
};
