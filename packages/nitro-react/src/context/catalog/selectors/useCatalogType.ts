import { useCatalogStore } from '../useCatalogStore';

/** Which catalogue this provider's store is (normal or Builders Club), for a component inside `CatalogContextProvider`. */
export const useCatalogType = () => useCatalogStore(x => x.catalogType);
