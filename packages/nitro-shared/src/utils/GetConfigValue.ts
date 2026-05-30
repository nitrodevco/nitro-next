import { ConfigurationStore } from '../stores';

export const GetConfigValue = <T>(key: string, defaultValue: T | undefined = undefined) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return ConfigurationStore.getState().config?.[key] ?? defaultValue;
};
