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

export const ConfigurationStore = create<State & Actions>(set => ({
    ...initialState,
    setConfig: (config: Record<string, unknown>) => set({ config }),
    setConfigValue: <T = unknown>(key: string, value: T) =>
        set((state) => {
            const keys = key.split('.');

            if (keys.length === 1) {
                return { config: { ...state.config, [key]: value } };
            }

            const newConfig = { ...state.config };

            let current = newConfig as Record<string, unknown>;

            for (let i = 0; i < keys.length - 1; i++) {
                const k = keys[i];

                current[k] = { ...((current[k]) || {}) };
                current = current[k] as Record<string, unknown>;
            }

            current[keys[keys.length - 1]] = value;

            return { config: newConfig };
        }),
}));
