import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

/** `IssueDeletedMessageParser`: the issue id, as a string. */
export type IssueDeletedMessageType = {
    issueId: number;
};

export class IssueDeletedMessage implements IIncomingPacket<IssueDeletedMessageType> {
    public parse(wrapper: IMessageDataWrapper): IssueDeletedMessageType {
        return { issueId: parseInt(wrapper.readString()) };
    }
}
