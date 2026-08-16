import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetModeratorRoomInfoComposerType = object;

export class GetModeratorRoomInfoComposer implements IOutgoingPacket<GetModeratorRoomInfoComposerType> {
    public constructor(private params: GetModeratorRoomInfoComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
