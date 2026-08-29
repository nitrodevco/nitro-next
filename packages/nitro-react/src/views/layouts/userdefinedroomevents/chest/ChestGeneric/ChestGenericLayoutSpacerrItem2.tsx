import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Row template `spacerr` of ChestGenericLayout - pass real rows through its `items…` slot. */
export interface ChestGenericLayoutSpacerrItem2Props {
    layout?: BoxLayout;
    spacerr?: ReactNode;
}

export const ChestGenericLayoutSpacerrItem2 = ({ layout, spacerr }: ChestGenericLayoutSpacerrItem2Props) => {
    return (
        <Region
            name="spacerr"
            layout={{ width: 30, height: 14, flexShrink: 0, ...layout }}
        >
            {spacerr}
        </Region>
    );
};
