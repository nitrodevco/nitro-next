import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

/** `IssueCloseNotificationMessageParser`: the close reason (1 useless, 2 abusive, else resolved) and a text, empty for the client's own. */
export type IssueCloseNotificationMessageType = {
    closeReason: number;
    messageText: string;
};

export class IssueCloseNotificationMessage implements IIncomingPacket<IssueCloseNotificationMessageType> {
    public parse(wrapper: IMessageDataWrapper): IssueCloseNotificationMessageType {
        return { closeReason: wrapper.readInt(), messageText: wrapper.readString() };
    }
}
