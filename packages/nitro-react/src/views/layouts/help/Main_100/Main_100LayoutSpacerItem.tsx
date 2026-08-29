import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Row template `spacer` of Main_100Layout - pass real rows through its `items…` slot. */
export interface Main_100LayoutSpacerItemProps {
    layout?: BoxLayout;
    spacer?: ReactNode;
}

export const Main_100LayoutSpacerItem = ({ layout, spacer }: Main_100LayoutSpacerItemProps) => {
    return (
        <Region
            name="spacer"
            layout={{ width: 30, height: 2, flexShrink: 0, ...layout }}
        >
            {spacer}
        </Region>
    );
};
