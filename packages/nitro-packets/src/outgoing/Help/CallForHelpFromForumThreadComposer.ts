// Body filled by hand from the AS3 composer.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

/** `CallForHelpFromForumThreadMessageComposer(groupId, threadId, topicId, message, name, email)`. */
export type CallForHelpFromForumThreadComposerType = {
    groupId: number;
    threadId: number;
    topicId: number;
    message: string;
    name: string;
    email: string;
};

export class CallForHelpFromForumThreadComposer implements IOutgoingPacket<CallForHelpFromForumThreadComposerType> {
    public constructor(private params: CallForHelpFromForumThreadComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.groupId,
            this.params.threadId,
            this.params.topicId,
            this.params.message,
            this.params.name,
            this.params.email,
        ];
    }
}
