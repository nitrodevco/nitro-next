import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type ResetUnseenItemIdsComposerType = object;

export class ResetUnseenItemIdsComposer implements IOutgoingPacket<ResetUnseenItemIdsComposerType> {
    public constructor(private params: ResetUnseenItemIdsComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
