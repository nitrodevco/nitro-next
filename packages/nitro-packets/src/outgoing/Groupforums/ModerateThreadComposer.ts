// Body filled by hand from the AS3 composer.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type ModerateThreadComposerType = {
    groupId: number;
    threadId: number;
    state: number;
};

/** `ModerateThreadMessageComposer`: state 1 shows it again, 10 hides it for the group, 20 for staff. */
export class ModerateThreadComposer implements IOutgoingPacket<ModerateThreadComposerType> {
    public constructor(private params: ModerateThreadComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.groupId,
            this.params.threadId,
            this.params.state,
        ];
    }
}
