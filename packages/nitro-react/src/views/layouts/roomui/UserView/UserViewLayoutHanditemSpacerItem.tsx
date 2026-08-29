import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Row template `handitem_spacer` of UserViewLayout - pass real rows through its `items…` slot. */
export interface UserViewLayoutHanditemSpacerItemProps {
    handitemSpacer?: ReactNode;
    layout?: BoxLayout;
    visibleHanditemSpacer?: boolean;
}

export const UserViewLayoutHanditemSpacerItem = ({ handitemSpacer, layout, visibleHanditemSpacer }: UserViewLayoutHanditemSpacerItemProps) => {
    return (
        (visibleHanditemSpacer ?? false) && (
            <Region
                name="handitem_spacer"
                backgroundColor="#333333"
                layout={{ width: 170, height: 1, flexShrink: 0, ...layout }}
            >
                {handitemSpacer}
            </Region>
        )
    );
};
