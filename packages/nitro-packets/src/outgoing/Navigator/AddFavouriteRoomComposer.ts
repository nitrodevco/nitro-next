import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type AddFavouriteRoomComposerType = {
    roomId: RoomId;
};

export class AddFavouriteRoomComposer implements IOutgoingPacket<AddFavouriteRoomComposerType> {
    public constructor(private params: AddFavouriteRoomComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.roomId,
        ];
    }
}
