import { IIncomingPacket, IMessageDataWrapper, ParseStrings } from '@nitrodevco/nitro-api';

import { IWiredVariable } from '../Data/IWiredVariable';
import { WiredVariableParser } from '../Data/WiredVariableParser';

export type WiredAllVariablesDiffsMessageType = {
    allVariablesHash: number;
    isLastChunk: boolean;
    removedVariables: string[];
    addedOrUpdated: Map<IWiredVariable, number>;
};

export class WiredAllVariablesDiffsMessage implements IIncomingPacket<WiredAllVariablesDiffsMessageType> {
    public parse(wrapper: IMessageDataWrapper): WiredAllVariablesDiffsMessageType {
        const allVariablesHash = wrapper.readInt();
        const isLastChunk = wrapper.readBoolean();
        const removedVariables = ParseStrings(wrapper);
        const count = wrapper.readInt();
        const addedOrUpdated = new Map();
        for (let i2 = 0; i2 < count; i2++) {
            const loc6 = wrapper.readInt();
            const wiredVariable = WiredVariableParser(wrapper);
            addedOrUpdated.set(wiredVariable, loc6);
        }
        return { allVariablesHash, isLastChunk, removedVariables, addedOrUpdated };
    }
}
