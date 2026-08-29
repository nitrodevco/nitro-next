import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { PackagecardNewOpenedLayoutGiveContainerItem } from './PackagecardNewOpenedLayoutGiveContainerItem';

/** Row template `give_element_list` of PackagecardNewOpenedLayout - pass real rows through its `items…` slot. */
export interface PackagecardNewOpenedLayoutGiveElementListItemProps {
    itemsGiveElementList?: ReactNode;
    layout?: BoxLayout;
}

export const PackagecardNewOpenedLayoutGiveElementListItem = ({ itemsGiveElementList, layout }: PackagecardNewOpenedLayoutGiveElementListItemProps) => {
    return (
        <Region
            name="give_element_list"
            layout={{ flexShrink: 0, minWidth: 336, maxWidth: 336, flexDirection: 'column', gap: 10, ...layout }}
        >
            {itemsGiveElementList ?? (
                <PackagecardNewOpenedLayoutGiveContainerItem />
            )}
        </Region>
    );
};
