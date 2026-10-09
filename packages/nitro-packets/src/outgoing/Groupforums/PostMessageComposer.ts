// Body filled by hand from the AS3 composer.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type PostMessageComposerType = {
    groupId: number;
    threadId: number;
    subject: string;
    message: string;
};

/** `PostMessageMessageComposer`: thread 0 starts a thread with `subject`. */
export class PostMessageComposer implements IOutgoingPacket<PostMessageComposerType> {
    public constructor(private params: PostMessageComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.groupId,
            this.params.threadId,
            this.params.subject,
            this.params.message,
        ];
    }
}
