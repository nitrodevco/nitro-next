import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetCustomRoomFilterComposerType = {
    roomId: number;
};

export class GetCustomRoomFilterComposer implements IOutgoingPacket<GetCustomRoomFilterComposerType> {
    public constructor(private params: GetCustomRoomFilterComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.roomId,
        ];
    }
}
