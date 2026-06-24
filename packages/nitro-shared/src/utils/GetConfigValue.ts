import { ConfigurationStore } from '../stores';

export const GetConfigValue = <T>(key: string, defaultValue: T) => {
    return ConfigurationStore.getState().config[key] as T ?? defaultValue;
};
