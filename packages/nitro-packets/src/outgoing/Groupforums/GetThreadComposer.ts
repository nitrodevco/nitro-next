// Body filled by hand from the AS3 composer.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetThreadComposerType = {
    groupId: number;
    threadId: number;
};

/** `GetThreadMessageComposer`. */
export class GetThreadComposer implements IOutgoingPacket<GetThreadComposerType> {
    public constructor(private params: GetThreadComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.groupId,
            this.params.threadId,
        ];
    }
}
