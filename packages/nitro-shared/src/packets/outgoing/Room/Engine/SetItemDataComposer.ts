import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type SetItemDataComposerType = object;

export class SetItemDataComposer implements IOutgoingPacket<SetItemDataComposerType> {
    public constructor(private params: SetItemDataComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
