import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type DeclineFriendComposerType = {
    declineAll: boolean;
    playerIds: number[];
};

export class DeclineFriendComposer implements IOutgoingPacket<DeclineFriendComposerType> {
    public constructor(private params: DeclineFriendComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.declineAll,
            this.params.playerIds.length,
            ...this.params.playerIds
        ];
    }
}
