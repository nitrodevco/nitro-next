import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type MyRoomRightsSearchComposerType = object;

export class MyRoomRightsSearchComposer implements IOutgoingPacket<MyRoomRightsSearchComposerType> {
    public constructor(private params: MyRoomRightsSearchComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
