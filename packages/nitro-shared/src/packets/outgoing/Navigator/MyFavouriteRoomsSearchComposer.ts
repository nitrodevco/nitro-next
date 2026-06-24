import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type MyFavouriteRoomsSearchComposerType = object;

export class MyFavouriteRoomsSearchComposer implements IOutgoingPacket<MyFavouriteRoomsSearchComposerType> {
    public constructor(private params: MyFavouriteRoomsSearchComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
