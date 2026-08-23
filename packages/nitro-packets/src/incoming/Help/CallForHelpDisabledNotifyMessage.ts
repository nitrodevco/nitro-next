import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type CallForHelpDisabledNotifyMessageType = object;

export class CallForHelpDisabledNotifyMessage implements IIncomingPacket<CallForHelpDisabledNotifyMessageType> {
    public parse(wrapper: IMessageDataWrapper): CallForHelpDisabledNotifyMessageType {
        const packet: CallForHelpDisabledNotifyMessageType = {
        };

        return packet;
    }
}
