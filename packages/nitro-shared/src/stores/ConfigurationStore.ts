import { createStore } from 'zustand';

type State = {
    config: object;
};

type Actions = {
    setConfig: (config: object) => void;
    setConfigValue: <T = unknown>(key: string, value: T) => void;
};

const initialState: State = {
    config: {}
};

export const ConfigurationStore = createStore<State & Actions>(set => ({
    ...initialState,

    setConfig: (config: object) => set({ config }),
    setConfigValue: <T = unknown>(key: string, value: T) =>
        set(state => {
            return { config: { ...state.config, [key]: value } };
        }),
}));
