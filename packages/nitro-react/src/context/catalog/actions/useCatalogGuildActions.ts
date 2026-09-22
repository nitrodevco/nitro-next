import { useCatalogStoreApi } from '../useCatalogStoreApi';

/**
 * `CatalogGuildSlice`'s actions, read off the store once (they never change). The guild selector
 * registers through `commands/catalogGuildCommands` (registering also asks for the memberships)
 * and unregisters with `unregisterGuildSelectorWidget` when it goes.
 */
export const useCatalogGuildActions = () => {
    const state = useCatalogStoreApi().getState();

    return {
        setGuildSelectorWidget: state.setGuildSelectorWidget,
        unregisterGuildSelectorWidget: state.unregisterGuildSelectorWidget,
    };
};
