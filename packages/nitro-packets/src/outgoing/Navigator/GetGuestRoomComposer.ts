import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetGuestRoomComposerType = {
    roomId: RoomId;
    enterRoom: boolean;
    roomForward: boolean;
};

export class GetGuestRoomComposer implements IOutgoingPacket<GetGuestRoomComposerType> {
    public constructor(private params: GetGuestRoomComposerType) { }

    public compose(): (number | string | boolean)[] {
        // the SWF pushes these booleans as `? 1 : 0`, so they go on the wire as
        // 4-byte ints, not as single-byte booleans
        return [
            this.params.roomId,
            this.params.enterRoom ? 1 : 0,
            this.params.roomForward ? 1 : 0,
        ];
    }
}
