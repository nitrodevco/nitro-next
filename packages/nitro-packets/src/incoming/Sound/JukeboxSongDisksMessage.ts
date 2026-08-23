import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type JukeboxSongDisksMessageType = object;

export class JukeboxSongDisksMessage implements IIncomingPacket<JukeboxSongDisksMessageType> {
    public parse(wrapper: IMessageDataWrapper): JukeboxSongDisksMessageType {
        const packet: JukeboxSongDisksMessageType = {
        };

        return packet;
    }
}
