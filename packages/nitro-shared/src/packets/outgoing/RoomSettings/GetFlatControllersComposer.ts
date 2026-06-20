import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetFlatControllersComposerType = {
    roomId: RoomId;
};

export class GetFlatControllersComposer implements IOutgoingPacket<GetFlatControllersComposerType> {
    public constructor(private params: GetFlatControllersComposerType) { }

    public compose(): (number | string)[] {
        return [
            this.params.roomId,
        ];
    }
}
