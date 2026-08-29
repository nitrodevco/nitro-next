import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Row template `spacer` of BackgroundColorUiLayout - pass real rows through its `items…` slot. */
export interface BackgroundColorUiLayoutSpacerItemProps {
    layout?: BoxLayout;
    spacer?: ReactNode;
}

export const BackgroundColorUiLayoutSpacerItem = ({ layout, spacer }: BackgroundColorUiLayoutSpacerItemProps) => {
    return (
        <Region
            name="spacer"
            layout={{ width: 30, height: 5, flexShrink: 0, ...layout }}
        >
            {spacer}
        </Region>
    );
};
