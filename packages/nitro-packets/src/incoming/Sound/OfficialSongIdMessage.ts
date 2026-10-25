// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

/**
 * The song id an official song's code stands for - Flash's `OfficialSongIdMessageParser`
 * (`§_-fz§.§_-CP§`), which reads the code first and the id after it. The catalogue's song disk
 * widget asks for it (`GetOfficialSongIdMessageComposer`) when a disk's extra parameter is not a
 * number.
 */
export type OfficialSongIdMessageType = {
    officialSongId: string;
    songId: number;
};

export class OfficialSongIdMessage implements IIncomingPacket<OfficialSongIdMessageType> {
    public parse(wrapper: IMessageDataWrapper): OfficialSongIdMessageType {
        const officialSongId = wrapper.readString();
        const songId = wrapper.readInt();

        return { officialSongId, songId };
    }
}
