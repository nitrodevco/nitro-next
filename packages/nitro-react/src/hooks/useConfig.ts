import { useConfigurationStore } from '../stores/useConfigurationStore';

export const useConfig = () => {
    const config = useConfigurationStore(state => state.config);

    return <T>(key: string, defaultValue: T | undefined = undefined) => {
        if (!key?.length) key = '';

        return (key.split('.').reduce((acc, k) => acc?.[k], config) as T) ?? defaultValue;
    };
};
