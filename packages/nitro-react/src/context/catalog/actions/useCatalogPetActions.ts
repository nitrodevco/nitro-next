import { useCatalogStoreApi } from '../useCatalogStoreApi';

/**
 * `CatalogPetSlice`'s action, read off the store once (it never changes). The pet widgets read the
 * palettes and ask for missing ones through `commands/catalogPetCommands`; the setter is here so
 * the slice's action has its hook, as every slice's does.
 */
export const useCatalogPetActions = () => {
    const state = useCatalogStoreApi().getState();

    return {
        setSellablePetPalettes: state.setSellablePetPalettes,
    };
};
