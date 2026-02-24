import { useConfig } from './useConfig';

export const useConfigValue = <T>(key: string, defaultValue: T | undefined = undefined) => {
    const config = useConfig();

    return config(key, defaultValue);
};
