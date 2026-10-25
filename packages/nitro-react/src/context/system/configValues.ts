import { configReader } from '#base/utils/configReader';

import { systemStore } from './store';

/**
 * Outside React: a configuration flag as Flash reads it (`getBoolean`: `"1"` or `"true"` in any
 * case), and `fallback` for a key that is not set at all - what `useConfigBoolean` is to a component.
 * Use it rather than `config[key] === true`, which reads a hotel's `"1"` or `"true"` as off.
 */
export const configBoolean = (key: string, fallback: boolean = false): boolean => {
    const { config } = systemStore.getState();

    if ((config[key] === undefined) || (config[key] === null)) return fallback;

    return configReader(config).configBoolean(key);
};

/** Outside React: a configuration value as Flash's `getProperty` reads it - text, `''` when unset. */
export const configString = (key: string): string => configReader(systemStore.getState().config).configString(key);

/** Outside React: a user badge's image - `badge.asset.url` with `%badgename%` the badge code, `''` when unset. */
export const badgeImageUrl = (code: string): string => configString('badge.asset.url').replace('%badgename%', code);

/** Outside React: a configuration number as Flash's `getInteger(key, fallback)` reads it. */
export const configInteger = (key: string, fallback: number): number => configReader(systemStore.getState().config).configInteger(key, fallback);
