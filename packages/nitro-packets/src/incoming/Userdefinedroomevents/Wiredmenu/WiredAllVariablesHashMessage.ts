import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type WiredAllVariablesHashMessageType = {
    allVariablesHash: number;
};

export class WiredAllVariablesHashMessage implements IIncomingPacket<WiredAllVariablesHashMessageType> {
    public parse(wrapper: IMessageDataWrapper): WiredAllVariablesHashMessageType {
        const allVariablesHash = wrapper.readInt();
        return { allVariablesHash };
    }
}
