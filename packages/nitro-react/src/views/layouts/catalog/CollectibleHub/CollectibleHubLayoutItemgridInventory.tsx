import { ReactNode } from 'react';

import { BoxLayout, Region, ScrollArea } from '#base/theme';

import { CollectibleHubLayoutItemTemplateItem } from './CollectibleHubLayoutItemTemplateItem';

/** Named region `itemgrid_inventory` of CollectibleHubLayout - configured through the parent's `itemgridInventory` prop. */
export interface CollectibleHubLayoutItemgridInventoryProps {
    itemsItemgridInventory?: ReactNode;
    layout?: BoxLayout;
}

export const CollectibleHubLayoutItemgridInventory = ({ itemsItemgridInventory, layout }: CollectibleHubLayoutItemgridInventoryProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 0, width: 179, top: 0, height: 260, ...layout }}
        >
            <Region
                name="itemgrid_inventory"
                layout={{ flexDirection: 'row', flexWrap: 'wrap', gap: 1, width: '100%' }}
            >
                {itemsItemgridInventory ?? (
                    <CollectibleHubLayoutItemTemplateItem />
                )}
            </Region>
        </ScrollArea>
    );
};
