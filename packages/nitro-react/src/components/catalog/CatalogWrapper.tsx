import { CatalogTypeEnum } from '@nitrodevco/nitro-api';

import { CatalogContextProvider } from '#base/context/catalog';

import { CatalogBuildersClubComponent } from './CatalogBuildersClubComponent';
import { CatalogClubComponent } from './CatalogClubComponent';
import { CatalogComponent } from './CatalogComponent';

type CatalogWrapperProps = {
    catalogType: CatalogTypeEnum;
};

export const CatalogWrapper = ({ catalogType }: CatalogWrapperProps) => {
    return (
        <CatalogContextProvider catalogType={catalogType}>
            {(catalogType === CatalogTypeEnum.BuildersClub) ? <CatalogBuildersClubComponent /> : <CatalogComponent />}
            {(catalogType === CatalogTypeEnum.Normal) && <CatalogClubComponent />}
        </CatalogContextProvider>
    );
};
