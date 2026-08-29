import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Row template `spacing` of IlluminaChatBubbleLayout - pass real rows through its `items…` slot. */
export interface IlluminaChatBubbleLayoutSpacingItem2Props {
    layout?: BoxLayout;
    spacing?: ReactNode;
}

export const IlluminaChatBubbleLayoutSpacingItem2 = ({ layout, spacing }: IlluminaChatBubbleLayoutSpacingItem2Props) => {
    return (
        <Region
            name="spacing"
            layout={{ width: 0, height: 7, flexShrink: 0, ...layout }}
        >
            {spacing}
        </Region>
    );
};
