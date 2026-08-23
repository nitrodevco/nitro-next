import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type WiredAllVariablesDiffsEventMessageType = object;

export class WiredAllVariablesDiffsEventMessage implements IIncomingPacket<WiredAllVariablesDiffsEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): WiredAllVariablesDiffsEventMessageType {
        const packet: WiredAllVariablesDiffsEventMessageType = {
        };

        return packet;
    }
}
