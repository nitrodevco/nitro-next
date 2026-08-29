import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Row template `separator` of PackagecardInfoLayout - pass real rows through its `items…` slot. */
export interface PackagecardInfoLayoutSeparatorItemProps {
    layout?: BoxLayout;
    separator?: ReactNode;
}

export const PackagecardInfoLayoutSeparatorItem = ({ layout, separator }: PackagecardInfoLayoutSeparatorItemProps) => {
    return (
        <Region
            name="separator"
            layout={{ width: 336, height: 1, flexShrink: 0, ...layout }}
        >
            {separator}
        </Region>
    );
};
