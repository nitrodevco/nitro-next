import { CatalogTypeEnum } from '@nitrodevco/nitro-api';

import { CatalogContextProvider } from '#base/context';

import { CatalogComponent } from './CatalogComponent';

type CatalogWrapperProps = {
    catalogType: CatalogTypeEnum;
};

export const CatalogWrapper = ({ catalogType }: CatalogWrapperProps) => {
    return (
        <CatalogContextProvider catalogType={catalogType}>
            <CatalogComponent />
        </CatalogContextProvider>
    );
};
