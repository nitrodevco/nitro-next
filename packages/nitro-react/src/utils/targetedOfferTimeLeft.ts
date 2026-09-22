/**
 * The time left on a targeted offer as its views print it - Flash's
 * `catalog/targetedoffers/util/§_-T2o§` (`ObfClass_T2o` in Sulake's JavaScript build):
 * `getStringFromSeconds` and `convertSecondsToTime`.
 */
import { GetFriendlyTime } from './FriendlyTime';

type Translate = (key: string, fallback?: string, params?: Record<string, string>) => string;

/** `convertSecondsToTime`: `h:mm` from an hour up, `mm:ss` below it. */
export const convertSecondsToTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 60 / 60);
    const minutes = Math.floor((seconds - (hours * 60 * 60)) / 60);
    const rest = seconds - (hours * 60 * 60) - (minutes * 60);

    let text = (hours > 0) ? `${hours}:` : '';

    text += (minutes < 10) ? `0${minutes}` : `${minutes}`;

    if (hours === 0) text += (rest < 10) ? `:0${rest}` : `:${rest}`;

    return text;
};

/**
 * `getStringFromSeconds`: past a day, `FriendlyTime.getFriendlyTime(.., "", 1)`; past an hour,
 * `friendlytime.hours.short` with the whole hours; below that the clock of `convertSecondsToTime`.
 */
export const getTargetedOfferTimeLeft = (translate: Translate, seconds: number): string => {
    const hours = Math.floor(seconds / 60 / 60);

    if (hours > 24) return GetFriendlyTime(translate, seconds, '', 1);

    if (hours > 0) return translate('friendlytime.hours.short', 'friendlytime.hours.short', { amount: String(hours) });

    return convertSecondsToTime(seconds);
};
