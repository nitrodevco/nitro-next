import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type ChangeQueueComposerType = object;

export class ChangeQueueComposer implements IOutgoingPacket<ChangeQueueComposerType> {
    public constructor(private params: ChangeQueueComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
