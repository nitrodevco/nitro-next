import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Row template `another_column` of AvatareditorWardrobeBaseLayout - pass real rows through its `items…` slot. */
export interface AvatareditorWardrobeBaseLayoutAnotherColumnItemProps {
    itemsAnotherColumn?: ReactNode;
    layout?: BoxLayout;
}

export const AvatareditorWardrobeBaseLayoutAnotherColumnItem = ({ itemsAnotherColumn, layout }: AvatareditorWardrobeBaseLayoutAnotherColumnItemProps) => {
    return (
        <Region
            name="another_column"
            layout={{ width: 64, height: 412, flexShrink: 0, flexDirection: 'column', gap: 3, ...layout }}
        >
            {itemsAnotherColumn}
        </Region>
    );
};
