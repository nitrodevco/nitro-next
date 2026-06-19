import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type MyFrequentRoomHistorySearchComposerType = object;

export class MyFrequentRoomHistorySearchComposer implements IOutgoingPacket<MyFrequentRoomHistorySearchComposerType> {
    public constructor(private params: MyFrequentRoomHistorySearchComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
