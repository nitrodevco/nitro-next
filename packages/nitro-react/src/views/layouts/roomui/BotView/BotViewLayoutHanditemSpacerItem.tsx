import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Row template `handitem_spacer` of BotViewLayout - pass real rows through its `items…` slot. */
export interface BotViewLayoutHanditemSpacerItemProps {
    handitemSpacer?: ReactNode;
    layout?: BoxLayout;
}

export const BotViewLayoutHanditemSpacerItem = ({ handitemSpacer, layout }: BotViewLayoutHanditemSpacerItemProps) => {
    return (
        <Region
            name="handitem_spacer"
            backgroundColor="#333333"
            layout={{ width: 170, height: 1, flexShrink: 0, ...layout }}
        >
            {handitemSpacer}
        </Region>
    );
};
