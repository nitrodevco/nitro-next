import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type CallForHelpFromForumThreadComposerType = object;

export class CallForHelpFromForumThreadComposer implements IOutgoingPacket<CallForHelpFromForumThreadComposerType> {
    public constructor(private params: CallForHelpFromForumThreadComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
