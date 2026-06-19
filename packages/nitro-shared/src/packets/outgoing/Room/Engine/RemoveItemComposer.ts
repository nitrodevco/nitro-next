import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type RemoveItemComposerType = object;

export class RemoveItemComposer implements IOutgoingPacket<RemoveItemComposerType> {
    public constructor(private params: RemoveItemComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
