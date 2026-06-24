import { create } from 'zustand';

type State = {
    config: Record<string, unknown>;
};

type Actions = {
    setConfig: (config: Record<string, unknown>) => void;
    setConfigValue: <T = unknown>(key: string, value: T) => void;
};

const initialState: State = {
    config: {}
};

export type ConfigurationStore = State & Actions;

export const ConfigurationStore = create<State & Actions>((set, get, store) => ({
    ...initialState,
    getConfigValue: <T = unknown>(key: string, defaultValue?: T) => {
        return get().config[key] ?? defaultValue;
    },
    setConfig: (config: Record<string, unknown>) => set({ config }),
    setConfigValue: <T = unknown>(key: string, value: T) =>
        set((state) => {
            return { config: { ...state.config, [key]: value } };
        }),
}));
