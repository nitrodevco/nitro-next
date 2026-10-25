/**
 * The client configuration's setters on `SystemStore`: the whole configuration as it loads,
 * or one value. Read off the store once: a component using these re-renders for nothing.
 */
import { systemStore } from '../store/SystemStore';

const state = systemStore.getState();

const actions = {
    setConfig: state.setConfig,
    setConfigValue: state.setConfigValue,
};

export const useConfigActions = () => actions;
