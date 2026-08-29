import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Row template `handitem_spacer` of RentableBotViewLayout - pass real rows through its `items…` slot. */
export interface RentableBotViewLayoutHanditemSpacerItemProps {
    handitemSpacer?: ReactNode;
    layout?: BoxLayout;
}

export const RentableBotViewLayoutHanditemSpacerItem = ({ handitemSpacer, layout }: RentableBotViewLayoutHanditemSpacerItemProps) => {
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
