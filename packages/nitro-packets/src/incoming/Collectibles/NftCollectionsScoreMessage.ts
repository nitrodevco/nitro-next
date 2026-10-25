import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type NftCollectionsScoreMessageType = {
    score: number;
    highestScore: number;
    level: number;
};

export class NftCollectionsScoreMessage implements IIncomingPacket<NftCollectionsScoreMessageType> {
    public parse(wrapper: IMessageDataWrapper): NftCollectionsScoreMessageType {
        const packet: NftCollectionsScoreMessageType = {
            score: wrapper.readInt(),
            highestScore: wrapper.readInt(),
            level: wrapper.readInt(),
        };

        return packet;
    }
}
