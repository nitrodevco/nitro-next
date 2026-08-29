import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Row template `spacing` of SearchTreeDropdownLayout - pass real rows through its `items…` slot. */
export interface SearchTreeDropdownLayoutSpacingItemProps {
    layout?: BoxLayout;
    spacing?: ReactNode;
}

export const SearchTreeDropdownLayoutSpacingItem = ({ layout, spacing }: SearchTreeDropdownLayoutSpacingItemProps) => {
    return (
        <Region
            name="spacing"
            layout={{ width: 0, height: 2, flexShrink: 0, ...layout }}
        >
            {spacing}
        </Region>
    );
};
