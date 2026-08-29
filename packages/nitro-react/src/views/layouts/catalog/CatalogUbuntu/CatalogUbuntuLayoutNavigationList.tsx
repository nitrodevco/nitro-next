import { ReactNode } from 'react';

import { BoxLayout, Region, ScrollArea } from '#base/theme';

import { CatalogUbuntuLayoutBuildersClubListTemplateItem } from './CatalogUbuntuLayoutBuildersClubListTemplateItem';
import { CatalogUbuntuLayoutBuildersClubSubitemTemplateItem } from './CatalogUbuntuLayoutBuildersClubSubitemTemplateItem';
import { CatalogUbuntuLayoutBuildersClubTopitemTemplateItem } from './CatalogUbuntuLayoutBuildersClubTopitemTemplateItem';
import { CatalogUbuntuLayoutNormalListTemplateItem } from './CatalogUbuntuLayoutNormalListTemplateItem';
import { CatalogUbuntuLayoutNormalSubitemTemplateItem } from './CatalogUbuntuLayoutNormalSubitemTemplateItem';
import { CatalogUbuntuLayoutNormalTopitemTemplateItem } from './CatalogUbuntuLayoutNormalTopitemTemplateItem';

/** Named region `navigationList` of CatalogUbuntuLayout - configured through the parent's `navigationList` prop. */
export interface CatalogUbuntuLayoutNavigationListProps {
    itemsNavigationList?: ReactNode;
    layout?: BoxLayout;
}

export const CatalogUbuntuLayoutNavigationList = ({ itemsNavigationList, layout }: CatalogUbuntuLayoutNavigationListProps) => {
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
                        <CatalogUbuntuLayoutNormalListTemplateItem />
                        <CatalogUbuntuLayoutNormalTopitemTemplateItem />
                        <CatalogUbuntuLayoutNormalSubitemTemplateItem />
                        <CatalogUbuntuLayoutBuildersClubListTemplateItem />
                        <CatalogUbuntuLayoutBuildersClubTopitemTemplateItem />
                        <CatalogUbuntuLayoutBuildersClubSubitemTemplateItem />
                    </>
                )}
            </Region>
        </ScrollArea>
    );
};
