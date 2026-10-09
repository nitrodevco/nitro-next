// Body filled by hand from the AS3 composer.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetMessagesComposerType = {
    groupId: number;
    threadId: number;
    startIndex: number;
    amount: number;
};

/** `GetMessagesMessageComposer`. */
export class GetMessagesComposer implements IOutgoingPacket<GetMessagesComposerType> {
    public constructor(private params: GetMessagesComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.groupId,
            this.params.threadId,
            this.params.startIndex,
            this.params.amount,
        ];
    }
}
