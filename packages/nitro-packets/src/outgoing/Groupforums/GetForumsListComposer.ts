// Body filled by hand from the AS3 composer.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetForumsListComposerType = {
    listCode: number;
    startIndex: number;
    amount: number;
};

/** `GetForumsListMessageComposer`: the list (0 active, 1 popular, 2 my groups), where it starts and how many. */
export class GetForumsListComposer implements IOutgoingPacket<GetForumsListComposerType> {
    public constructor(private params: GetForumsListComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.listCode,
            this.params.startIndex,
            this.params.amount,
        ];
    }
}
