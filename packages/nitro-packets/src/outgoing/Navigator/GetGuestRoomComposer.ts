// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetGuestRoomComposerType = {
    roomId: number;
    enterRoom: boolean;
    roomForward: boolean;
};

export class GetGuestRoomComposer implements IOutgoingPacket<GetGuestRoomComposerType> {
    public constructor(private params: GetGuestRoomComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.roomId,
            this.params.enterRoom ? 1 : 0,
            this.params.roomForward ? 1 : 0,
        ];
    }
}
