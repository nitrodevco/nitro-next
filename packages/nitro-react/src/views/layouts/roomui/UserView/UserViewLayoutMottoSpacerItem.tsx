import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Row template `motto_spacer` of UserViewLayout - pass real rows through its `items…` slot. */
export interface UserViewLayoutMottoSpacerItemProps {
    layout?: BoxLayout;
    mottoSpacer?: ReactNode;
}

export const UserViewLayoutMottoSpacerItem = ({ layout, mottoSpacer }: UserViewLayoutMottoSpacerItemProps) => {
    return (
        <Region
            name="motto_spacer"
            backgroundColor="#333333"
            layout={{ width: 170, height: 1, flexShrink: 0, ...layout }}
        >
            {mottoSpacer}
        </Region>
    );
};
