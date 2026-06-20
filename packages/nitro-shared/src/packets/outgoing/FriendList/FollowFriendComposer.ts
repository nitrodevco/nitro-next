import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type FollowFriendComposerType = {
    playerId: PlayerId;
};

export class FollowFriendComposer implements IOutgoingPacket<FollowFriendComposerType> {
    public constructor(private params: FollowFriendComposerType) { }

    public compose(): (number | string)[] {
        return [
            this.params.playerId,
        ];
    }
}
