import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type CommunityVoteReceivedMessageType = {
    acknowledged: boolean;
};

export class CommunityVoteReceivedMessage implements IIncomingPacket<CommunityVoteReceivedMessageType> {
    public parse(wrapper: IMessageDataWrapper): CommunityVoteReceivedMessageType {
        const acknowledged = wrapper.readBoolean();
        return { acknowledged };
    }
}
