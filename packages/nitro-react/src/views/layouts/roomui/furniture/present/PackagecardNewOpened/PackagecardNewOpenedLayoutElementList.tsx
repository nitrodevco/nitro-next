import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { PackagecardNewOpenedLayoutButtonListItem } from './PackagecardNewOpenedLayoutButtonListItem';
import { PackagecardNewOpenedLayoutGiveElementListItem } from './PackagecardNewOpenedLayoutGiveElementListItem';
import { PackagecardNewOpenedLayoutMessageElementListItem } from './PackagecardNewOpenedLayoutMessageElementListItem';

/** Named region `element_list` of PackagecardNewOpenedLayout - configured through the parent's `elementList` prop. */
export interface PackagecardNewOpenedLayoutElementListProps {
    itemsElementList?: ReactNode;
    layout?: BoxLayout;
}

export const PackagecardNewOpenedLayoutElementList = ({ itemsElementList, layout }: PackagecardNewOpenedLayoutElementListProps) => {
    return (
        <Region
            name="element_list"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, flexDirection: 'column', gap: 10, ...layout }}
        >
            {itemsElementList ?? (
                <>
                    <PackagecardNewOpenedLayoutMessageElementListItem />
                    <PackagecardNewOpenedLayoutButtonListItem />
                    <PackagecardNewOpenedLayoutGiveElementListItem />
                </>
            )}
        </Region>
    );
};
