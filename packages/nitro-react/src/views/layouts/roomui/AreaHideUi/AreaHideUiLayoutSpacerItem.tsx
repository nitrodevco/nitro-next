import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Row template `spacer` of AreaHideUiLayout - pass real rows through its `items…` slot. */
export interface AreaHideUiLayoutSpacerItemProps {
    layout?: BoxLayout;
    spacer?: ReactNode;
}

export const AreaHideUiLayoutSpacerItem = ({ layout, spacer }: AreaHideUiLayoutSpacerItemProps) => {
    return (
        <Region
            name="spacer"
            layout={{ width: 30, height: 5, flexShrink: 0, ...layout }}
        >
            {spacer}
        </Region>
    );
};
