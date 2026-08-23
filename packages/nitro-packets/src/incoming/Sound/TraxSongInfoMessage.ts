import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type TraxSongInfoMessageType = object;

export class TraxSongInfoMessage implements IIncomingPacket<TraxSongInfoMessageType> {
    public parse(wrapper: IMessageDataWrapper): TraxSongInfoMessageType {
        const packet: TraxSongInfoMessageType = {
        };

        return packet;
    }
}
