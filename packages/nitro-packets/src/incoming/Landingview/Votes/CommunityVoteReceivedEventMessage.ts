import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type CommunityVoteReceivedEventMessageType = object;

export class CommunityVoteReceivedEventMessage implements IIncomingPacket<CommunityVoteReceivedEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): CommunityVoteReceivedEventMessageType {
        const packet: CommunityVoteReceivedEventMessageType = {
        };

        return packet;
    }
}
