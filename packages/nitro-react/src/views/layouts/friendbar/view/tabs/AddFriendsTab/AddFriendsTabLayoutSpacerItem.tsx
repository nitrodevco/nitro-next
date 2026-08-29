import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Row template `spacer` of AddFriendsTabLayout - pass real rows through its `items…` slot. */
export interface AddFriendsTabLayoutSpacerItemProps {
    layout?: BoxLayout;
    spacer?: ReactNode;
}

export const AddFriendsTabLayoutSpacerItem = ({ layout, spacer }: AddFriendsTabLayoutSpacerItemProps) => {
    return (
        <Region
            name="spacer"
            layout={{ width: 1, height: 6, flexShrink: 0, ...layout }}
        >
            {spacer}
        </Region>
    );
};
