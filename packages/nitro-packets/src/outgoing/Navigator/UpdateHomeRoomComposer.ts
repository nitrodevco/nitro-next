import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type UpdateHomeRoomComposerType = {
    roomId: number;
};

export class UpdateHomeRoomComposer implements IOutgoingPacket<UpdateHomeRoomComposerType> {
    public constructor(private params: UpdateHomeRoomComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.roomId,
        ];
    }
}
