import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type SanctionStatusEventMessageType = object;

export class SanctionStatusEventMessage implements IIncomingPacket<SanctionStatusEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): SanctionStatusEventMessageType {
        const packet: SanctionStatusEventMessageType = {
        };

        return packet;
    }
}
