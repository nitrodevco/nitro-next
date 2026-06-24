import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetRoomEntryTileComposerType = object;

export class GetRoomEntryTileComposer implements IOutgoingPacket<GetRoomEntryTileComposerType> {
    public constructor(private params: GetRoomEntryTileComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
