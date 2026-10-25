import { configReader } from '#base/utils/configReader';

import { useConfigData } from './useConfigData';

/**
 * A configuration flag as Flash reads it (`HabboConfigurationManager.getBoolean`): `"1"` or `"true"`
 * in any case, as the hotel's external variables write them - a JSON `true` or `1` alike. A key that is
 * not set at all is `fallback`, `false` unless the caller says otherwise, as code that checks
 * `propertyExists` first does; a key set to anything else is `false`.
 *
 * Use it rather than `useConfigValue<boolean>(key) === true`, which reads a hotel's `"1"` or
 * `"true"` as off.
 */
export const useConfigBoolean = (key: string, fallback: boolean = false): boolean => {
    const config = useConfigData();

    if ((config[key] === undefined) || (config[key] === null)) return fallback;

    return configReader(config).configBoolean(key);
};
