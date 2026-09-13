import { IIncomingPacket, IMessageDataWrapper, IVariableFxConfigUpdateData, ParseArray } from '@nitrodevco/nitro-api';

import { VariableFxConfigUpdateDataParser } from './Data/VariableFxConfigUpdateDataParser';

export type VariableFxConfigsMessageType = {
    configs: IVariableFxConfigUpdateData[];
};

export class VariableFxConfigsMessage implements IIncomingPacket<VariableFxConfigsMessageType> {
    public parse(wrapper: IMessageDataWrapper): VariableFxConfigsMessageType {
        const packet: VariableFxConfigsMessageType = {
            configs: ParseArray(wrapper, VariableFxConfigUpdateDataParser),
        };

        return packet;
    }
}
