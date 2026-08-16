import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type MuteAllInRoomComposerType = object;

export class MuteAllInRoomComposer implements IOutgoingPacket<MuteAllInRoomComposerType> {
    public constructor(private params: MuteAllInRoomComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
