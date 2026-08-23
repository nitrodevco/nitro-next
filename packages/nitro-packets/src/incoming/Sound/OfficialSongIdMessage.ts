import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type OfficialSongIdMessageType = object;

export class OfficialSongIdMessage implements IIncomingPacket<OfficialSongIdMessageType> {
    public parse(wrapper: IMessageDataWrapper): OfficialSongIdMessageType {
        const packet: OfficialSongIdMessageType = {
        };

        return packet;
    }
}
