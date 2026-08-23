import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type WiredRewardResultMessageType = {
    reason: number;
};

export class WiredRewardResultMessage implements IIncomingPacket<WiredRewardResultMessageType> {
    public parse(wrapper: IMessageDataWrapper): WiredRewardResultMessageType {
        const packet: WiredRewardResultMessageType = {
            reason: wrapper.readInt(),
        };

        return packet;
    }
}
