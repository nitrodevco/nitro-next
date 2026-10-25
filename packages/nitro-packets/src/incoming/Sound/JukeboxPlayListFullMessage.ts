import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type JukeboxPlayListFullMessageType = object;

export class JukeboxPlayListFullMessage implements IIncomingPacket<JukeboxPlayListFullMessageType> {
    public parse(wrapper: IMessageDataWrapper): JukeboxPlayListFullMessageType {
        const packet: JukeboxPlayListFullMessageType = {
        };

        return packet;
    }
}
