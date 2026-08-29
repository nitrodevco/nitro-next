import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Row template `spacerr` of ChestGenericLayout - pass real rows through its `items…` slot. */
export interface ChestGenericLayoutSpacerrItem3Props {
    layout?: BoxLayout;
    spacerr?: ReactNode;
}

export const ChestGenericLayoutSpacerrItem3 = ({ layout, spacerr }: ChestGenericLayoutSpacerrItem3Props) => {
    return (
        <Region
            name="spacerr"
            layout={{ width: 30, height: 7, flexShrink: 0, ...layout }}
        >
            {spacerr}
        </Region>
    );
};
