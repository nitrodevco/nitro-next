import { ReactNode } from 'react';

import { BoxLayout, Region, ScrollArea } from '#base/theme';

import { CollectibleHubLayoutItemTemplateItem2 } from './CollectibleHubLayoutItemTemplateItem2';

/** Named region `navigationList` of CollectibleHubLayout - configured through the parent's `navigationList` prop. */
export interface CollectibleHubLayoutNavigationListProps {
    itemsNavigationList?: ReactNode;
    layout?: BoxLayout;
}

export const CollectibleHubLayoutNavigationList = ({ itemsNavigationList, layout }: CollectibleHubLayoutNavigationListProps) => {
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
                    <CollectibleHubLayoutItemTemplateItem2 />
                )}
            </Region>
        </ScrollArea>
    );
};
