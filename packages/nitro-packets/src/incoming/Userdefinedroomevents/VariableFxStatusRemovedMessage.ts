// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
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
