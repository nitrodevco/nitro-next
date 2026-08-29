import { ReactNode } from 'react';

import { BoxLayout, Region, ScrollArea } from '#base/theme';

import { CollectibleHubLayoutItemTemplateItem3 } from './CollectibleHubLayoutItemTemplateItem3';

/** Named region `itemgrid_collection` of CollectibleHubLayout - configured through the parent's `itemgridCollection` prop. */
export interface CollectibleHubLayoutItemgridCollectionProps {
    itemsItemgridCollection?: ReactNode;
    layout?: BoxLayout;
}

export const CollectibleHubLayoutItemgridCollection = ({ itemsItemgridCollection, layout }: CollectibleHubLayoutItemgridCollectionProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
        >
            <Region
                name="itemgrid_collection"
                layout={{ flexDirection: 'row', flexWrap: 'wrap', gap: 1, width: '100%' }}
            >
                {itemsItemgridCollection ?? (
                    <CollectibleHubLayoutItemTemplateItem3 />
                )}
            </Region>
        </ScrollArea>
    );
};
