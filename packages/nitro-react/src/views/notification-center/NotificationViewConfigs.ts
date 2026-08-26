import { KNOWN_NOTIFICATION_STYLES, NotificationStyleEnum } from "@nitrodevco/nitro-api";

export type NotificationTimings = {
    timeFadeIn: number;
    timeDisplay: number;
    timeFadeOut: number;
}

export const NOTIFICATION_VIEW_HEIGHTS: Partial<Record<NotificationStyleEnum, number>> = {
    [NotificationStyleEnum.FriendOnline]: 60,
    [NotificationStyleEnum.NftOpening]: 110,
    [NotificationStyleEnum.TreasureHunt]: 90,
    [NotificationStyleEnum.Wired]: 60
};

export const NOTIFICATION_TIMINGS: Partial<Record<NotificationStyleEnum, NotificationTimings>> = {
    [NotificationStyleEnum.FriendOnline]: { timeFadeIn: 800, timeDisplay: 8000, timeFadeOut: 800 },
    [NotificationStyleEnum.NftOpening]: { timeFadeIn: 800, timeDisplay: 10000, timeFadeOut: 800 },
    [NotificationStyleEnum.TreasureHunt]: { timeFadeIn: 800, timeDisplay: 15000, timeFadeOut: 800 },
    [NotificationStyleEnum.Wired]: { timeFadeIn: 800, timeDisplay: 10000, timeFadeOut: 800 }
};

export const getNotificationHeight = (styleName: NotificationStyleEnum) => NOTIFICATION_VIEW_HEIGHTS[styleName] ?? 70;

export const isKnownNotificationStyle = (styleName: string): styleName is NotificationStyleEnum => KNOWN_NOTIFICATION_STYLES.has(styleName);