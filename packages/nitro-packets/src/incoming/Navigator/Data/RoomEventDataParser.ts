// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IRoomEventData } from './IRoomEventData';

const MINUTE_MS = 60 * 1000;

/**
 * Flash `RoomEventData`: a room ad. The server sends how many minutes ago it was created and how
 * many remain; the client turns both into moments relative to when the packet is parsed, and the
 * creation time into the `d-m-yyyy h:m` text the navigator shows (month as Flash counts it, from 0).
 */
export const RoomEventDataParser = (wrapper: IMessageDataWrapper): IRoomEventData => {
    const adId = wrapper.readInt();
    const ownerAvatarId = wrapper.readInt();
    const ownerAvatarName = wrapper.readString();
    const flatId = wrapper.readInt();
    const eventType = wrapper.readInt();
    const eventName = wrapper.readString();
    const eventDescription = wrapper.readString();
    const minutesSinceCreation = wrapper.readInt();
    const minutesUntilExpiration = wrapper.readInt();
    const categoryId = wrapper.readInt();

    const now = Date.now();
    const created = new Date(now - (minutesSinceCreation * MINUTE_MS));
    const creationTime = `${created.getDate()}-${created.getMonth()}-${created.getFullYear()} ${created.getHours()}:${created.getMinutes()}`;
    const expirationDate = new Date(now + (minutesUntilExpiration * MINUTE_MS));

    return { adId, ownerAvatarId, ownerAvatarName, flatId, categoryId, eventType, eventName, eventDescription, creationTime, expirationDate };
};
