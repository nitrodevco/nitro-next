import { IOutgoingPacket } from '@nitrodevco/nitro-api';

// `GetRoomVisitsMessageComposer(userId)`.
export type GetRoomVisitsComposerType = {
    userId: number;
};

export class GetRoomVisitsComposer implements IOutgoingPacket<GetRoomVisitsComposerType> {
    public constructor(private params: GetRoomVisitsComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [ this.params.userId ];
    }
}
