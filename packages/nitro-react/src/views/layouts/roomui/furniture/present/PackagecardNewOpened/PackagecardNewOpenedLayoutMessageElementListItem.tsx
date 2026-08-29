import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { PackagecardNewOpenedLayoutImageContainerItem } from './PackagecardNewOpenedLayoutImageContainerItem';
import { PackagecardNewOpenedLayoutMessageContainerItem } from './PackagecardNewOpenedLayoutMessageContainerItem';

/** Row template `message_element_list` of PackagecardNewOpenedLayout - pass real rows through its `items…` slot. */
export interface PackagecardNewOpenedLayoutMessageElementListItemProps {
    itemsMessageElementList?: ReactNode;
    layout?: BoxLayout;
}

export const PackagecardNewOpenedLayoutMessageElementListItem = ({ itemsMessageElementList, layout }: PackagecardNewOpenedLayoutMessageElementListItemProps) => {
    return (
        <Region
            name="message_element_list"
            layout={{ width: 275, height: 100, flexShrink: 0, flexDirection: 'row', gap: 10, ...layout }}
        >
            {itemsMessageElementList ?? (
                <>
                    <PackagecardNewOpenedLayoutImageContainerItem />
                    <PackagecardNewOpenedLayoutMessageContainerItem />
                </>
            )}
        </Region>
    );
};
