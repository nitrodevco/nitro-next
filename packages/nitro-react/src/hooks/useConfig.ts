import { useConfigurationStore } from "#base/stores";

export const useConfig = () => {
    const config = useConfigurationStore(state => state.config);

    return <T>(key: string, defaultValue: T | undefined = undefined) => {
        if (!key?.length) key = '';

        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return (key.split('.').reduce((acc, k) => acc?.[k], config) as T) ?? defaultValue;
    };
};
