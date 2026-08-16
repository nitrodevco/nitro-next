import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type WiredGetRoomStatsComposerType = object;

export class WiredGetRoomStatsComposer implements IOutgoingPacket<WiredGetRoomStatsComposerType> {
    public constructor(private params: WiredGetRoomStatsComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
