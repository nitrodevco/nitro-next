import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type CallForHelpResultMessageType = {
    resultType: number;
    /** The text the alert shows; empty, the client's own `help.cfh.sent.text`. */
    messageText: string;
};

/** `CallForHelpResultMessageParser`: the answer to a sent report. */
export class CallForHelpResultMessage implements IIncomingPacket<CallForHelpResultMessageType> {
    public parse(wrapper: IMessageDataWrapper): CallForHelpResultMessageType {
        return {
            resultType: wrapper.readInt(),
            messageText: wrapper.readString(),
        };
    }
}
