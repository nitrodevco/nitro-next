import { createStore } from 'zustand';

type State = {
    config: {};
    configNeedsUpdate: boolean;
};

type Actions = {
    setConfig: (config: {}) => void;
    setConfigValue: <T = unknown>(key: string, value: T) => void;
    setConfigNeedsUpdate: (configNeedsUpdate: boolean) => void;
};

const initialState: State = {
    config: {},
    configNeedsUpdate: true,
};

export const ConfigurationStore = createStore<State & Actions>(set => ({
    ...initialState,
    setConfig: (config: {}) => set({ config, configNeedsUpdate: false }),
    setConfigValue: <T = unknown>(key: string, value: T) =>
        set(state => {
            return { config: { ...state.config, [key]: value } };
        }),
    setConfigNeedsUpdate: (configNeedsUpdate: boolean) => set({ configNeedsUpdate }),
}));
