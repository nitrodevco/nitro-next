import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type MyFriendsRoomsSearchComposerType = object;

export class MyFriendsRoomsSearchComposer implements IOutgoingPacket<MyFriendsRoomsSearchComposerType> {
    public constructor(private params: MyFriendsRoomsSearchComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
