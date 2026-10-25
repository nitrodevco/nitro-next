import { useCatalogStoreApi } from '../useCatalogStoreApi';

/**
 * `CatalogBuildersClubSlice`'s actions, read off the store once (they never change), so a
 * component using them re-renders for nothing.
 */
export const useCatalogBuildersClubActions = () => {
    const state = useCatalogStoreApi().getState();

    return {
        setBuildersClubSubscription: state.setBuildersClubSubscription,
        setBuilderFurniCount: state.setBuilderFurniCount,
        setBuilderStatus: state.setBuilderStatus,
        countYouAreOwner: state.countYouAreOwner,
    };
};
