import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type RoomDimmerChangeStateComposerType = object;

export class RoomDimmerChangeStateComposer implements IOutgoingPacket<RoomDimmerChangeStateComposerType> {
    public constructor(private params: RoomDimmerChangeStateComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
