// Body filled by hand from the AS3 composer.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

/** `CallForHelpFromForumMessageMessageComposer(groupId, threadId, messageId, topicId, message, name, email)`. */
export type CallForHelpFromForumMessageComposerType = {
    groupId: number;
    threadId: number;
    messageId: number;
    topicId: number;
    message: string;
    name: string;
    email: string;
};

export class CallForHelpFromForumMessageComposer implements IOutgoingPacket<CallForHelpFromForumMessageComposerType> {
    public constructor(private params: CallForHelpFromForumMessageComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.groupId,
            this.params.threadId,
            this.params.messageId,
            this.params.topicId,
            this.params.message,
            this.params.name,
            this.params.email,
        ];
    }
}
