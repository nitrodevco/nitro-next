import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetUserNftWardrobeComposerType = object;

export class GetUserNftWardrobeComposer implements IOutgoingPacket<GetUserNftWardrobeComposerType> {
    public constructor(private params: GetUserNftWardrobeComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
