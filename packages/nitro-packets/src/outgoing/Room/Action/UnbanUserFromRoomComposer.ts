// Body filled by hand from the 2026 client's own composer - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type UnbanUserFromRoomComposerType = {
    userId: number;
    roomId: number;
};

export class UnbanUserFromRoomComposer implements IOutgoingPacket<UnbanUserFromRoomComposerType> {
    public constructor(private params: UnbanUserFromRoomComposerType) { }

    public compose(): (number | string | boolean)[] {
        // `UnbanUserFromRoomMessageComposer(userId, roomId)` - the user comes first, not the room.
        return [
            this.params.userId,
            this.params.roomId,
        ];
    }
}
