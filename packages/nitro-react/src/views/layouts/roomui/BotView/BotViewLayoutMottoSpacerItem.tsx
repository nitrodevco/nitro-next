import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Row template `motto_spacer` of BotViewLayout - pass real rows through its `items…` slot. */
export interface BotViewLayoutMottoSpacerItemProps {
    layout?: BoxLayout;
    mottoSpacer?: ReactNode;
}

export const BotViewLayoutMottoSpacerItem = ({ layout, mottoSpacer }: BotViewLayoutMottoSpacerItemProps) => {
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
