import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Row template `group_details_spacer` of FurniViewLayout - pass real rows through its `items…` slot. */
export interface FurniViewLayoutGroupDetailsSpacerItemProps {
    groupDetailsSpacer?: ReactNode;
    layout?: BoxLayout;
}

export const FurniViewLayoutGroupDetailsSpacerItem = ({ groupDetailsSpacer, layout }: FurniViewLayoutGroupDetailsSpacerItemProps) => {
    return (
        <Region
            name="group_details_spacer"
            backgroundColor="#333333"
            layout={{ width: 170, height: 1, flexShrink: 0, ...layout }}
        >
            {groupDetailsSpacer}
        </Region>
    );
};
