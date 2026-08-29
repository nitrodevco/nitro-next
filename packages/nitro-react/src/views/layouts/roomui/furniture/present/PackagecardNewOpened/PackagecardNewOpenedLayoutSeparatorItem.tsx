import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Row template `separator` of PackagecardNewOpenedLayout - pass real rows through its `items…` slot. */
export interface PackagecardNewOpenedLayoutSeparatorItemProps {
    layout?: BoxLayout;
    separator?: ReactNode;
}

export const PackagecardNewOpenedLayoutSeparatorItem = ({ layout, separator }: PackagecardNewOpenedLayoutSeparatorItemProps) => {
    return (
        <Region
            name="separator"
            layout={{ width: 336, height: 1, flexShrink: 0, ...layout }}
        >
            {separator}
        </Region>
    );
};
