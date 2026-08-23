import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type PlayListMessageType = object;

export class PlayListMessage implements IIncomingPacket<PlayListMessageType> {
    public parse(wrapper: IMessageDataWrapper): PlayListMessageType {
        const packet: PlayListMessageType = {
        };

        return packet;
    }
}
