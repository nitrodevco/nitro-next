import { IOutgoingPacket } from '@nitrodevco/nitro-api';

// `GetModeratorRoomInfoMessageComposer(flatId)`.
export type GetModeratorRoomInfoComposerType = {
    roomId: number;
};

export class GetModeratorRoomInfoComposer implements IOutgoingPacket<GetModeratorRoomInfoComposerType> {
    public constructor(private params: GetModeratorRoomInfoComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [ this.params.roomId ];
    }
}
