import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Row template `spacing` of IlluminaChatBubbleLayout - pass real rows through its `items…` slot. */
export interface IlluminaChatBubbleLayoutSpacingItemProps {
    layout?: BoxLayout;
    spacing?: ReactNode;
}

export const IlluminaChatBubbleLayoutSpacingItem = ({ layout, spacing }: IlluminaChatBubbleLayoutSpacingItemProps) => {
    return (
        <Region
            name="spacing"
            layout={{ width: 0, height: 7, flexShrink: 0, ...layout }}
        >
            {spacing}
        </Region>
    );
};
