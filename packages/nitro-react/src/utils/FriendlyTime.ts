type Translate = (key: string, fallback?: string, params?: Record<string, string>) => string;

const MINUTE = 60;
const HOUR = 3600;
const DAY = 86400;
const MONTH = 2592000;
const YEAR = 31536000;

/**
 * A duration in the largest unit that still reads naturally - `FriendlyTime.getFriendlyTime`.
 * A unit is used once the duration is more than `threshold` of it, so three days and a bit reads
 * in days but two days reads in hours. `suffix` picks a variant of the keys, as `.short` does.
 */
export const GetFriendlyTime = (translate: Translate, seconds: number, suffix: string = '', threshold: number = 3): string => {
    const localize = (unit: string, amount: number) => {
        const key = `friendlytime.${unit}${suffix}`;

        return translate(key, key, { amount: String(Math.round(amount)) });
    };

    if (seconds > (threshold * YEAR)) return localize('years', seconds / YEAR);
    if (seconds > (threshold * MONTH)) return localize('months', seconds / MONTH);
    if (seconds > (threshold * DAY)) return localize('days', seconds / DAY);
    if (seconds > (threshold * HOUR)) return localize('hours', seconds / HOUR);
    if (seconds > (threshold * MINUTE)) return localize('minutes', seconds / MINUTE);

    return localize('seconds', seconds);
};
