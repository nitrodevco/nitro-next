import { IOutgoingPacket } from '@nitrodevco/nitro-api';

// `GetUserChatlogMessageComposer(userId)`.
export type GetUserChatlogComposerType = {
    userId: number;
};

export class GetUserChatlogComposer implements IOutgoingPacket<GetUserChatlogComposerType> {
    public constructor(private params: GetUserChatlogComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [ this.params.userId ];
    }
}
