import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Row template `spacing` of CampaignPromoLayout - pass real rows through its `items…` slot. */
export interface CampaignPromoLayoutSpacingItemProps {
    layout?: BoxLayout;
    spacing?: ReactNode;
}

export const CampaignPromoLayoutSpacingItem = ({ layout, spacing }: CampaignPromoLayoutSpacingItemProps) => {
    return (
        <Region
            name="spacing"
            layout={{ width: 30, height: 6, flexShrink: 0, ...layout }}
        >
            {spacing}
        </Region>
    );
};
