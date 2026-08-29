import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Row template `spacer` of NewExtendedProfileLayout - pass real rows through its `items…` slot. */
export interface NewExtendedProfileLayoutSpacerItemProps {
    layout?: BoxLayout;
    spacer?: ReactNode;
}

export const NewExtendedProfileLayoutSpacerItem = ({ layout, spacer }: NewExtendedProfileLayoutSpacerItemProps) => {
    return (
        <Region
            name="spacer"
            backgroundColor="#afafaf"
            layout={{ width: 1, height: 192, flexShrink: 0, ...layout }}
        >
            {spacer}
        </Region>
    );
};
