import { CatalogTypeEnum } from '@nitrodevco/nitro-api';
import { ReactNode, useState } from 'react';

import { CatalogContext } from './CatalogContext';
import { createCatalogStore } from './store';

type ProviderProps = {
    catalogType: CatalogTypeEnum;
    children: ReactNode;
};

export const CatalogContextProvider = ({ catalogType, children }: ProviderProps) => {
    const [ ctx ] = useState(() => createCatalogStore(catalogType));

    return (
        <CatalogContext value={ctx}>
            {children}
        </CatalogContext>
    );
};
