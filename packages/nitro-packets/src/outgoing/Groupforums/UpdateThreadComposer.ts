// Body filled by hand from the AS3 composer.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type UpdateThreadComposerType = {
    groupId: number;
    threadId: number;
    isLocked: boolean;
    isSticky: boolean;
};

/** `UpdateThreadMessageComposer(groupId, threadId, isLocked, isSticky)`, which sends the sticky flag before the lock. */
export class UpdateThreadComposer implements IOutgoingPacket<UpdateThreadComposerType> {
    public constructor(private params: UpdateThreadComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.groupId,
            this.params.threadId,
            this.params.isSticky,
            this.params.isLocked,
        ];
    }
}
