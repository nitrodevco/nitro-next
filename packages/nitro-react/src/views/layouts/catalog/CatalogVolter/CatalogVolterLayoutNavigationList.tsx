import { ReactNode } from 'react';

import { BoxLayout, Region, ScrollArea } from '#base/theme';

import { CatalogVolterLayoutItemTemplateItem } from './CatalogVolterLayoutItemTemplateItem';
import { CatalogVolterLayoutListTemplateItem } from './CatalogVolterLayoutListTemplateItem';
import { CatalogVolterLayoutSubitemTemplateItem } from './CatalogVolterLayoutSubitemTemplateItem';

/** Named region `navigationList` of CatalogVolterLayout - configured through the parent's `navigationList` prop. */
export interface CatalogVolterLayoutNavigationListProps {
    itemsNavigationList?: ReactNode;
    layout?: BoxLayout;
}

export const CatalogVolterLayoutNavigationList = ({ itemsNavigationList, layout }: CatalogVolterLayoutNavigationListProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 3, width: 160, top: 0, height: 434, ...layout }}
        >
            <Region
                name="navigationList"
                layout={{ flexDirection: 'column', width: '100%' }}
            >
                {itemsNavigationList ?? (
                    <>
                        <CatalogVolterLayoutListTemplateItem />
                        <CatalogVolterLayoutItemTemplateItem />
                        <CatalogVolterLayoutSubitemTemplateItem />
                    </>
                )}
            </Region>
        </ScrollArea>
    );
};
