import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

/*
 * RoomEventMessageParser -> RoomEventData — an ownerAvatarId of -1 means no event
 * is running (the composer answers every room entry). The wire carries minutes
 * since start / until expiry; the SWF converts those to dates on arrival.
 */
export type IRoomEventData = {
    adId: number;
    ownerAvatarId: number;
    ownerName: string;
    flatId: number;
    type: number;
    eventName: string;
    eventDescription: string;
    minutesSinceStart: number;
    minutesUntilEnd: number;
    categoryId: number;
};

export type RoomEventMessageType = {
    data: IRoomEventData;
};

export class RoomEventMessage implements IIncomingPacket<RoomEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): RoomEventMessageType {
        return {
            data: {
                adId: wrapper.readInt(),
                ownerAvatarId: wrapper.readInt(),
                ownerName: wrapper.readString(),
                flatId: wrapper.readInt(),
                type: wrapper.readInt(),
                eventName: wrapper.readString(),
                eventDescription: wrapper.readString(),
                minutesSinceStart: wrapper.readInt(),
                minutesUntilEnd: wrapper.readInt(),
                categoryId: wrapper.readInt(),
            },
        };
    }
}
