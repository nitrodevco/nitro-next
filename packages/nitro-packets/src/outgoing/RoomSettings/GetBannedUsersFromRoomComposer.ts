import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetBannedUsersFromRoomComposerType = {
    roomId: number;
};

export class GetBannedUsersFromRoomComposer implements IOutgoingPacket<GetBannedUsersFromRoomComposerType> {
    public constructor(private params: GetBannedUsersFromRoomComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.roomId,
        ];
    }
}
