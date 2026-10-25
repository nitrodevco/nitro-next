import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IIssueMessageData, IssueMessageDataParser } from './Data/IssueMessageDataParser';

/** `IssueInfoMessageParser`: one issue, new or changed. */
export type IssueInfoMessageType = {
    issueData: IIssueMessageData;
};

export class IssueInfoMessage implements IIncomingPacket<IssueInfoMessageType> {
    public parse(wrapper: IMessageDataWrapper): IssueInfoMessageType {
        return { issueData: IssueMessageDataParser(wrapper) };
    }
}
