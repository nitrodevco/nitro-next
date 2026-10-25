// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type RoomUseHabbiconMessageType = {
    roomIndex: number;
    habbiconId: number;
};

/** Flash `§_-Q2t§.§_-VH§`: the user at `roomIndex` plays a habbicon in the room. */
export class RoomUseHabbiconMessage implements IIncomingPacket<RoomUseHabbiconMessageType> {
    public parse(wrapper: IMessageDataWrapper): RoomUseHabbiconMessageType {
        const roomIndex = wrapper.readInt();
        const habbiconId = wrapper.readInt();

        return { roomIndex, habbiconId };
    }
}
