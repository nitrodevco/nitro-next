import { ReactNode } from 'react';

import { BoxLayout, Region, ScrollArea } from '#base/theme';

import { CollectibleHubLayoutItemTemplateItem6 } from './CollectibleHubLayoutItemTemplateItem6';

/** Named region `itemlist` of CollectibleHubLayout - configured through the parent's `itemlist` prop. */
export interface CollectibleHubLayoutItemlistProps {
    itemsItemlist?: ReactNode;
    layout?: BoxLayout;
}

export const CollectibleHubLayoutItemlist = ({ itemsItemlist, layout }: CollectibleHubLayoutItemlistProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
        >
            <Region
                name="itemlist"
                layout={{ flexDirection: 'column', gap: 2, width: '100%' }}
            >
                {itemsItemlist ?? (
                    <CollectibleHubLayoutItemTemplateItem6 />
                )}
            </Region>
        </ScrollArea>
    );
};
