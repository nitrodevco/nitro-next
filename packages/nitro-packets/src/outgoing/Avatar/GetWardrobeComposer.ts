import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetWardrobeComposerType = object;

export class GetWardrobeComposer implements IOutgoingPacket<GetWardrobeComposerType> {
    public constructor(private params: GetWardrobeComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
