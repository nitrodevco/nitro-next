import { ReactNode } from 'react';

import { BoxLayout, Region, ScrollArea } from '#base/theme';

import { CollectibleHubLayoutItemTemplateItem5 } from './CollectibleHubLayoutItemTemplateItem5';

/** Named region `itemgrid_shop` of CollectibleHubLayout - configured through the parent's `itemgridShop` prop. */
export interface CollectibleHubLayoutItemgridShopProps {
    itemsItemgridShop?: ReactNode;
    layout?: BoxLayout;
}

export const CollectibleHubLayoutItemgridShop = ({ itemsItemgridShop, layout }: CollectibleHubLayoutItemgridShopProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 0, width: 290, top: 0, height: 153, ...layout }}
        >
            <Region
                name="itemgrid_shop"
                layout={{ flexDirection: 'row', flexWrap: 'wrap', gap: 1, width: '100%' }}
            >
                {itemsItemgridShop ?? (
                    <CollectibleHubLayoutItemTemplateItem5 />
                )}
            </Region>
        </ScrollArea>
    );
};
