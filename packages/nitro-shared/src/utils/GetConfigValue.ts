import { ConfigurationStore } from '../stores';

export const GetConfigValue = <T>(key: string, defaultValue: T | undefined = undefined) => {
    return ConfigurationStore.getState().config[key] ?? defaultValue;
};
