// Body filled by hand from the packet generator output - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

/**
 * `RoomNetworkOpenConnectionMessageComposer` (2279): the connection a room network session opens with
 * (`RoomSessionManager.gotoRoomNetwork`) - the network, and the home room to go to there (0 for none).
 */
export type RoomNetworkOpenConnectionComposerType = {
    networkId: number;
    homeRoomId: number;
};

export class RoomNetworkOpenConnectionComposer implements IOutgoingPacket<RoomNetworkOpenConnectionComposerType> {
    public constructor(private params: RoomNetworkOpenConnectionComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.networkId,
            this.params.homeRoomId,
        ];
    }
}
