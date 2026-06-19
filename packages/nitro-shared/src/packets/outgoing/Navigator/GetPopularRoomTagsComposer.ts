import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetPopularRoomTagsComposerType = object;

export class GetPopularRoomTagsComposer implements IOutgoingPacket<GetPopularRoomTagsComposerType> {
    public constructor(private params: GetPopularRoomTagsComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
