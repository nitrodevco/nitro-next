import { IIncomingPacket, IMessageDataWrapper, IVariableFxStatusUpdateData } from '@nitrodevco/nitro-api';

import { VariableFxStatusUpdateDataParser } from './Data/VariableFxStatusUpdateDataParser';

export type VariableFxStatusMessageType = {
    allInitialize: boolean;
    statuses: IVariableFxStatusUpdateData[];
};

export class VariableFxStatusMessage implements IIncomingPacket<VariableFxStatusMessageType> {
    public parse(wrapper: IMessageDataWrapper): VariableFxStatusMessageType {
        const allInitialize = wrapper.readBoolean();
        const statuses: IVariableFxStatusUpdateData[] = [];

        let count = wrapper.readInt();

        while (count > 0) {
            statuses.push(VariableFxStatusUpdateDataParser(wrapper, allInitialize));

            count--;
        }

        const packet: VariableFxStatusMessageType = {
            allInitialize,
            statuses,
        };

        return packet;
    }
}
