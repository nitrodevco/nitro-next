import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Row template `spacer` of DailytasksLayout - pass real rows through its `items…` slot. */
export interface DailytasksLayoutSpacerItemProps {
    layout?: BoxLayout;
    spacer?: ReactNode;
}

export const DailytasksLayoutSpacerItem = ({ layout, spacer }: DailytasksLayoutSpacerItemProps) => {
    return (
        <Region
            name="spacer"
            layout={{ width: 30, height: 0, flexShrink: 0, ...layout }}
        >
            {spacer}
        </Region>
    );
};
