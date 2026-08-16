import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type MyRoomsSearchComposerType = object;

export class MyRoomsSearchComposer implements IOutgoingPacket<MyRoomsSearchComposerType> {
    public constructor(private params: MyRoomsSearchComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
