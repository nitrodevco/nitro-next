import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Row template `spacer` of ClubExtendConfirmationLayout - pass real rows through its `items…` slot. */
export interface ClubExtendConfirmationLayoutSpacerItemProps {
    layout?: BoxLayout;
    spacer?: ReactNode;
}

export const ClubExtendConfirmationLayoutSpacerItem = ({ layout, spacer }: ClubExtendConfirmationLayoutSpacerItemProps) => {
    return (
        <Region
            name="spacer"
            layout={{ width: 100, height: 8, flexShrink: 0, ...layout }}
        >
            {spacer}
        </Region>
    );
};
