import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type DeleteRoomComposerType = {
    roomId: RoomId;
};

export class DeleteRoomComposer implements IOutgoingPacket<DeleteRoomComposerType> {
    public constructor(private params: DeleteRoomComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.roomId,
        ];
    }
}
