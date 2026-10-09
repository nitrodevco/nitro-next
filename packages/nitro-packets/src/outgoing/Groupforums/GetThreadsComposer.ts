// Body filled by hand from the AS3 composer.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetThreadsComposerType = {
    groupId: number;
    startIndex: number;
    amount: number;
};

/** `GetThreadsMessageComposer`. */
export class GetThreadsComposer implements IOutgoingPacket<GetThreadsComposerType> {
    public constructor(private params: GetThreadsComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.groupId,
            this.params.startIndex,
            this.params.amount,
        ];
    }
}
