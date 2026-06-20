import type { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type RemoveOwnRoomRightsRoomComposerType = {
    roomId: number;
};

export class RemoveOwnRoomRightsRoomComposer implements IOutgoingPacket<RemoveOwnRoomRightsRoomComposerType> {
    public constructor(private params: RemoveOwnRoomRightsRoomComposerType) { }

    public compose(): (number | string)[] {
        return [
            this.params.roomId,
        ];
    }
}
