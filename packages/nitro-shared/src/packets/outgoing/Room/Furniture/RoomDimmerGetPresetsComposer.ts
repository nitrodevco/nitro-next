import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type RoomDimmerGetPresetsComposerType = object;

export class RoomDimmerGetPresetsComposer implements IOutgoingPacket<RoomDimmerGetPresetsComposerType> {
    public constructor(private params: RoomDimmerGetPresetsComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
