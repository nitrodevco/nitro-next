import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { HabbiconPurchaseConfirmationLayoutPriceAmountItem } from './HabbiconPurchaseConfirmationLayoutPriceAmountItem';
import { HabbiconPurchaseConfirmationLayoutPriceIconItem } from './HabbiconPurchaseConfirmationLayoutPriceIconItem';

/** Row template `price_value` of HabbiconPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface HabbiconPurchaseConfirmationLayoutPriceValueItemProps {
    itemsPriceValue?: ReactNode;
    layout?: BoxLayout;
}

export const HabbiconPurchaseConfirmationLayoutPriceValueItem = ({ itemsPriceValue, layout }: HabbiconPurchaseConfirmationLayoutPriceValueItemProps) => {
    return (
        <Region
            name="price_value"
            layout={{ width: 37, height: 22, flexShrink: 0, flexDirection: 'row', gap: 3, ...layout }}
        >
            {itemsPriceValue ?? (
                <>
                    <HabbiconPurchaseConfirmationLayoutPriceAmountItem />
                    <HabbiconPurchaseConfirmationLayoutPriceIconItem />
                </>
            )}
        </Region>
    );
};
