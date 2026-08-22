import { IOutgoingPacket } from '@nitrodevco/nitro-api';

/* UnbanUserFromRoomMessageComposer (2804) — userId, roomId */
export type UnbanUserFromRoomComposerType = {
    userId: number;
    roomId: number;
};

export class UnbanUserFromRoomComposer implements IOutgoingPacket<UnbanUserFromRoomComposerType> {
    public constructor(private params: UnbanUserFromRoomComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.userId,
            this.params.roomId,
        ];
    }
}
