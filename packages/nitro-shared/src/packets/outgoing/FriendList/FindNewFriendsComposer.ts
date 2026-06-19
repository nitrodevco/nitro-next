import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type FindNewFriendsComposerType = object;

export class FindNewFriendsComposer implements IOutgoingPacket<FindNewFriendsComposerType> {
    public constructor(private params: FindNewFriendsComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
