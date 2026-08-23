import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type NowPlayingMessageType = object;

export class NowPlayingMessage implements IIncomingPacket<NowPlayingMessageType> {
    public parse(wrapper: IMessageDataWrapper): NowPlayingMessageType {
        const packet: NowPlayingMessageType = {
        };

        return packet;
    }
}
