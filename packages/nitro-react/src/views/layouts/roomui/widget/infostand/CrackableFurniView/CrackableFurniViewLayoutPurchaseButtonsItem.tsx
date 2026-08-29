import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { CrackableFurniViewLayoutBuyoutButtonItem } from './CrackableFurniViewLayoutBuyoutButtonItem';
import { CrackableFurniViewLayoutCatalogButtonItem } from './CrackableFurniViewLayoutCatalogButtonItem';
import { CrackableFurniViewLayoutExtendButtonItem } from './CrackableFurniViewLayoutExtendButtonItem';
import { CrackableFurniViewLayoutRentButtonItem } from './CrackableFurniViewLayoutRentButtonItem';

/** Row template `purchase_buttons` of CrackableFurniViewLayout - pass real rows through its `items…` slot. */
export interface CrackableFurniViewLayoutPurchaseButtonsItemProps {
    itemsPurchaseButtons?: ReactNode;
    layout?: BoxLayout;
}

export const CrackableFurniViewLayoutPurchaseButtonsItem = ({ itemsPurchaseButtons, layout }: CrackableFurniViewLayoutPurchaseButtonsItemProps) => {
    return (
        <Region
            name="purchase_buttons"
            layout={{ width: 170, height: 22, flexShrink: 0, flexDirection: 'row', gap: 5, ...layout }}
        >
            {itemsPurchaseButtons ?? (
                <>
                    <CrackableFurniViewLayoutCatalogButtonItem />
                    <CrackableFurniViewLayoutRentButtonItem />
                    <CrackableFurniViewLayoutExtendButtonItem />
                    <CrackableFurniViewLayoutBuyoutButtonItem />
                </>
            )}
        </Region>
    );
};
