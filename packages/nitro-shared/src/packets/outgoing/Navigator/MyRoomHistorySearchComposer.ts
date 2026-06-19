import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type MyRoomHistorySearchComposerType = object;

export class MyRoomHistorySearchComposer implements IOutgoingPacket<MyRoomHistorySearchComposerType> {
    public constructor(private params: MyRoomHistorySearchComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
