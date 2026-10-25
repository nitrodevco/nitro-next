/**
 * Whether a running room event may be extended by one more ad - `RoomEventInfoCtrl.canExtend` -
 * with the defaults of the config values it reads.
 */
import { IRoomEventData } from '@nitrodevco/nitro-packets';

const MINUTE_MS = 60 * 1000;

/** `getInteger("room_ad.duration.minutes", 120)` and `getInteger("room_ad.maximum_total_time.minutes", 10080)`'s defaults. */
export const ROOM_AD_DURATION_MINUTES_DEFAULT = 120;
export const ROOM_AD_MAXIMUM_TOTAL_MINUTES_DEFAULT = 10080;

/**
 * `RoomEventInfoCtrl.canExtend`: without `roomad.limit_total_time` an event can always be extended;
 * with it, only while one more ad's duration added to its expiry stays inside the maximum total time
 * from now.
 */
export const isRoomEventExtendable = (event: IRoomEventData, now: number, limitTotalTime: boolean, durationMinutes: number, maximumTotalMinutes: number): boolean => {
    if (!limitTotalTime) return true;

    return (event.expirationDate.getTime() + (durationMinutes * MINUTE_MS)) < (now + (maximumTotalMinutes * MINUTE_MS));
};
