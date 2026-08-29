import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { HabbiconPurchaseConfirmationLayoutDiscountRowItem } from './HabbiconPurchaseConfirmationLayoutDiscountRowItem';
import { HabbiconPurchaseConfirmationLayoutNormalPriceRowItem } from './HabbiconPurchaseConfirmationLayoutNormalPriceRowItem';

/** Row template `value_area` of HabbiconPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface HabbiconPurchaseConfirmationLayoutValueAreaItemProps {
    itemsValueArea?: ReactNode;
    layout?: BoxLayout;
}

export const HabbiconPurchaseConfirmationLayoutValueAreaItem = ({ itemsValueArea, layout }: HabbiconPurchaseConfirmationLayoutValueAreaItemProps) => {
    return (
        <Region
            name="value_area"
            layout={{ width: 327, height: 39, flexShrink: 0, flexDirection: 'column', gap: 5, ...layout }}
        >
            {itemsValueArea ?? (
                <>
                    <HabbiconPurchaseConfirmationLayoutNormalPriceRowItem />
                    <HabbiconPurchaseConfirmationLayoutDiscountRowItem />
                </>
            )}
        </Region>
    );
};
