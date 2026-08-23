import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type CallForHelpResultMessageType = object;

export class CallForHelpResultMessage implements IIncomingPacket<CallForHelpResultMessageType> {
    public parse(wrapper: IMessageDataWrapper): CallForHelpResultMessageType {
        const packet: CallForHelpResultMessageType = {
        };

        return packet;
    }
}
