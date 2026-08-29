import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Row template `generic_spacer` of UserViewLayout - pass real rows through its `items…` slot. */
export interface UserViewLayoutGenericSpacerItemProps {
    genericSpacer?: ReactNode;
    layout?: BoxLayout;
}

export const UserViewLayoutGenericSpacerItem = ({ genericSpacer, layout }: UserViewLayoutGenericSpacerItemProps) => {
    return (
        <Region
            name="generic_spacer"
            backgroundColor="#333333"
            layout={{ width: 170, height: 1, flexShrink: 0, ...layout }}
        >
            {genericSpacer}
        </Region>
    );
};
