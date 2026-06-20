import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetGuestRoomComposerType = {
    roomId: RoomId;
    enterRoom: boolean;
    roomForward: boolean;
};

export class GetGuestRoomComposer implements IOutgoingPacket<GetGuestRoomComposerType> {
    public constructor(private params: GetGuestRoomComposerType) { }

    public compose(): (number | string)[] {
        return [
            this.params.roomId,
            this.params.enterRoom,
            this.params.roomForward,
        ];
    }
}
