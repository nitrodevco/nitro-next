import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type UpdateHomeRoomComposerType = {
    roomId: RoomId;
};

export class UpdateHomeRoomComposer implements IOutgoingPacket<UpdateHomeRoomComposerType> {
    public constructor(private params: UpdateHomeRoomComposerType) { }

    public compose(): (number | string)[] {
        return [
            this.params.roomId,
        ];
    }
}
