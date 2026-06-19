import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type ResetUnseenItemsComposerType = object;

export class ResetUnseenItemsComposer implements IOutgoingPacket<ResetUnseenItemsComposerType> {
    public constructor(private params: ResetUnseenItemsComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
