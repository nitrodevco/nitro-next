import { useConfigurationStore } from '#base/stores';

export const useConfigValue = <T = unknown>(
    key: string,
    defaultValue: T | undefined = undefined
): T | undefined => useConfigurationStore(
    (state) => {
        const keys = key.split('.');
        let current: unknown = state.config;

        for (const k of keys) {
            current = (current as Record<string, unknown>)?.[k];
        }

        return (current as T) ?? defaultValue;
    }
);
