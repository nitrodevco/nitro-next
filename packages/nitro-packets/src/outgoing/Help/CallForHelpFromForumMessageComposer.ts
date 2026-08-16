import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type CallForHelpFromForumMessageComposerType = object;

export class CallForHelpFromForumMessageComposer implements IOutgoingPacket<CallForHelpFromForumMessageComposerType> {
    public constructor(private params: CallForHelpFromForumMessageComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
