import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IWiredVariable } from './IWiredVariable';

export const WiredVariableParser = (wrapper: IMessageDataWrapper): IWiredVariable => {
    let textConnector: Map<number, string> = new Map<number, string>();
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
    const loc2 = wrapper.readBoolean();
    if (loc2) {
        textConnector = new Map();
        const count = wrapper.readInt();
        for (let i2 = 0; i2 < count; i2++) {
            const loc6 = wrapper.readInt();
            const loc5 = wrapper.readString();
            textConnector.set(loc6, loc5);
        }
    }
    return { variableId, variableType, variableName, availabilityType, variableTarget, alwaysAvailable, canCreateAndDelete, hasValue, canWriteValue, canInterceptChanges, isInvisible, canReadCreationTime, canReadLastUpdateTime, textConnector };
};
