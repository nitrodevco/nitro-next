import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type DeclineFriendComposerType = {
    declineAll: boolean;
    friends: number[];
};

export class DeclineFriendComposer implements IOutgoingPacket<DeclineFriendComposerType> {
    public constructor(private params: DeclineFriendComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.declineAll,
            this.params.friends,
        ];
    }
}
