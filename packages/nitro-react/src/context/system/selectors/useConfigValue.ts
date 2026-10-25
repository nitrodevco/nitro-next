import { useConfigData } from './useConfigData';

/**
 * One client configuration value, by key, cast to the type the caller expects - undefined when
 * the configuration does not have it.
 */
export function useConfigValue<T>(key: string) {
    return useConfigData()[key] as T | undefined;
}
