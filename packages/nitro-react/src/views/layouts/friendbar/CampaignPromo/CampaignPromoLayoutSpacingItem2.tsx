import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Row template `spacing` of CampaignPromoLayout - pass real rows through its `items…` slot. */
export interface CampaignPromoLayoutSpacingItem2Props {
    layout?: BoxLayout;
    spacing?: ReactNode;
}

export const CampaignPromoLayoutSpacingItem2 = ({ layout, spacing }: CampaignPromoLayoutSpacingItem2Props) => {
    return (
        <Region
            name="spacing"
            layout={{ width: 30, height: 6, flexShrink: 0, ...layout }}
        >
            {spacing}
        </Region>
    );
};
