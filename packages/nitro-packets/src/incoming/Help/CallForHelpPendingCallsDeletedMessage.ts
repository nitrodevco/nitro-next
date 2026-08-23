import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type CallForHelpPendingCallsDeletedMessageType = object;

export class CallForHelpPendingCallsDeletedMessage implements IIncomingPacket<CallForHelpPendingCallsDeletedMessageType> {
    public parse(wrapper: IMessageDataWrapper): CallForHelpPendingCallsDeletedMessageType {
        const packet: CallForHelpPendingCallsDeletedMessageType = {
        };

        return packet;
    }
}
