import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetCustomRoomFilterComposerType = {
    roomId: RoomId;
};

export class GetCustomRoomFilterComposer implements IOutgoingPacket<GetCustomRoomFilterComposerType> {
    public constructor(private params: GetCustomRoomFilterComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.roomId,
        ];
    }
}
