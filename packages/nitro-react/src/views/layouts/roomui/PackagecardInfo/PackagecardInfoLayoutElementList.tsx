import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { PackagecardInfoLayoutButtonListItem } from './PackagecardInfoLayoutButtonListItem';
import { PackagecardInfoLayoutGiftCardContainerItem } from './PackagecardInfoLayoutGiftCardContainerItem';
import { PackagecardInfoLayoutSeparatorItem } from './PackagecardInfoLayoutSeparatorItem';

/** Named region `element_list` of PackagecardInfoLayout - configured through the parent's `elementList` prop. */
export interface PackagecardInfoLayoutElementListProps {
    itemsElementList?: ReactNode;
    layout?: BoxLayout;
}

export const PackagecardInfoLayoutElementList = ({ itemsElementList, layout }: PackagecardInfoLayoutElementListProps) => {
    return (
        <Region
            name="element_list"
            layout={{ position: 'absolute', top: 0, bottom: 0, minWidth: 330, maxWidth: 370, flexDirection: 'column', gap: 10, ...layout }}
        >
            {itemsElementList ?? (
                <>
                    <PackagecardInfoLayoutGiftCardContainerItem />
                    <PackagecardInfoLayoutButtonListItem />
                    <PackagecardInfoLayoutSeparatorItem />
                </>
            )}
        </Region>
    );
};
