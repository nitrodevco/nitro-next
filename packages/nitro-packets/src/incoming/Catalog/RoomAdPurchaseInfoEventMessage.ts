// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

/** Flash `RoomEntryData`: a room the user may advertise. */
export interface IRoomEntryData {
    roomId: number;
    roomName: string;
    hasControllers: boolean;
}

export type RoomAdPurchaseInfoEventMessageType = {
    /** Whether the user is VIP - `RoomAdsCatalogWidget.selectedOffer` picks the VIP offer then. */
    isVip: boolean;
    rooms: IRoomEntryData[];
};

/** Flash `RoomAdPurchaseInfoEventParser`: the VIP flag, then a count and each room's id, name and controllers flag. */
export class RoomAdPurchaseInfoEventMessage implements IIncomingPacket<RoomAdPurchaseInfoEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): RoomAdPurchaseInfoEventMessageType {
        const isVip = wrapper.readBoolean();
        const rooms: IRoomEntryData[] = [];

        let count = wrapper.readInt();

        while (count > 0) {
            rooms.push({
                roomId: wrapper.readInt(),
                roomName: wrapper.readString(),
                hasControllers: wrapper.readBoolean(),
            });

            count--;
        }

        return { isVip, rooms };
    }
}
