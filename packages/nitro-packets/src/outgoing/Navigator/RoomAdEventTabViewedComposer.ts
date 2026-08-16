import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type RoomAdEventTabViewedComposerType = object;

export class RoomAdEventTabViewedComposer implements IOutgoingPacket<RoomAdEventTabViewedComposerType> {
    public constructor(private params: RoomAdEventTabViewedComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
