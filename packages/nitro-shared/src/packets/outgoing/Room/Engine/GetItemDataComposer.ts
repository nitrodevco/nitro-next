import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetItemDataComposerType = object;

export class GetItemDataComposer implements IOutgoingPacket<GetItemDataComposerType> {
    public constructor(private params: GetItemDataComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
