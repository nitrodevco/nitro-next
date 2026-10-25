import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type CallForHelpReplyMessageType = {
    /** A moderator's reply to the user's report. */
    message: string;
};

/** `CallForHelpReplyMessageParser`. */
export class CallForHelpReplyMessage implements IIncomingPacket<CallForHelpReplyMessageType> {
    public parse(wrapper: IMessageDataWrapper): CallForHelpReplyMessageType {
        return {
            message: wrapper.readString(),
        };
    }
}
