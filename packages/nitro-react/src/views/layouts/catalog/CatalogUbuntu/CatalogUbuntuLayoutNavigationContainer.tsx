import { Border, BoxLayout, Region } from '#base/theme';

import { CatalogUbuntuLayoutNavigationList, CatalogUbuntuLayoutNavigationListProps } from './CatalogUbuntuLayoutNavigationList';

/** Named region `navigationContainer` of CatalogUbuntuLayout - configured through the parent's `navigationContainer` prop. */
export interface CatalogUbuntuLayoutNavigationContainerProps {
    layout?: BoxLayout;
    navigationList?: CatalogUbuntuLayoutNavigationListProps;
}

export const CatalogUbuntuLayoutNavigationContainer = ({ layout, navigationList }: CatalogUbuntuLayoutNavigationContainerProps) => {
    return (
        <Region
            name="navigationContainer"
            layout={{ position: 'absolute', left: 8, width: 184, top: 124, bottom: 2, ...layout }}
        >
            <Border
                variant="6"
                blend={0.5}
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            />
            <CatalogUbuntuLayoutNavigationList {...navigationList} />
        </Region>
    );
};
