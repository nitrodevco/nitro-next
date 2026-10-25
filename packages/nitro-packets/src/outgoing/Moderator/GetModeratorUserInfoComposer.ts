import { IOutgoingPacket } from '@nitrodevco/nitro-api';

// `GetModeratorUserInfoMessageComposer(userId)`.
export type GetModeratorUserInfoComposerType = {
    userId: number;
};

export class GetModeratorUserInfoComposer implements IOutgoingPacket<GetModeratorUserInfoComposerType> {
    public constructor(private params: GetModeratorUserInfoComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [ this.params.userId ];
    }
}
