// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper, ParseInts } from '@nitrodevco/nitro-api';

export type VariableFxConfigsRemovedMessageType = {
    configIds: number[];
};

export class VariableFxConfigsRemovedMessage implements IIncomingPacket<VariableFxConfigsRemovedMessageType> {
    public parse(wrapper: IMessageDataWrapper): VariableFxConfigsRemovedMessageType {
        const packet: VariableFxConfigsRemovedMessageType = {
            configIds: ParseInts(wrapper),
        };

        return packet;
    }
}
