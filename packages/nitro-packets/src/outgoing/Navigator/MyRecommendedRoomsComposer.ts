import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type MyRecommendedRoomsComposerType = object;

export class MyRecommendedRoomsComposer implements IOutgoingPacket<MyRecommendedRoomsComposerType> {
    public constructor(private params: MyRecommendedRoomsComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
