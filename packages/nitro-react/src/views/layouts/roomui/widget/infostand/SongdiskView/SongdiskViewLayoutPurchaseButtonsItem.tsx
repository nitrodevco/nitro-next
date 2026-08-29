import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { SongdiskViewLayoutBuyoutButtonItem } from './SongdiskViewLayoutBuyoutButtonItem';
import { SongdiskViewLayoutCatalogButtonItem } from './SongdiskViewLayoutCatalogButtonItem';
import { SongdiskViewLayoutExtendButtonItem } from './SongdiskViewLayoutExtendButtonItem';
import { SongdiskViewLayoutRentButtonItem } from './SongdiskViewLayoutRentButtonItem';

/** Row template `purchase_buttons` of SongdiskViewLayout - pass real rows through its `items…` slot. */
export interface SongdiskViewLayoutPurchaseButtonsItemProps {
    itemsPurchaseButtons?: ReactNode;
    layout?: BoxLayout;
}

export const SongdiskViewLayoutPurchaseButtonsItem = ({ itemsPurchaseButtons, layout }: SongdiskViewLayoutPurchaseButtonsItemProps) => {
    return (
        <Region
            name="purchase_buttons"
            layout={{ width: 170, height: 22, flexShrink: 0, flexDirection: 'row', gap: 5, ...layout }}
        >
            {itemsPurchaseButtons ?? (
                <>
                    <SongdiskViewLayoutCatalogButtonItem />
                    <SongdiskViewLayoutRentButtonItem />
                    <SongdiskViewLayoutExtendButtonItem />
                    <SongdiskViewLayoutBuyoutButtonItem />
                </>
            )}
        </Region>
    );
};
