import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IVariableInfoAndHolders } from '../Data/IVariableInfoAndHolders';
import { VariableInfoAndHoldersParser } from '../Data/VariableInfoAndHoldersParser';

export type WiredAllVariableHoldersMessageType = {
    variableInfoAndHolders: IVariableInfoAndHolders;
};

export class WiredAllVariableHoldersMessage implements IIncomingPacket<WiredAllVariableHoldersMessageType> {
    public parse(wrapper: IMessageDataWrapper): WiredAllVariableHoldersMessageType {
        wrapper.readInt();
        const variableInfoAndHolders = VariableInfoAndHoldersParser(wrapper);
        return { variableInfoAndHolders };
    }
}
