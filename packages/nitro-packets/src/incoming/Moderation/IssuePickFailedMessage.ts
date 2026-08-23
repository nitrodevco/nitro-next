import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type IssuePickFailedMessageType = object;

export class IssuePickFailedMessage implements IIncomingPacket<IssuePickFailedMessageType> {
    public parse(wrapper: IMessageDataWrapper): IssuePickFailedMessageType {
        const packet: IssuePickFailedMessageType = {
        };

        return packet;
    }
}
