import { Border, BoxLayout, Region } from '#base/theme';

import { CatalogUbuntuWithTabsLayoutNavigationList, CatalogUbuntuWithTabsLayoutNavigationListProps } from './CatalogUbuntuWithTabsLayoutNavigationList';

/** Named region `navigationContainer` of CatalogUbuntuWithTabsLayout - configured through the parent's `navigationContainer` prop. */
export interface CatalogUbuntuWithTabsLayoutNavigationContainerProps {
    layout?: BoxLayout;
    navigationList?: CatalogUbuntuWithTabsLayoutNavigationListProps;
}

export const CatalogUbuntuWithTabsLayoutNavigationContainer = ({ layout, navigationList }: CatalogUbuntuWithTabsLayoutNavigationContainerProps) => {
    return (
        <Region
            name="navigationContainer"
            layout={{ position: 'absolute', left: 8, width: 184, top: 159, bottom: 2, ...layout }}
        >
            <Border
                variant="6"
                blend={0.5}
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            />
            <CatalogUbuntuWithTabsLayoutNavigationList {...navigationList} />
        </Region>
    );
};
