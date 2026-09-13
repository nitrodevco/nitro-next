import { IIncomingPacket, IMessageDataWrapper, IVariableFxStatusRemoveData, ParseArray } from '@nitrodevco/nitro-api';

import { VariableFxStatusRemoveDataParser } from './Data/VariableFxStatusRemoveDataParser';

export type VariableFxStatusRemovedMessageType = {
    statuses: IVariableFxStatusRemoveData[];
};

export class VariableFxStatusRemovedMessage implements IIncomingPacket<VariableFxStatusRemovedMessageType> {
    public parse(wrapper: IMessageDataWrapper): VariableFxStatusRemovedMessageType {
        const packet: VariableFxStatusRemovedMessageType = {
            statuses: ParseArray(wrapper, VariableFxStatusRemoveDataParser),
        };

        return packet;
    }
}
