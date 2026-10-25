/**
 * A clock or date field as two digits - the `addLeadingZero` Flash writes out in the classes that
 * format one (`EffectView.setTimeLeft`, `ErrorDataTableObject.convertTimestamp`): a `0` before a
 * value under 10.
 */
export const twoDigits = (value: number): string => ((value < 10) ? `0${value}` : String(value));
