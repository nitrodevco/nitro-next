import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type YouArePlayingGameMessageType = {
    isPlaying: boolean;
};

export class YouArePlayingGameMessage implements IIncomingPacket<YouArePlayingGameMessageType> {
    public parse(wrapper: IMessageDataWrapper): YouArePlayingGameMessageType {
        const packet: YouArePlayingGameMessageType = {
            isPlaying: wrapper.readBoolean(),
        };

        return packet;
    }
}
