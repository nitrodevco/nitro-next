import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { PackagecardNewLayoutButtonListItem } from './PackagecardNewLayoutButtonListItem';
import { PackagecardNewLayoutGiftCardContainerItem } from './PackagecardNewLayoutGiftCardContainerItem';
import { PackagecardNewLayoutSeparatorItem } from './PackagecardNewLayoutSeparatorItem';
import { PackagecardNewLayoutWarningItem } from './PackagecardNewLayoutWarningItem';

/** Named region `element_list` of PackagecardNewLayout - configured through the parent's `elementList` prop. */
export interface PackagecardNewLayoutElementListProps {
    itemsElementList?: ReactNode;
    layout?: BoxLayout;
}

export const PackagecardNewLayoutElementList = ({ itemsElementList, layout }: PackagecardNewLayoutElementListProps) => {
    return (
        <Region
            name="element_list"
            layout={{ position: 'absolute', left: 10, top: 10, minWidth: 306, maxWidth: 306, flexDirection: 'column', gap: 10, ...layout }}
        >
            {itemsElementList ?? (
                <>
                    <PackagecardNewLayoutWarningItem />
                    <PackagecardNewLayoutGiftCardContainerItem />
                    <PackagecardNewLayoutButtonListItem />
                    <PackagecardNewLayoutSeparatorItem />
                </>
            )}
        </Region>
    );
};
