import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type FollowFriendComposerType = {
    playerId: number;
};

export class FollowFriendComposer implements IOutgoingPacket<FollowFriendComposerType> {
    public constructor(private params: FollowFriendComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.playerId,
        ];
    }
}
