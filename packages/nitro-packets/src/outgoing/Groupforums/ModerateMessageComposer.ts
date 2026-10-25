// Body filled by hand from the AS3 composer.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type ModerateMessageComposerType = {
    groupId: number;
    threadId: number;
    messageId: number;
    state: number;
};

/** `ModerateMessageMessageComposer`: state 1 shows it again, 10 hides it for the group, 20 for staff. */
export class ModerateMessageComposer implements IOutgoingPacket<ModerateMessageComposerType> {
    public constructor(private params: ModerateMessageComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.groupId,
            this.params.threadId,
            this.params.messageId,
            this.params.state,
        ];
    }
}
