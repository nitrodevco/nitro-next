import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { JukeboxViewLayoutBuyoutButtonItem } from './JukeboxViewLayoutBuyoutButtonItem';
import { JukeboxViewLayoutCatalogButtonItem } from './JukeboxViewLayoutCatalogButtonItem';
import { JukeboxViewLayoutExtendButtonItem } from './JukeboxViewLayoutExtendButtonItem';
import { JukeboxViewLayoutRentButtonItem } from './JukeboxViewLayoutRentButtonItem';

/** Row template `purchase_buttons` of JukeboxViewLayout - pass real rows through its `items…` slot. */
export interface JukeboxViewLayoutPurchaseButtonsItemProps {
    itemsPurchaseButtons?: ReactNode;
    layout?: BoxLayout;
}

export const JukeboxViewLayoutPurchaseButtonsItem = ({ itemsPurchaseButtons, layout }: JukeboxViewLayoutPurchaseButtonsItemProps) => {
    return (
        <Region
            name="purchase_buttons"
            layout={{ width: 170, height: 22, flexShrink: 0, flexDirection: 'row', gap: 5, ...layout }}
        >
            {itemsPurchaseButtons ?? (
                <>
                    <JukeboxViewLayoutCatalogButtonItem />
                    <JukeboxViewLayoutRentButtonItem />
                    <JukeboxViewLayoutExtendButtonItem />
                    <JukeboxViewLayoutBuyoutButtonItem />
                </>
            )}
        </Region>
    );
};
