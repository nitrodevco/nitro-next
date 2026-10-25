import { useCatalogStoreApi } from '../useCatalogStoreApi';

/**
 * `CatalogLimitedEditionSlice`'s actions, read off the store once (they never change), so a
 * component using them re-renders for nothing - the purchase confirmation ends the raffle it shows
 * when it closes.
 */
export const useCatalogLimitedEditionActions = () => {
    const state = useCatalogStoreApi().getState();

    return {
        setLtdRaffleRunning: state.setLtdRaffleRunning,
    };
};
