import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type RestoreClientMessageType = object;

export class RestoreClientMessage implements IIncomingPacket<RestoreClientMessageType> {
    public parse(wrapper: IMessageDataWrapper): RestoreClientMessageType {
        const packet: RestoreClientMessageType = {
        };

        return packet;
    }
}
