// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IWiredVariable } from './IWiredVariable';

/**
 * Flash `wiredcontext/variables/WiredVariable`: the text connector map sits behind a flag.
 * WIN63-202610121624 adds `requiresExecutionContext` after `isInvisible`, and a fallback text
 * behind its own flag after the map's pairs (order from the class's p-code).
 */
export const WiredVariableParser = (wrapper: IMessageDataWrapper): IWiredVariable => {
    let textConnector: Map<number, string> | undefined;
    let textConnectorFallback: string | undefined;
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
    const requiresExecutionContext = wrapper.readBoolean();
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
        if (wrapper.readBoolean()) textConnectorFallback = wrapper.readString();
    }
    return { variableId, variableType, variableName, availabilityType, variableTarget, alwaysAvailable, canCreateAndDelete, hasValue, canWriteValue, canInterceptChanges, isInvisible, requiresExecutionContext, canReadCreationTime, canReadLastUpdateTime, textConnector, textConnectorFallback };
};
