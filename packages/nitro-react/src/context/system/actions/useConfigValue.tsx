import { useConfigData } from './useConfigData';

export function useConfigValue<T>(key: string) {
    return useConfigData()[key] as T | undefined;
}
