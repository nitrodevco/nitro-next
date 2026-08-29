import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Row template `separator` of PackagecardNewLayout - pass real rows through its `items…` slot. */
export interface PackagecardNewLayoutSeparatorItemProps {
    layout?: BoxLayout;
    separator?: ReactNode;
}

export const PackagecardNewLayoutSeparatorItem = ({ layout, separator }: PackagecardNewLayoutSeparatorItemProps) => {
    return (
        <Region
            name="separator"
            layout={{ width: 306, height: 1, flexShrink: 0, ...layout }}
        >
            {separator}
        </Region>
    );
};
