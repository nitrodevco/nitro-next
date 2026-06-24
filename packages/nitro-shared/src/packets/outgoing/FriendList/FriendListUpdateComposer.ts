import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type FriendListUpdateComposerType = object;

export class FriendListUpdateComposer implements IOutgoingPacket<FriendListUpdateComposerType> {
    public constructor(private params: FriendListUpdateComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
