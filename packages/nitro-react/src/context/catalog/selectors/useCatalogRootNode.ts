import { useCatalogStore } from '../useCatalogStore';

/** The catalogue index's root node, `undefined` until the index arrives; inside `CatalogContextProvider`. */
export const useCatalogRootNode = () => useCatalogStore(x => x.rootNode);
