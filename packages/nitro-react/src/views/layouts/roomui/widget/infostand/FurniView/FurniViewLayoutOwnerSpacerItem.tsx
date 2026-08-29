import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Row template `owner_spacer` of FurniViewLayout - pass real rows through its `items…` slot. */
export interface FurniViewLayoutOwnerSpacerItemProps {
    layout?: BoxLayout;
    ownerSpacer?: ReactNode;
}

export const FurniViewLayoutOwnerSpacerItem = ({ layout, ownerSpacer }: FurniViewLayoutOwnerSpacerItemProps) => {
    return (
        <Region
            name="owner_spacer"
            backgroundColor="#333333"
            layout={{ width: 170, height: 1, flexShrink: 0, ...layout }}
        >
            {ownerSpacer}
        </Region>
    );
};
