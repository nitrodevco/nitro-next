import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type RoomDimmerSavePresetComposerType = object;

export class RoomDimmerSavePresetComposer implements IOutgoingPacket<RoomDimmerSavePresetComposerType> {
    public constructor(private params: RoomDimmerSavePresetComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
