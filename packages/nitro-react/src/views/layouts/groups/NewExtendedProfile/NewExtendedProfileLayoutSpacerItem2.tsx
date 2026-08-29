import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Row template `spacer` of NewExtendedProfileLayout - pass real rows through its `items…` slot. */
export interface NewExtendedProfileLayoutSpacerItem2Props {
    layout?: BoxLayout;
    spacer?: ReactNode;
}

export const NewExtendedProfileLayoutSpacerItem2 = ({ layout, spacer }: NewExtendedProfileLayoutSpacerItem2Props) => {
    return (
        <Region
            name="spacer"
            backgroundColor="#afafaf"
            layout={{ width: 1, height: 39, flexShrink: 0, ...layout }}
        >
            {spacer}
        </Region>
    );
};
