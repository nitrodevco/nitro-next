import { ReactNode } from 'react';

import { BoxLayout, Region, ScrollArea } from '#base/theme';

import { CatalogUbuntuWithTabsLayoutBuildersClubListTemplateItem } from './CatalogUbuntuWithTabsLayoutBuildersClubListTemplateItem';
import { CatalogUbuntuWithTabsLayoutBuildersClubSubitemTemplateItem } from './CatalogUbuntuWithTabsLayoutBuildersClubSubitemTemplateItem';
import { CatalogUbuntuWithTabsLayoutBuildersClubTopitemTemplateItem } from './CatalogUbuntuWithTabsLayoutBuildersClubTopitemTemplateItem';
import { CatalogUbuntuWithTabsLayoutNormalListTemplateItem } from './CatalogUbuntuWithTabsLayoutNormalListTemplateItem';
import { CatalogUbuntuWithTabsLayoutNormalSubitemTemplateItem } from './CatalogUbuntuWithTabsLayoutNormalSubitemTemplateItem';
import { CatalogUbuntuWithTabsLayoutNormalTopitemTemplateItem } from './CatalogUbuntuWithTabsLayoutNormalTopitemTemplateItem';

/** Named region `navigationList` of CatalogUbuntuWithTabsLayout - configured through the parent's `navigationList` prop. */
export interface CatalogUbuntuWithTabsLayoutNavigationListProps {
    itemsNavigationList?: ReactNode;
    layout?: BoxLayout;
}

export const CatalogUbuntuWithTabsLayoutNavigationList = ({ itemsNavigationList, layout }: CatalogUbuntuWithTabsLayoutNavigationListProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 3, width: 178, top: 5, bottom: 5, ...layout }}
        >
            <Region
                name="navigationList"
                layout={{ flexDirection: 'column', width: '100%' }}
            >
                {itemsNavigationList ?? (
                    <>
                        <CatalogUbuntuWithTabsLayoutNormalListTemplateItem />
                        <CatalogUbuntuWithTabsLayoutNormalTopitemTemplateItem />
                        <CatalogUbuntuWithTabsLayoutNormalSubitemTemplateItem />
                        <CatalogUbuntuWithTabsLayoutBuildersClubListTemplateItem />
                        <CatalogUbuntuWithTabsLayoutBuildersClubTopitemTemplateItem />
                        <CatalogUbuntuWithTabsLayoutBuildersClubSubitemTemplateItem />
                    </>
                )}
            </Region>
        </ScrollArea>
    );
};
