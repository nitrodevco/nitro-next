import { ReactNode } from 'react';

import { BoxLayout, Region, ScrollArea } from '#base/theme';

import { FurniChestContentsLayoutFurniTemplateItem } from './FurniChestContentsLayoutFurniTemplateItem';

/** Named region `grid_items` of FurniChestContentsLayout - configured through the parent's `gridItems` prop. */
export interface FurniChestContentsLayoutGridItemsProps {
    itemsGridItems?: ReactNode;
    layout?: BoxLayout;
}

export const FurniChestContentsLayoutGridItems = ({ itemsGridItems, layout }: FurniChestContentsLayoutGridItemsProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 5, right: 5, top: 5, bottom: 5, ...layout }}
        >
            <Region
                name="grid_items"
                layout={{ flexDirection: 'row', flexWrap: 'wrap', gap: 3, width: '100%' }}
            >
                {itemsGridItems ?? (
                    <FurniChestContentsLayoutFurniTemplateItem />
                )}
            </Region>
        </ScrollArea>
    );
};
