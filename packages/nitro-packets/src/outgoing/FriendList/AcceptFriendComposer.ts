import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type AcceptFriendComposerType = {
    playerIds: number[];
};

export class AcceptFriendComposer implements IOutgoingPacket<AcceptFriendComposerType> {
    public constructor(private params: AcceptFriendComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.playerIds.length,
            ...this.params.playerIds
        ];
    }
}
