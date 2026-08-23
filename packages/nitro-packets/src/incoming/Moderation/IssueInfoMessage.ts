import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type IssueInfoMessageType = object;

export class IssueInfoMessage implements IIncomingPacket<IssueInfoMessageType> {
    public parse(wrapper: IMessageDataWrapper): IssueInfoMessageType {
        const packet: IssueInfoMessageType = {
        };

        return packet;
    }
}
