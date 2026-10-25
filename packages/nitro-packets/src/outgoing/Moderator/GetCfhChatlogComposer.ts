import { IOutgoingPacket } from '@nitrodevco/nitro-api';

// `GetCfhChatlogMessageComposer(issueId)`.
export type GetCfhChatlogComposerType = {
    issueId: number;
};

export class GetCfhChatlogComposer implements IOutgoingPacket<GetCfhChatlogComposerType> {
    public constructor(private params: GetCfhChatlogComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [ this.params.issueId ];
    }
}
