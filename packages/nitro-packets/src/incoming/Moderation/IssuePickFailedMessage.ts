import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

/** `IssuePickFailedMessageParser` (1318 AS3 :34-50): the issues not got with who holds each, then whether and how often to retry. */
export type IssuePickFailedMessageType = {
    issues: { issueId: number; pickerUserId: number; pickerUserName: string }[];
    retryEnabled: boolean;
    retryCount: number;
};

export class IssuePickFailedMessage implements IIncomingPacket<IssuePickFailedMessageType> {
    public parse(wrapper: IMessageDataWrapper): IssuePickFailedMessageType {
        const issues: IssuePickFailedMessageType['issues'] = [];

        for (let count = wrapper.readInt(); count > 0; count--) issues.push({ issueId: wrapper.readInt(), pickerUserId: wrapper.readInt(), pickerUserName: wrapper.readString() });

        return { issues, retryEnabled: wrapper.readBoolean(), retryCount: wrapper.readInt() };
    }
}
