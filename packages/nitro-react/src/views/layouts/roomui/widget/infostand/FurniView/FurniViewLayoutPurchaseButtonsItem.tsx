import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { FurniViewLayoutBcPlaceButtonItem } from './FurniViewLayoutBcPlaceButtonItem';
import { FurniViewLayoutBuyoutButtonItem } from './FurniViewLayoutBuyoutButtonItem';
import { FurniViewLayoutCatalogButtonItem } from './FurniViewLayoutCatalogButtonItem';
import { FurniViewLayoutExtendButtonItem } from './FurniViewLayoutExtendButtonItem';
import { FurniViewLayoutRentButtonItem } from './FurniViewLayoutRentButtonItem';

/** Row template `purchase_buttons` of FurniViewLayout - pass real rows through its `items…` slot. */
export interface FurniViewLayoutPurchaseButtonsItemProps {
    itemsPurchaseButtons?: ReactNode;
    layout?: BoxLayout;
}

export const FurniViewLayoutPurchaseButtonsItem = ({ itemsPurchaseButtons, layout }: FurniViewLayoutPurchaseButtonsItemProps) => {
    return (
        <Region
            name="purchase_buttons"
            layout={{ width: 170, height: 23, flexShrink: 0, flexDirection: 'row', gap: 5, ...layout }}
        >
            {itemsPurchaseButtons ?? (
                <>
                    <FurniViewLayoutBcPlaceButtonItem />
                    <FurniViewLayoutCatalogButtonItem />
                    <FurniViewLayoutRentButtonItem />
                    <FurniViewLayoutExtendButtonItem />
                    <FurniViewLayoutBuyoutButtonItem />
                </>
            )}
        </Region>
    );
};
