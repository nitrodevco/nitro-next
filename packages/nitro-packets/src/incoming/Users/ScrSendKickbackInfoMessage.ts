import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type ScrSendKickbackInfoMessageType = object;

export class ScrSendKickbackInfoMessage implements IIncomingPacket<ScrSendKickbackInfoMessageType> {
    public parse(wrapper: IMessageDataWrapper): ScrSendKickbackInfoMessageType {
        const packet: ScrSendKickbackInfoMessageType = {
        };

        return packet;
    }
}
